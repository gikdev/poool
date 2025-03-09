import { Text } from "react-native"

interface PLDevShowJSONProps<T> {
  data?: T
  forceShowEvenIfEmpty?: boolean
}

export function PLDevShowJSON<T>({ data, forceShowEvenIfEmpty }: PLDevShowJSONProps<T>) {
  const comp = (
    <Text
      style={{
        overflow: "scroll",
        backgroundColor: "#121212",
        borderRadius: 8,
        color: "white",
        direction: "ltr",
        fontFamily: "monospace",
        marginTop: 8,
        padding: 16,
      }}
    >
      {JSON.stringify(data, null, 2)}
    </Text>
  )

  if (forceShowEvenIfEmpty) return comp
  return data ? comp : null
}
