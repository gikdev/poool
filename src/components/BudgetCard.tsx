import Feather from "@expo/vector-icons/Feather"
import { Pressable, StyleSheet, View } from "react-native"
import { persianizeStr, universalDangerousConfirm } from "#/lib/helpers"
import colors from "#/lib/light"
import { type Budget, BudgetsService } from "#/services/Budget"
import PLText from "./PLText"

export interface BudgetCardProps {
  budget: Budget
  reloadBudgets: () => void
}

export default function BudgetCard({ budget, reloadBudgets }: BudgetCardProps) {
  const { amount, description, id, title } = budget

  function deleteBudget() {
    universalDangerousConfirm(async () => {
      await BudgetsService.removeBudget(id)
      reloadBudgets()
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <PLText style={styles.title}>{title}</PLText>

        <View style={{ flex: 1 }} />

        <View style={styles.tags}>
          <Pressable style={styles.iconBtn} onPress={deleteBudget}>
            <Feather style={styles.dlIcon} name="trash-2" size={20} />
          </Pressable>
        </View>
      </View>

      {description && <PLText style={styles.description}>{description}</PLText>}

      <View style={styles.innerContainer}>
        <View style={{ flex: 1 }} />

        <View style={styles.priceContainer}>
          <PLText style={styles.currency}>ت</PLText>
          <PLText
            style={[styles.price, { color: amount >= 0 ? colors.green["11"] : colors.red["11"] }]}
          >
            {persianizeStr(amount)}
          </PLText>
        </View>
      </View>
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
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "VazirmatnBold",
    color: colors.slate["12"],
    fontSize: 20,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  price: {
    fontSize: 40,
    fontFamily: "VazirmatnBold",
    color: colors.slate["12"],
  },
  currency: {
    fontSize: 20,
  },
  icon: {},
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
  dlIcon: {
    color: colors.red["11"],
  },
})
