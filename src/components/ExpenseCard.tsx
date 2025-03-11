import Feather from "@expo/vector-icons/Feather"
import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"
import { persianizeStr, universalDangerousConfirm } from "#/lib/helpers"
import colors from "#/lib/light"
import { type Expense, ExpensesService } from "#/services/expense"
import PLText from "./PLText"

export interface ExpenseCardProps {
  expense: Expense
  reloadExpenses: () => void
}

export default function ExpenseCard({ expense, reloadExpenses }: ExpenseCardProps) {
  const [isDetailsOpen, setDetailsOpen] = useState(false)
  const { amount, budgetId, createdAt, description, title, id } = expense

  function deleteExpense() {
    universalDangerousConfirm(async () => {
      await ExpensesService.removeExpense(id)
      reloadExpenses()
    })
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setDetailsOpen(p => !p)} style={styles.summaryContainer}>
        <PLText style={styles.title}>{title}</PLText>

        <View style={{ flex: 1 }} />

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

            <View style={{ flex: 1 }} />

            <Pressable style={[styles.iconBtn, styles.iconBtnDisabled]} disabled>
              <Feather style={[styles.editIcon, styles.iconDisabled]} name="edit" size={20} />
            </Pressable>
            <Pressable style={styles.iconBtn} onPress={deleteExpense}>
              <Feather style={styles.dlIcon} name="trash-2" size={20} />
            </Pressable>
          </View>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.slate["03"],
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
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
    backgroundColor: colors.gold["03"],
    borderColor: colors.gold["07"],
    color: colors.gold["11"],
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 12,
  },
  iconBtn: {
    width: 28,
    height: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  editIcon: {
    color: colors.amber["11"],
  },
  dlIcon: {
    color: colors.red["11"],
  },
  iconBtnDisabled: {
    backgroundColor: colors.slate["06"],
    borderRadius: 4,
  },
  iconDisabled: {
    color: colors.slate["10"],
  },
})
