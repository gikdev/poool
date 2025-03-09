import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
import { Pressable } from "react-native"
import colors from "#/lib/light"

const CHECKBOX_SIZE = 24

export interface PLCheckboxProps {
  checked: boolean
  onCheckChange(val: boolean): void
}

export default function PLCheckbox({ checked, onCheckChange }: PLCheckboxProps) {
  return (
    <Pressable
      onPress={() => onCheckChange(!checked)}
      style={{
        width: CHECKBOX_SIZE,
        height: CHECKBOX_SIZE,
        borderRadius: CHECKBOX_SIZE / 4,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: checked ? colors.violet["09"] : colors.slate["08"],
        backgroundColor: checked ? colors.violet["09"] : "transparent",
      }}
    >
      {checked && (
        <FontAwesome6 name="check" size={CHECKBOX_SIZE - 8} color={colors.violet["01"]} />
      )}
    </Pressable>
  )
}
