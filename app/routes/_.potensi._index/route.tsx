import { Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"

namespace page {
  export const title = "Potensi {{ desa_alias }}"
  export const ogTitle = "Potensi {{ desa_fullname }}"
  export const description =
    "Segala hal mengenai potensi {{ desa_fullname }} yang dapat dikembangkan dan menjadi nilai jual"
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/potensi")
  return null
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
