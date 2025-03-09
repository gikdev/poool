import { useFonts } from "expo-font"
import { Slot, SplashScreen } from "expo-router"
import { StatusBar } from "expo-status-bar"
import { useEffect } from "react"
import { Text, View } from "react-native"
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context"
import Header from "#/components/screens/Header"
import TabBar from "#/components/screens/TabBar"
import colors from "#/lib/light"

export default function RootLayout() {
  const [fontsLoaded, fontsErrored] = useFonts({
    VazirmatnRegular: require("assets/Vazirmatn-Regular.ttf"),
    VazirmatnBold: require("assets/Vazirmatn-Bold.ttf"),
  })

  useEffect(() => {
    if (fontsLoaded || fontsErrored) SplashScreen.hideAsync()
  }, [fontsLoaded, fontsErrored])

  if (!fontsLoaded && !fontsErrored) {
    return (
      <View style={{ padding: 100 }}>
        <Text style={{ textAlign: "center" }}>فونت به درستی لود نشده...</Text>
      </View>
    )
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        edges={["bottom", "left", "right", "top"]}
        style={{
          backgroundColor: colors.slate["01"],
          direction: "rtl",
          flex: 1,
          marginHorizontal: "auto",
          maxWidth: 600,
          width: "100%",
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
