import { Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import PageContainer from "#components/PageContainer.tsx"

import { getLocale } from "#locale/locale.ts"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { mustGetRootLayoutData } from "../_/data.ts"
import {
  createDescription,
  createMetadata,
  createTitle,
  renderDescription,
  renderGovernmentRichData,
  renderMetadata,
  renderTitle,
} from "../_/meta.ts"
import Content from "./Content.tsx"
import { Header } from "./Header.tsx"

namespace page {
  export const title = "SOTK (Pemerintah)"
  export const ogTitle = "SOTK {{ desa_fullname }}"
  export const description =
    "Struktur Organisasi dan Tata Kerja {{ desa_fullname }}"
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/pemerintah")
  return null
}

export const meta: MetaFunction = ({ matches }) => {
  const data = mustGetRootLayoutData(matches)
  const { profile } = data
  const locale = getLocale("ID")

  const title = createTitle(locale, profile, page.title, page.ogTitle)
  const description = createDescription(locale, profile, page.description)
  const metadata = createMetadata(locale, data)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(metadata),
    ...renderGovernmentRichData(locale, data, metadata),
  ]
}

export default function SOTK() {
  return (
    <PageContainer>
      <Stack>
        <Header />
        <Content />
      </Stack>
    </PageContainer>
  )
}
