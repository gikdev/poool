import { Pressable, View } from "react-native"
import colors from "#/lib/light"

const SWITCH_WIDTH = 40
const SWITCH_HEIGHT = 24

export interface PLSwitchProps {
  checked: boolean
  onCheckChange(val: boolean): void
}

export default function PLSwitch({ checked, onCheckChange }: PLSwitchProps) {
  return (
    <Pressable
      onPress={() => onCheckChange(!checked)}
      style={{
        width: SWITCH_WIDTH,
        height: SWITCH_HEIGHT,
        borderRadius: SWITCH_WIDTH,
        paddingHorizontal: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: checked ? "flex-end" : "flex-start",
        backgroundColor: checked ? colors.violet["09"] : colors.slate["05"],
      }}
    >
      <View
        style={{
          height: SWITCH_HEIGHT - 4,
          width: SWITCH_HEIGHT - 4,
          borderRadius: SWITCH_WIDTH,
          backgroundColor: colors.violet["01"],
        }}
      />
    </Pressable>
  )
}
