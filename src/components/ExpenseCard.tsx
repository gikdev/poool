import Feather from "@expo/vector-icons/Feather"
import colors from "#/lib/light"
import { Pressable, StyleSheet, View } from "react-native"
import PLText from "./PLText"
import { useState } from "react"
import { persianizeStr } from "#/lib/helpers"
import type { Expense } from "#/schema/Expense"

export interface ExpenseCardProps {
  expense: Expense
}

export default function ExpenseCard({ expense }: ExpenseCardProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false)
  const { amount, budgetId, createdAt, description, title } = expense

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setDetailsOpen(p => !p)} style={styles.summaryContainer}>
        <PLText style={styles.title}>{title}</PLText>

        <View style={styles.priceContainer}>
          <PLText style={styles.currency}>ت</PLText>
          <PLText
            style={[styles.price, { color: amount >= 0 ? colors.green["11"] : colors.red["11"] }]}
          >
            {persianizeStr(amount)}
          </PLText>
        </View>

        <Feather
          name={isDetailsOpen ? "chevron-up" : "chevron-down"}
          style={styles.icon}
          size={24}
        />
      </Pressable>

      {isDetailsOpen && (
        <View style={styles.detailsContainer}>
          {description && <PLText style={styles.description}>{description}</PLText>}
          <View style={styles.tags}>
            <PLText style={styles.tag}>{new Date(createdAt).toLocaleDateString("fa-IR")}</PLText>
            <PLText style={styles.tag}>{budgetId === "l29fA" ? "تفریح" : "ناشناخته"}</PLText>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.slate["03"],
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 8,
  },
  summaryContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  title: {
    fontFamily: "VazirmatnBold",
    color: colors.slate["12"],
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    marginRight: "auto",
  },
  price: {
    fontSize: 20,
    fontFamily: "VazirmatnBold",
    color: colors.slate["12"],
  },
  currency: {},
  icon: {},
  detailsContainer: {
    gap: 8,
  },
  description: {},
  tags: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tag: {
    backgroundColor: colors.green["03"],
    borderWidth: 1,
    borderColor: colors.green["07"],
    color: colors.green["11"],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
  },
})
