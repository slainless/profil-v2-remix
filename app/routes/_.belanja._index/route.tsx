import { Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import Content from "#components/Marketplace/Content.tsx"
import Header from "#components/Marketplace/Header.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { getLocale } from "#locale/locale.ts"

import { TickType, tick } from "#services/.server/visit.js"

import { breadcrumb } from "#modules/metadata.ts"
import { stripURL } from "#modules/url.ts"

import { assertCommonContext } from "#server/context.js"

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

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/")
  return null
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
