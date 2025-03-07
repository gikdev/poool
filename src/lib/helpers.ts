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
