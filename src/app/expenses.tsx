import { StyleSheet, Text, View } from "react-native"

/*
# VISUAL REPRESENTATION OF ALL DATA...

expenses: [
  {
    id: string
    title: string
    description: string | null
    amount: number
    currency: "IRT"
    createdAt: "2025-03-07T23:31:44.760Z"
  } 
]

budgets: {
  essentials: {
    id: string
    key: string
    title: string
    description: string | null
    currentAmount: number
  }
  fun: 200
  charity: 300
  investment: 500
}
*/

interface Expense {
  id: string
  title: string
  description: string | null
  amount: number
  currency: "IRT"
  /** ISO String... */
  createdAt: string
  budgetId: string
}

interface Budget {
  id: string
  key: string
  title: string
  description: string | null
  amount: number
}

export default function ExpensesPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>خرجی‌ها</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  msg: {
    fontSize: 32,
    fontWeight: "bold",
  },
})
