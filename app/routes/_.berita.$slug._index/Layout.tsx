import { Box, Paper, Stack } from "@mantine/core"
import { PropsWithChildren, ComponentProps } from "react"

import { MoreArticleList } from "Components/Article/MoreArticleList.tsx"
import PageContainer from "Components/PageContainer"

import styles from "./Layout.module.css"

export namespace Layout {
  export const Root = ({ children }: PropsWithChildren) => {
    return (
      <PageContainer>
        <Box className={styles.root}>{children}</Box>
      </PageContainer>
    )
  }

  export const Content = ({ children }: PropsWithChildren) => {
    return (
      <Paper
        className={styles.content}
        p={{ base: 0, sm: "xl" }}
        bg={{ base: "transparent", sm: "#fff" }}
      >
        {children}
      </Paper>
    )
  }

  export const Sidebar = (props: ComponentProps<typeof MoreArticleList>) => {
    return (
      <Box className={styles.sidebar}>
        <Stack>
          <MoreArticleList {...props} />
        </Stack>
      </Box>
    )
  }
}
