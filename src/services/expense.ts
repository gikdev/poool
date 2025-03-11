import AsyncStorage from "@react-native-async-storage/async-storage"
import uid from "tiny-uid"
import * as z from "zod"

const requiredFieldMessage = "پر کردن ورودی (فیلد، اینپوت) بالا ضروری است."
const requiredFieldConfig = { message: requiredFieldMessage }

export const CurrencyEnum = z.enum(["IRT"], requiredFieldConfig)

export const ExpenseInputSchema = z.object({
  title: z.string(requiredFieldConfig),
  description: z.string().optional().default(""),
  amount: z.coerce.number(requiredFieldConfig),
  currency: CurrencyEnum.default("IRT"),
  budgetId: z.string(requiredFieldConfig),
})
export type ExpenseInput = z.infer<typeof ExpenseInputSchema>

export interface Expense extends ExpenseInput {
  id: string
  createdAt: string
}

type SortOption = "newest-first" | "oldest-first" | "cheap-first" | "expensive-first"

export class ExpensesService {
  private static storageKey = "EXPENSES"

  /** Fetch expenses with optional sorting */
  static async fetchExpenses(sortOption?: SortOption): Promise<Expense[]> {
    try {
      const rawExpensesData = await AsyncStorage.getItem(ExpensesService.storageKey)
      const expenses: Expense[] = rawExpensesData ? JSON.parse(rawExpensesData) : []

      if (sortOption) {
        expenses.sort((firstExpense, secondExpense) => {
          switch (sortOption) {
            case "newest-first":
              return (
                new Date(secondExpense.createdAt).getTime() -
                new Date(firstExpense.createdAt).getTime()
              )
            case "oldest-first":
              return (
                new Date(firstExpense.createdAt).getTime() -
                new Date(secondExpense.createdAt).getTime()
              )
            case "cheap-first":
              return firstExpense.amount - secondExpense.amount
            case "expensive-first":
              return secondExpense.amount - firstExpense.amount
            default:
              return 0
          }
        })
      }

      return expenses
    } catch (error) {
      console.error(
        "Failed to fetch or sort expenses. Error:",
        error instanceof Error ? error.message : error,
      )
      return []
    }
  }

  /** Create a new expense */
  static createExpense(input: ExpenseInput): Expense {
    const expenseId = uid()
    const createdAt = new Date().toISOString()
    const newExpense: Expense = { ...input, id: expenseId, createdAt }
    return newExpense
  }

  /** Save expenses to storage */
  static async saveExpenses(expenses: Expense[]) {
    try {
      await AsyncStorage.setItem(ExpensesService.storageKey, JSON.stringify(expenses))
    } catch (error) {
      console.error(
        "Failed to save expenses. Error:",
        error instanceof Error ? error.message : error,
      )
    }
  }

  /** Save a new expense */
  static async saveNewExpense(input: ExpenseInput): Promise<void> {
    const validatedInput = ExpenseInputSchema.parse(input)
    const newExpense = ExpensesService.createExpense(validatedInput)
    const expenses = await ExpensesService.fetchExpenses()
    expenses.push(newExpense)
    await ExpensesService.saveExpenses(expenses)
  }

  /** Remove an expense by ID */
  static async removeExpense(expenseId: Expense["id"]) {
    const expenses = await ExpensesService.fetchExpenses()
    const filteredExpenses = expenses.filter(expense => expense.id !== expenseId)
    await ExpensesService.saveExpenses(filteredExpenses)
  }

  /** Clear all expenses */
  static async clearExpenses(): Promise<void> {
    try {
      await AsyncStorage.removeItem(ExpensesService.storageKey)
    } catch (error) {
      console.error(
        "Failed to clear expenses. Error:",
        error instanceof Error ? error.message : error,
      )
    }
  }

  /** Get an expense by ID */
  static async getExpenseById(expenseId: Expense["id"]): Promise<Expense | undefined> {
    const expenses = await ExpensesService.fetchExpenses()
    return expenses.find(expense => expense.id === expenseId)
  }

  /** Update an existing expense */
  static async updateExpense(
    expenseId: Expense["id"],
    updates: Partial<ExpenseInput>,
  ): Promise<void> {
    const expenses = await ExpensesService.fetchExpenses()
    const expenseIndex = expenses.findIndex(expense => expense.id === expenseId)

    if (expenseIndex === -1) return

    const updatedExpense = { ...expenses[expenseIndex], ...updates }
    expenses[expenseIndex] = updatedExpense
    await ExpensesService.saveExpenses(expenses)
  }
}
