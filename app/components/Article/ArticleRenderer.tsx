import {
  Box,
  TypographyStylesProvider,
  TypographyStylesProviderProps,
} from "@mantine/core"
import omit from "lodash.omit"

import styles from "#theme/generated-content.module.css"

import { HTMLRenderer } from "#components/HTMLRenderer.tsx"

export const ArticleRenderer = (
  props: TypographyStylesProviderProps & {
    children: string
  },
) => {
  return (
    <Box px={{ base: 0, sm: "xl" }}>
      <TypographyStylesProvider
        className={styles.containMedia}
        pl={0}
        {...omit(props, ["children"])}
      >
        <HTMLRenderer withMedia>{props.children}</HTMLRenderer>
      </TypographyStylesProvider>
    </Box>
  )
}
