import type { Params } from "@remix-run/react"
import kebabCase from "lodash.kebabcase"
import type { Client } from "urql"

import type {
  GalleryItem,
  MarketItem,
  MarketItemVariant,
} from "GraphQL/graphql.ts"

import {
  productSlugQuery,
  productQuery,
  productWithReviewsQuery,
} from "Queries/marketplace.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"
import { withHeaders } from "Modules/urql.ts"

export const getDefaultPhoto = (
  item: Pick<MarketItem, "media"> & { defaultPhoto: Pick<GalleryItem, "ID"> },
) => item.media.find((media) => media.ID === item.defaultPhoto.ID)!

export const getVariantPhoto = (
  item: {
    media: GalleryItem[]
    defaultPhoto: Pick<GalleryItem, "ID">
    variants: Pick<MarketItemVariant, "photoID">[]
  },
  variant: Pick<MarketItemVariant, "photoID">,
) => item.media.find((media) => media.ID === variant.photoID)

export const getName = (
  item: Pick<MarketItem, "name">,
  variant: Pick<MarketItemVariant, "name">,
) => {
  if (variant.name == "") return item.name
  return `${item.name} - ${variant.name}`
}

export const getSearchParams = (
  variant: Pick<MarketItemVariant, "name" | "ID">,
  url?: URL,
): string => {
  const searchParams = url
    ? new URLSearchParams(url.search)
    : new URLSearchParams("")
  searchParams.set("v_id", variant.ID + "")
  if (variant.name == "") searchParams.delete("v_name")
  else searchParams.set("v_name", kebabCase(variant.name))
  return searchParams.toString()
}

export const getMarketItemSlug = (
  client: Client,
  schema: UnderscoredCode,
  id: number,
) => {
  return client.query(
    productSlugQuery,
    { ID: id, schema: schema },
    withHeaders(schema),
  )
}

export const getMarketItem = (
  client: Client,
  schema: UnderscoredCode,
  id: number,
) => {
  return client.query(
    productQuery,
    { ID: id, schema: schema! },
    withHeaders(schema),
  )
}

export const getMarketItemWithReviews = (
  client: Client,
  schema: UnderscoredCode,
  id: number,
) => {
  return client.query(
    productWithReviewsQuery,
    { ID: id, schema: schema! },
    withHeaders(schema),
  )
}

export const mustGetMarketItemSlug = async (
  ...args: Parameters<typeof getMarketItemSlug>
) => {
  const { data, error } = await getMarketItemSlug(...args)
  if (error != null) throw error
  if (data?.product?.slug == null) throw new Response(null, { status: 404 })
  return data.product.slug
}

export const mustGetMarketItemWithReviews = async (
  ...args: Parameters<typeof getMarketItemWithReviews>
) => {
  const { data, error } = await getMarketItemWithReviews(...args)
  if (error != null) throw error
  if (data == null) throw new Response(null, { status: 404 })

  const { product, reviews } = data
  if (product == null) throw new Response(null, { status: 404 })
  return { product, reviews }
}

export const mustGetVariant = (
  item: Pick<MarketItem, "variants"> & { defaultVariant: { ID: number } },
  params: Params<string>,
): MarketItemVariant => {
  const vid = params["v_id"]
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (vid == null) break
    if (Array.isArray(vid)) break
    const id = +vid
    if (Number.isNaN(id)) break
    const variant = item.variants.find((v) => v.ID === id)
    if (variant == null) break
    return variant
  }
  const variant = item.variants.find((v) => v.ID === item.defaultVariant.ID)
  if (variant == null) throw new Response(null, { status: 404 })
  return variant
}
