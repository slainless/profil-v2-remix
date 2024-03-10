import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import Content from "Components/Marketplace/Content.tsx"
import Header from "Components/Marketplace/Header.tsx"
import PageContainer from "Components/PageContainer.tsx"

import { getLocale } from "Locale/locale.ts"

import { breadcrumb } from "Modules/metadata.ts"
import { stripURL } from "Modules/url.ts"

import { mustGetRootLayoutData } from "../_/data.ts"
import { createDescription, createTitle } from "../_/meta-utils.ts"
import {
  createMetadata,
  renderDescription,
  renderMetadata,
  renderTitle,
} from "../_/meta.ts"

namespace page {
  export const title = "Beli dari {{ desa_alias }}"
  export const ogTitle = "Beli dari {{ desa_fullname }}"
  export const description =
    "Layanan yang disediakan untuk promosi produk UMKM sehingga mampu meningkatkan perekonomian masyarakat {{ desa_fullname }}"
}

export const meta: MetaFunction = ({ matches }) => {
  const data = mustGetRootLayoutData(matches)
  const { profile, canonUrl } = data
  const baseUrl = stripURL(canonUrl)

  const locale = getLocale("ID")
  const title = createTitle(locale, profile, page.title, page.ogTitle)
  const description = createDescription(locale, profile, page.description)
  const metadata = createMetadata(locale, data)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(metadata),
    breadcrumb({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Beli",
          item: baseUrl,
        },
      ],
    }),
  ]
}

export default function Marketplace() {
  return (
    <PageContainer>
      <Stack>
        <Header />
        <Content />
      </Stack>
    </PageContainer>
  )
}
