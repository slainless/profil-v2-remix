import { Box, BoxProps, Card, Stack, StackProps, Text } from "@mantine/core"
import { PropsWithChildren } from "react"

import PageContainer from "Components/PageContainer.tsx"
import { Spacer } from "Components/Spacer.tsx"

import style from "./Layout.module.css"

export namespace Layout {
  export const Root = PageContainer

  export const Container = (props: PropsWithChildren<BoxProps>) => {
    return (
      <Card bg={"rgba(255, 255, 255, 0.5)"} withBorder {...props}>
        <Box className={style.container} {...props} />
      </Card>
    )
  }

  export const Gallery = ({ children }: PropsWithChildren) => {
    return (
      <Box className={style.gallery}>
        <div>{children}</div>
      </Box>
    )
  }

  export const Content = ({ children }: PropsWithChildren) => {
    return <Box className={style.content}>{children}</Box>
  }

  export const Review = ({ children, ...rest }: StackProps) => {
    return (
      <Stack {...rest}>
        <Spacer />
        <Box>
          <Text fz={18} fw={700} mb={10} tt="uppercase">
            Ulasan Pembeli
          </Text>
          {children}
        </Box>
      </Stack>
    )
  }
}
