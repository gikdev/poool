import * as z from "zod"

const fieldRequiredMsg = "پر کردن ورودی (فیلد، اینپوت) بالا ضروری است."
const fieldRequiredObj = { message: fieldRequiredMsg }

export const BudgetInputSchema = z.object({
  key: z.string(fieldRequiredObj),
  title: z.string(fieldRequiredObj),
  amount: z.coerce.number(fieldRequiredObj),
  description: z.string().optional().default(""),
})
export type BudgetInput = z.infer<typeof BudgetInputSchema>

export interface Budget extends BudgetInput {
  id: string
}
