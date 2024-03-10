import { Text, TextProps } from "@mantine/core"
import { ReactNode } from "react"

export const Span = (props: TextProps & { children?: ReactNode }) => (
  <Text {...props} component="span"></Text>
)
