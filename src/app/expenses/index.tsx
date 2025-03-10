import { router } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Btn from "#/components/Btn"
import ExpenseCard from "#/components/ExpenseCard"
import PLText from "#/components/PLText"
import colors from "#/lib/light"
import { ExpensesService as ES, type Expense } from "#/services/expenses"

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([])

  const loadExpenses = useCallback(() => {
    ES.fetchExpenses("newest-first").then(setExpenses)
  }, [])

  useEffect(loadExpenses, [])

  return (
    <View style={styles.container}>
      <PLText style={styles.title}>خرجی‌ها</PLText>

      <Btn
        title="ثبت خرجی"
        style={{ marginBottom: 16 }}
        onPress={() => router.push("/expenses/new")}
      />

      <ScrollView contentContainerStyle={styles.expenses}>
        {expenses.length ? (
          expenses.map(e => <ExpenseCard reloadExpenses={loadExpenses} key={e.id} expense={e} />)
        ) : (
          <PLText style={{ textAlign: "center" }}>مثل اینکه خبری نیست...</PLText>
        )}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    color: colors.slate["12"],
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  expenses: {
    flexGrow: 1,
    gap: 8,
  },
})
