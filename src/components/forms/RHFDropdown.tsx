import { useController } from "react-hook-form"
import Dropdown, { type DropdownProps } from "./Dropdown"
import type { InputLabelerProps } from "./InputLabeler"
import InputLabeler from "./InputLabeler"

export type RHFDropdownProps = {
  name: string
  numberMode?: boolean
} & Omit<DropdownProps, "onValueChange"> &
  InputLabelerProps

export default function RHFDropdown({
  name,
  label,
  numberMode = false,
  containerStyle,
  labelStyle,
  ...others
}: RHFDropdownProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  return (
    <InputLabeler
      label={label}
      containerStyle={containerStyle}
      error={error}
      labelStyle={labelStyle}
    >
      <Dropdown {...others} error={error} value={value} onValueChange={onChange} />
    </InputLabeler>
  )
}
