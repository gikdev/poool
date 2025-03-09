import type { ComponentProps } from "react"
import type { FieldError } from "react-hook-form"
import { StyleSheet, View } from "react-native"
import colors from "#/lib/light"
import PLText from "../PLText"

type ViewStyles = ComponentProps<typeof View>["style"]
type TextStyles = ComponentProps<typeof PLText>["style"]

export interface InputLabelerProps {
  label?: string
  containerStyle?: ViewStyles
  style?: ViewStyles
  error?: FieldError
  children?: React.ReactNode
  labelStyle?: TextStyles
}

export default function InputLabeler({
  error,
  label,
  style,
  containerStyle,
  children,
  labelStyle,
}: InputLabelerProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <PLText style={[styles.label, labelStyle]}>{label}:</PLText>}
      <View style={style}>{children}</View>
      {error && <PLText style={styles.errorText}>{error.message}</PLText>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { gap: 2 },
  label: {
    fontFamily: "VazirmatnBold",
    color: colors.slate["12"],
  },
  errorText: {
    fontSize: 12,
    color: colors.red["11"],
  },
})
