import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PageContainer from "Components/PageContainer.tsx"

import { getLocale } from "Locale/locale.ts"

import { mustGetRootLayoutData } from "../_/data.ts"
import {
  createMetadata,
  renderDescription,
  renderMetadata,
  createTitle,
  createDescription,
  renderTitle,
} from "../_/meta.ts"
import { Content } from "./Content.tsx"
import { Header } from "./Header.tsx"
import { page } from "./meta.ts"

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
  ]
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
