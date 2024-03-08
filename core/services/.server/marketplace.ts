import type { Params } from "@remix-run/react"
import type { Client } from "urql"

import type {
  GalleryItem,
  MarketItem,
  MarketItemVariant,
} from "GraphQL/graphql.ts"

import {
  productQuery,
  productSlugQuery,
  productWithReviewsQuery,
} from "Queries/marketplace.ts"

import { UnderscoredCode } from "Modules/domain-handler"
import { withHeaders } from "Modules/urql.ts"

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
