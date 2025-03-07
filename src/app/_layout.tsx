import { Slot } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Header from "#/components/screens/Header"
import TabBar from "#/components/screens/TabBar"
import colors from "#/lib/light"

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["bottom", "left", "right", "top"]}
        style={{
          backgroundColor: colors.slate["01"],
          direction: "rtl",
          flex: 1,
        }}
      >
        <StatusBar style="dark" />
        <Header />
        <Slot />
        <TabBar />
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
