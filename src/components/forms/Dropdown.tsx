import type { ComponentProps } from "react"
import type { FieldError } from "react-hook-form"
import RNPickerSelect from "react-native-picker-select"
import colors from "#/lib/light"

export interface DropdownProps extends ComponentProps<typeof RNPickerSelect> {
  error?: FieldError | true
}

export default function Dropdown({ error, ...other }: DropdownProps) {
  const errorStyles = error ? { borderColor: colors.red["07"] } : {}

  return (
    <RNPickerSelect
      {...other}
      useNativeAndroidPickerStyle
      style={{
        inputWeb: [styles, errorStyles],
        inputAndroid: [styles, errorStyles],
        inputIOS: [styles, errorStyles],
      }}
    />
  )
}

const styles = {
  fontFamily: "VazirmatnRegular",
  padding: 8,
  borderWidth: 2,
  borderRadius: 8,
  writingDirection: "rtl",
  width: "100%",
  borderColor: colors.slate["07"],
  borderStyle: "solid",
  backgroundColor: colors.slate["03"],
}
