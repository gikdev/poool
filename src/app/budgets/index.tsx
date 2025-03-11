import { router } from "expo-router"
import { useCallback, useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import Btn from "#/components/Btn"
import BudgetCard from "#/components/BudgetCard"
import PLText from "#/components/PLText"
import colors from "#/lib/light"
import { type Budget, BudgetsService } from "#/services/Budget"

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([])

  const loadBudgets = useCallback(() => {
    BudgetsService.fetchBudgets().then(setBudgets)
  }, [])

  useEffect(loadBudgets, [])

  return (
    <View style={styles.container}>
      <PLText style={styles.title}>بودجه‌ها</PLText>

      <Btn
        title="بودجه جدید"
        style={{ marginBottom: 16 }}
        themeColor="green"
        onPress={() => router.push("/budgets/new")}
      />

      <ScrollView contentContainerStyle={styles.list}>
        {budgets.length ? (
          budgets.map(b => <BudgetCard key={b.id} budget={b} reloadBudgets={loadBudgets} />)
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
  list: {
    flexGrow: 1,
    gap: 8,
  },
})
