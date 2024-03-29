import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"

import MapSection from "#components/Map/MapSection.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.ts"

import { renderCommonMetadata } from "../_/meta.ts"

export async function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/listing")
  return {
    slug: context.slug,
  }
}

namespace page {
  export const title = "Listing"
  export const ogTitle = "Listing {{ desa_fullname }}"
  export const description =
    "Menyajikan peta geospasial dan titik lokasi menarik (point of interest) dari {{ desa_fullname }}"
}

export const meta: MetaFunction<typeof loader> = (args) => {
  return renderCommonMetadata(args, page)
}

export default function Listing() {
  const { slug } = useLoaderData<typeof loader>()
  return (
    <PageContainer>
      <MapSection slug={slug} />
    </PageContainer>
  )
}
