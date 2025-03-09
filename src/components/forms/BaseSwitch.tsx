import type { ComponentProps } from "react"
import { Switch } from "react-native"

export interface BaseSwitchProps extends ComponentProps<typeof Switch> {}

export default function BaseSwitch({ ...other }: BaseSwitchProps) {
  return <Switch {...other} style={[{ direction: "ltr" }, other.style]} />
}
