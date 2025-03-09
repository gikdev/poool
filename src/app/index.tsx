import { StyleSheet, View } from "react-native"
import PLText from "#/components/PLText"

export default function HomePage() {
  return (
    <View style={styles.container}>
      <PLText style={styles.msg}>خوش اومدی!</PLText>
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
