import { zodResolver } from "@hookform/resolvers/zod"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { router } from "expo-router"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { ScrollView, StyleSheet } from "react-native"
import uid from "tiny-uid"
import PLText from "#/components/PLText"
import BtnsControl from "#/components/forms/BtnsControl"
import RHFDropdown from "#/components/forms/RHFDropdown"
import RHFInput from "#/components/forms/RHFInput"
import colors from "#/lib/light"
import {
  CurrencyEnum,
  type Expense,
  type ExpenseInput,
  ExpenseInputSchema,
  ExpensesService,
} from "#/services/expenses"

const goToExpensesPage = () => router.push("/expenses")

const handleNextStep: SubmitHandler<ExpenseInput> = async expenseInput => {
  const expense = ExpensesService.createExpense(expenseInput)
  await ExpensesService.saveNewExpense(expense)
  goToExpensesPage()
}

export default function ServiceCCNIPersonalInfoForm() {
  const form = useForm({
    resolver: zodResolver(ExpenseInputSchema),
  })

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, flexGrow: 1, gap: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <PLText style={styles.title}>ثبت خرجی جدید</PLText>

      <FormProvider {...form}>
        <RHFInput dir="rtl" name="title" label="نام خرجی" />
        <RHFInput dir="ltr" numberMode name="amount" label="مقدار" />
        <RHFInput dir="ltr" name="budgetId" label="آی‌دی بودجه" />
        <RHFDropdown
          label="واحد پول"
          name="currency"
          placeholder={{ label: "یک مورد را انتخاب کنید...", value: "" }}
          items={[{ label: "تومان", value: CurrencyEnum.Values.IRT }]}
        />
        <RHFInput multiline dir="rtl" style={{ height: 120 }} name="description" label="توضیحات" />
      </FormProvider>

      <BtnsControl
        style={{ marginTop: 0 }}
        firstBtnType="cancel"
        onFirstBtnClick={goToExpensesPage}
        secondBtnType="confirm"
        onSecondBtnClick={form.handleSubmit(handleNextStep)}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.slate["12"],
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
})
