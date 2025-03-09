import { useController } from "react-hook-form"
import PLText from "../PLText"
import InputLabeler, { type InputLabelerProps } from "./InputLabeler"
import PLSwitch from "./PLSwitch"

export interface RHFSwitchProps extends InputLabelerProps {
  name: string
}

export default function RHFSwitch({
  name,
  label,
  containerStyle,
  labelStyle,
  // children, // not needed
  // error, // not needed
  // style, // not needed
}: RHFSwitchProps) {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({ name })

  return (
    <InputLabeler
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 4,
      }}
      containerStyle={containerStyle}
      error={error}
    >
      {label && <PLText style={[{ fontFamily: "VazirmatnBold" }, labelStyle]}>{label}</PLText>}
      <PLSwitch checked={value} onCheckChange={onChange} />
    </InputLabeler>
  )
}
