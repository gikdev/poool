import Feather from "@expo/vector-icons/Feather"
import { router, useSegments } from "expo-router"
import React, { type ComponentProps } from "react"
import { View } from "react-native"
import { Pressable, StyleSheet } from "react-native"
import colors from "#/lib/light"
import PLText from "../PLText"

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
          <Pressable
            key={tab.id}
            onPress={() => router.push(tab.href)}
            style={[styles.tab, isActive ? styles.activeTab : {}]}
          >
            <Feather
              size={24}
              name={tab.iconName}
              style={[styles.icon, isActive ? styles.activeIcon : {}]}
            />
            {isActive && (
              <PLText style={[styles.text, isActive ? styles.activeText : {}]}>{tab.text}</PLText>
            )}
          </Pressable>
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.blue["02"],
    borderTopColor: "lightgray",
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 16,
    height: 60,
  },
  tab: {
    gap: 4,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {},
  text: {
    fontSize: 16,
    fontFamily: "VazirmatnBold",
  },
  activeTab: {
    backgroundColor: colors.blue["09"],
  },
  activeIcon: {
    color: colors.blue["01"],
  },
  activeText: {
    color: colors.blue["01"],
  },
})
