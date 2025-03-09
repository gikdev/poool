import { type StyleProp, StyleSheet, View, type ViewStyle } from "react-native"
import FKBtn from "../Btn"

type FirstBtnType = "cancel" | "back"
type SecondBtnType = "next" | "confirm" | "start"

export interface BtnsControlProps {
  firstBtnType?: FirstBtnType
  onFirstBtnClick?: () => void
  secondBtnType?: SecondBtnType
  onSecondBtnClick?: () => void
  style?: StyleProp<ViewStyle>
}

export default function BtnsControl({
  firstBtnType,
  secondBtnType,
  onFirstBtnClick,
  onSecondBtnClick,
  style,
}: BtnsControlProps) {
  return (
    <View style={[styles.btnsContainer, style]}>
      {firstBtnType === "cancel" && (
        <FKBtn
          title="انصراف"
          themeColor="red"
          onPress={onFirstBtnClick}
          icons={{ startIconName: "x" }}
          style={{ flex: 1 }}
        />
      )}

      {firstBtnType === "back" && (
        <FKBtn
          title="بازگشت"
          themeColor="orange"
          onPress={onFirstBtnClick}
          icons={{ startIconName: "arrow-right" }}
          style={{ flex: 1 }}
        />
      )}

      {secondBtnType === "next" && (
        <FKBtn
          title="بعدی"
          onPress={onSecondBtnClick}
          icons={{ endIconName: "arrow-left" }}
          style={{ flex: 2 }}
        />
      )}

      {secondBtnType === "confirm" && (
        <FKBtn
          title="تایید و ثبت"
          themeColor="green"
          onPress={onSecondBtnClick}
          icons={{ endIconName: "check-square" }}
          style={{ flex: 2 }}
        />
      )}

      {secondBtnType === "start" && (
        <FKBtn
          title="شروع"
          themeColor="green"
          onPress={onSecondBtnClick}
          icons={{ startIconName: "check-square" }}
          style={{ flex: 1 }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  btnsContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 16,
  },
})
