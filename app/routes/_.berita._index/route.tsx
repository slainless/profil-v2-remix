import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { renderCommonMetadata } from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"
import { page } from "./meta.ts"

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function NewsList() {
  return (
    <PageContainer>
      <Stack gap={"xl"}>
        <Header />
        <Content />
      </Stack>
    </PageContainer>
  )
}
