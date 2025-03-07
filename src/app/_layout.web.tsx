import { Slot } from "expo-router"
import { View } from "react-native"
import Header from "#/components/screens/Header"
import TabBar from "#/components/screens/TabBar"
import colors from "#/lib/light"
import "./styles.css"

export default function RootLayout() {
  return (
    <View
      style={{
        backgroundColor: colors.slate["01"],
        marginHorizontal: "auto",
        direction: "rtl",
        maxWidth: 600,
        width: "100%",
        flex: 1,
      }}
    >
      <Header />
      <Slot />
      <TabBar />
    </View>
  )
}
