import { Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import { GalleryHeader } from "#components/Gallery/GalleryHeader.tsx"
import GalleryItem from "#components/Gallery/GalleryItem.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"

namespace page {
  export const title = "Galeri"
  export const ogTitle = "Galeri {{ desa_fullname }}"
  export const description =
    "Menampilkan kegiatan-kegiatan yang berlangsung di {{ desa_fullname }}"
}

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/galeri")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
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
