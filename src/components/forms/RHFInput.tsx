import { useController } from "react-hook-form"
import type { BaseInputProps } from "./BaseInput"
import BaseInput from "./BaseInput"
import InputLabeler, { type InputLabelerProps } from "./InputLabeler"

export type RHFInputProps = {
  name: string
  numberMode?: boolean
} & BaseInputProps &
  InputLabelerProps

/** FKRHFInput: FalaK React Hook Form Input */
export default function FKRHFInput({
  name,
  label,
  numberMode = false,
  containerStyle,
  labelStyle,
  dir,
  ...others
}: RHFInputProps) {
  const {
    field: { value, onChange, onBlur },
    fieldState: { error },
  } = useController({ name })

  return (
    <InputLabeler
      label={label}
      containerStyle={containerStyle}
      error={error}
      labelStyle={labelStyle}
    >
      <BaseInput
        value={value}
        onChangeText={t => onChange(numberMode ? Number(t) : t)}
        onBlur={onBlur}
        error={error}
        dir={dir}
        {...others}
      />
    </InputLabeler>
  )
}
