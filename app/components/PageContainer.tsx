import { Container, ContainerProps } from "@mantine/core"
import React from "react"

import { vars } from "#theme/artifact/vars.mjs"

type Props = {
  children: React.ReactNode
} & ContainerProps

function PageContainer({ children, ...props }: Props) {
  return (
    <Container
      mt={{ base: 40, sm: 80 }}
      px="md"
      py="xl"
      mb="xl"
      maw={{
        lg: vars("breakpoint-lg"),
        xl: vars("breakpoint-xl"),
      }}
      style={{
        ...(props.style ?? {}),
        overflow: "visible",
      }}
      {...props}
    >
      {children}
    </Container>
  )
}

export default PageContainer
