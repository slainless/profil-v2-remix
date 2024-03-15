import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { renderCommonMetadata } from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"

namespace page {
  export const title = "Potensi {{ desa_alias }}"
  export const ogTitle = "Potensi {{ desa_fullname }}"
  export const description =
    "Segala hal mengenai potensi {{ desa_fullname }} yang dapat dikembangkan dan menjadi nilai jual"
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PotensiList() {
  return (
    <PageContainer>
      <Stack gap={"xl"}>
        <Header />
        <Content />
      </Stack>
    </PageContainer>
  )
}
