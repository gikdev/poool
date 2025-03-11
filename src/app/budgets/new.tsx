import { zodResolver } from "@hookform/resolvers/zod"
import { router } from "expo-router"
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form"
import { ScrollView, StyleSheet } from "react-native"
import PLText from "#/components/PLText"
import BtnsControl from "#/components/forms/BtnsControl"
import RHFInput from "#/components/forms/RHFInput"
import colors from "#/lib/light"
import { type BudgetInput, BudgetInputSchema, BudgetsService } from "#/services/Budget"

const goToExpensesPage = () => router.push("/budgets")

const handleNextStep: SubmitHandler<BudgetInput> = async budgetInput => {
  const budget = BudgetsService.createBudget(budgetInput)
  await BudgetsService.saveNewBudget(budget)
  goToExpensesPage()
}

export default function NewBudgetForm() {
  const form = useForm({
    resolver: zodResolver(BudgetInputSchema),
  })

  return (
    <ScrollView
      contentContainerStyle={{ padding: 16, flexGrow: 1, gap: 32 }}
      keyboardShouldPersistTaps="handled"
    >
      <PLText style={styles.title}>ثبت بودجه جدید</PLText>

      <FormProvider {...form}>
        <RHFInput dir="rtl" name="title" label="نام بودجه" />
        <RHFInput dir="ltr" numberMode name="amount" label="مقدار فعلی" />
        <RHFInput
          multiline
          dir="rtl"
          style={{ height: 120 }}
          css={{ height: 120 }}
          name="description"
          label="توضیحات"
        />
        <PLText>{Object.keys(form.formState.errors).join(" ")}</PLText>
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
