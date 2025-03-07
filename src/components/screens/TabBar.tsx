import Feather from "@expo/vector-icons/Feather"
import { Link, useSegments } from "expo-router"
import React, { type ComponentProps } from "react"
import { Text, View } from "react-native"
import { Pressable, StyleSheet } from "react-native"
import colors from "#/lib/light"

const PRIMARY_COLOR = colors.blue["10"]
const NEUTRAL_COLOR = colors.slate["09"]

interface Tab {
  id: number
  iconName: ComponentProps<typeof Feather>["name"]
  text: string
  href: string
}

const TABS: Tab[] = [
  { id: 0, iconName: "home", text: "خانه", href: "/" },
  { id: 1, iconName: "credit-card", text: "خرجی‌ها", href: "/expenses" },
  { id: 2, iconName: "box", text: "بودجه", href: "/budgets" },
]

export default function TabBar() {
  const segments = useSegments()
  const activeRoute = `/${segments.length ? segments[0] : ""}`

  return (
    <View style={styles.tabBar}>
      {TABS.map(tab => {
        const isActive = activeRoute === tab.href

        return (
          <Link key={tab.id} href={tab.href} asChild>
            <Pressable style={{ ...styles.tab, ...(isActive ? styles.activeTab : {}) }}>
              <Feather
                size={24}
                name={tab.iconName}
                color={isActive ? PRIMARY_COLOR : NEUTRAL_COLOR}
              />

              <Text style={{ color: isActive ? PRIMARY_COLOR : NEUTRAL_COLOR, fontSize: 14 }}>
                {tab.text}
              </Text>
            </Pressable>
          </Link>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    backgroundColor: colors.blue["02"],
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    gap: 16,
    paddingHorizontal: 16,
  },
  tab: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 4,
    flex: 1,
    alignItems: "center",
    borderTopWidth: 4,
    borderTopColor: "transparent",
  },
  activeTab: {
    borderTopColor: PRIMARY_COLOR,
  },
})
