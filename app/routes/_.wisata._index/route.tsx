import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PageContainer from "Components/PageContainer.tsx"

import { renderCommonMetadata } from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"

export namespace page {
  export const title = "Wisata"
  export const ogTitle = "Wisata {{ desa_fullname }}"
  export const description =
    "Segala hal mengenai lokasi wisata {{ desa_fullname }} yang menjadi daya tarik untuk turis domestik maupun mancanegara"
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function WisataList() {
  return (
    <PageContainer>
      <Stack gap={"xl"}>
        <Header />
        <Content />
      </Stack>
    </PageContainer>
  )
}
