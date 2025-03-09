import type { ComponentProps } from "react"
import { type DimensionValue, View } from "react-native"

const settings = { showGaps: true }

interface VGProps extends ComponentProps<typeof View> {
  inspect?: boolean
  height?: DimensionValue
}

export default function VerticalGap({
  inspect = settings.showGaps,
  height = 80,
  style,
  ...rest
}: VGProps) {
  return (
    <View
      style={[{ height, backgroundColor: inspect ? "rgba(255, 0, 0, 0.1)" : "transparent" }, style]}
      {...rest}
    />
  )
}
