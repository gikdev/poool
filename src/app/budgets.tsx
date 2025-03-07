import { StyleSheet, Text, View } from "react-native"

export default function BudgetsPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.msg}>بودجه</Text>
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
