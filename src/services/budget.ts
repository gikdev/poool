import AsyncStorage from "@react-native-async-storage/async-storage"
import uid from "tiny-uid"
import * as z from "zod"

const requiredFieldMessage = "پر کردن ورودی (فیلد، اینپوت) بالا ضروری است."
const requiredFieldConfig = { message: requiredFieldMessage }

export const BudgetInputSchema = z.object({
  title: z.string(requiredFieldConfig),
  amount: z.coerce.number(requiredFieldConfig),
  description: z.string().optional(),
})
export type BudgetInput = z.infer<typeof BudgetInputSchema>

export interface Budget extends BudgetInput {
  id: string
}

export class BudgetsService {
  private static storageKey = "BUDGETS"

  /** Fetch budgets */
  static async fetchBudgets(): Promise<Budget[]> {
    try {
      const rawBudgetsData = await AsyncStorage.getItem(BudgetsService.storageKey)
      const budgets: Budget[] = rawBudgetsData ? JSON.parse(rawBudgetsData) : []
      return budgets
    } catch (error) {
      console.error(
        "Failed to fetch budgets. Error:",
        error instanceof Error ? error.message : error,
      )
      return []
    }
  }

  /** Create a new budget */
  static createBudget(input: BudgetInput): Budget {
    const id = uid()
    const newBudget: Budget = { ...input, id }
    return newBudget
  }

  /** Save budgets to storage */
  static async saveBudgets(budgets: Budget[]) {
    try {
      await AsyncStorage.setItem(BudgetsService.storageKey, JSON.stringify(budgets))
    } catch (error) {
      console.error(
        "Failed to save budgets. Error:",
        error instanceof Error ? error.message : error,
      )
    }
  }

  /** Save a new budget */
  static async saveNewBudget(input: BudgetInput): Promise<void> {
    const validatedInput = BudgetInputSchema.parse(input)
    const newBudget = BudgetsService.createBudget(validatedInput)
    const budgets = await BudgetsService.fetchBudgets()
    budgets.push(newBudget)
    await BudgetsService.saveBudgets(budgets)
  }

  /** Remove a budget by ID */
  static async removeBudget(budgetId: Budget["id"]) {
    const budgets = await BudgetsService.fetchBudgets()
    const filteredBudgets = budgets.filter(b => b.id !== budgetId)
    await BudgetsService.saveBudgets(filteredBudgets)
  }

  /** Clear all budgets */
  static async clearBudgets(): Promise<void> {
    try {
      await AsyncStorage.removeItem(BudgetsService.storageKey)
    } catch (error) {
      console.error(
        "Failed to clear budgets. Error:",
        error instanceof Error ? error.message : error,
      )
    }
  }

  /** Get a budget by ID */
  static async getBudgetBtId(budgetId: Budget["id"]): Promise<Budget | undefined> {
    const budgets = await BudgetsService.fetchBudgets()
    return budgets.find(b => b.id === budgetId)
  }

  /** Update an existing budget */
  static async updateBudget(budgetId: Budget["id"], updates: Partial<BudgetInput>): Promise<void> {
    const budgets = await BudgetsService.fetchBudgets()
    const budgetIndex = budgets.findIndex(b => b.id === budgetId)

    if (budgetIndex === -1) return

    const updatedBudgets = { ...budgets[budgetIndex], ...updates }
    budgets[budgetIndex] = updatedBudgets
    await BudgetsService.saveBudgets(budgets)
  }
}
