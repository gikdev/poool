import { Alert, type AlertButton, type AlertOptions, Platform } from "react-native"

export function universalAlert(
  title: string,
  message?: string,
  buttons?: AlertButton[],
  options?: AlertOptions,
) {
  if (Platform.OS === "web") {
    window.alert(title)
    return
  }

  Alert.alert(title, message, buttons, options)
}

export const persianizeStr = (input: string | number) =>
  input
    .toString()
    .replaceAll("0", "۰")
    .replaceAll("1", "۱")
    .replaceAll("2", "۲")
    .replaceAll("3", "۳")
    .replaceAll("4", "۴")
    .replaceAll("5", "۵")
    .replaceAll("6", "۶")
    .replaceAll("7", "۷")
    .replaceAll("8", "۸")
    .replaceAll("9", "۹")
