import Feather from "@expo/vector-icons/Feather"
import type { ComponentProps } from "react"
import { type GestureResponderEvent, Pressable, StyleSheet, type View } from "react-native"
import colors, { type ThemeColors } from "../lib/light"
import PLText from "./PLText"

export interface BtnProps extends Omit<ComponentProps<typeof View>, "children"> {
  icons?: {
    startIconName?: ComponentProps<typeof Feather>["name"]
    endIconName?: ComponentProps<typeof Feather>["name"]
    size?: number
  }
  title?: string
  themeColor?: ThemeColors
  disabled?: boolean
  onPress?: (event: GestureResponderEvent) => void
}

export default function Btn({
  themeColor = "blue",
  style,
  title,
  icons = {},
  disabled = false,
  onPress,
  ...rest
}: BtnProps) {
  const { startIconName, endIconName, size = 20 } = icons
  const bgColor = colors[themeColor]["09"]
  const textColor = colors[themeColor]["01"]

  return (
    <Pressable
      onPress={onPress}
      style={[styles.btn, { backgroundColor: bgColor }, disabled ? styles.disabled : {}, style]}
      disabled={disabled}
      {...rest}
    >
      {startIconName && <Feather name={startIconName} size={size} color={textColor} />}
      {title && <PLText style={[styles.text, { color: textColor }]}>{title}</PLText>}
      {endIconName && <Feather name={endIconName} size={size} color={textColor} />}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    backgroundColor: colors.violet["09"],
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
  },
  text: {
    fontFamily: "VazirmatnBold",
    lineHeight: 24,
  },
  disabled: {
    opacity: 0.5,
  },
})
