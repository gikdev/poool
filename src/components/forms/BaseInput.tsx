import type { CSSProperties, ComponentProps } from "react"
import type { FieldError } from "react-hook-form"
import { StyleSheet, TextInput } from "react-native"
import colors from "#/lib/light"

export interface BaseInputProps extends ComponentProps<typeof TextInput> {
  dir?: "ltr" | "rtl"
  error?: FieldError
  numberMode?: boolean
  css?: CSSProperties
}

export default function BaseInput({
  dir = "rtl",
  error,
  numberMode = false,
  css,
  ...other
}: BaseInputProps) {
  return (
    <TextInput
      {...other}
      style={[styles.input, other.style, { writingDirection: dir }, error && styles.errorInput]}
      placeholderTextColor={colors.slate["09"]}
    />
  )
}

const styles = StyleSheet.create({
  input: {
    fontFamily: "VazirmatnRegular",
    padding: 8,
    borderWidth: 2,
    borderRadius: 8,
    writingDirection: "rtl",
    width: "100%",
    borderColor: colors.slate["07"],
    backgroundColor: colors.slate["03"],
  },
  errorInput: { borderColor: colors.red["08"] },
})
