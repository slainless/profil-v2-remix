import { Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import { GalleryHeader } from "Components/Gallery/GalleryHeader.tsx"
import GalleryItem from "Components/Gallery/GalleryItem.tsx"
import PageContainer from "Components/PageContainer.tsx"

import { getLocale } from "Locale/locale.ts"

import { mustGetRootLayoutData } from "../_/data.ts"
import { createDescription, createTitle } from "../_/meta-utils.ts"
import {
  createMetadata,
  renderDescription,
  renderMetadata,
  renderTitle,
} from "../_/meta.ts"

namespace page {
  export const title = "Galeri"
  export const ogTitle = "Galeri {{ desa_fullname }}"
  export const description =
    "Menampilkan kegiatan-kegiatan yang berlangsung di {{ desa_fullname }}"
}

export const meta: MetaFunction = ({ matches }) => {
  const parentData = mustGetRootLayoutData(matches)
  const { profile } = parentData
  const locale = getLocale("ID")

  const title = createTitle(locale, profile, page.title, page.ogTitle)
  const description = createDescription(locale, profile, page.description)
  const metadata = createMetadata(locale, parentData)

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(metadata),
  ]
}

export default function Gallery() {
  return (
    <PageContainer>
      <Stack>
        <GalleryHeader />
        <GalleryItem />
      </Stack>
    </PageContainer>
  )
}
