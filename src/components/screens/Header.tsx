import Feather from "@expo/vector-icons/Feather"
import { router } from "expo-router"
import { Pressable, StyleSheet, View } from "react-native"
import colors from "#/lib/light"
import PLText from "../PLText"

const ICON_SIZE = 20
const ICON_COLOR = colors.blue["05"]

export default function Header() {
  const backBtnEnabled = router.canGoBack()

  return (
    <View style={styles.container}>
      {backBtnEnabled ? (
        <Pressable style={styles.iconBtn} onPress={() => router.back()}>
          <Feather name="arrow-right" size={ICON_SIZE} color={ICON_COLOR} />
        </Pressable>
      ) : (
        <View />
      )}

      <PLText style={styles.title}>پوول</PLText>

      <View />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.blue["09"],
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  iconBtn: {
    cursor: "pointer",
    backgroundColor: colors.blue["10"],
    borderRadius: 400,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
  },
  btnDisabled: {
    opacity: 0.3,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.blue["01"],
  },
})
