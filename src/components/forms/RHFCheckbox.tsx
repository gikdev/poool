import { useController } from "react-hook-form"
import PLText from "../PLText"
import InputLabeler, { type InputLabelerProps } from "./InputLabeler"
import PLCheckbox from "./PLCheckbox"

export interface RHFCheckboxProps extends InputLabelerProps {
  name: string
}

export default function RHFCheckbox({
  name,
  label,
  containerStyle,
  labelStyle,
  // children, // not needed
  // error, // not needed
  // style, // not needed
}: RHFCheckboxProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  return (
    <InputLabeler
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 4,
      }}
      containerStyle={containerStyle}
      error={error}
    >
      <PLCheckbox checked={value} onCheckChange={onChange} />
      {label && <PLText style={[{ fontFamily: "VazirmatnBold" }, labelStyle]}>{label}</PLText>}
    </InputLabeler>
  )
}
