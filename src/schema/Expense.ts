import * as z from "zod"

const fieldRequiredMsg = "پر کردن ورودی (فیلد، اینپوت) بالا ضروری است."
const fieldRequiredObj = { message: fieldRequiredMsg }

export const CurrencyEnum = z.enum(["IRT"], fieldRequiredObj)

export const ExpenseInputSchema = z.object({
  title: z.string(fieldRequiredObj),
  description: z.string().optional().default(""),
  amount: z.coerce.number(fieldRequiredObj),
  currency: CurrencyEnum.default("IRT"),
  budgetId: z.string(fieldRequiredObj),
})
export type ExpenseInput = z.infer<typeof ExpenseInputSchema>

export interface Expense extends ExpenseInput {
  id: string
  createdAt: string
}
