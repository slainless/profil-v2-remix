import { Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"

export namespace page {
  export const title = "Wisata"
  export const ogTitle = "Wisata {{ desa_fullname }}"
  export const description =
    "Segala hal mengenai lokasi wisata {{ desa_fullname }} yang menjadi daya tarik untuk turis domestik maupun mancanegara"
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/wisata")
  return null
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
