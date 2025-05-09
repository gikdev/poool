import type { ComponentProps } from "react"
import { Text } from "react-native"
import colors from "#/lib/light"

export interface PLTextProps extends ComponentProps<typeof Text> {
  fontSize?: number
}

export default function PLText({ style, fontSize = 16, ...rest }: PLTextProps) {
  return (
    <Text
      style={[{ fontFamily: "VazirmatnRegular", color: colors.slate["11"], fontSize }, style]}
      {...rest}
    />
  )
}
