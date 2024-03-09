/* eslint-disable @typescript-eslint/no-explicit-any */
import normalizeUrl from "normalize-url"
import type { BreadcrumbList, Product, Review, WithContext } from "schema-dts"
import type { RequiredDeep } from "type-fest"
import urlJoin from "url-join"

import type { GalleryItem, MarketItemVariant } from "GraphQL/graphql.ts"

import { asset } from "Services/assets.ts"
import { getName, getSearchParams } from "Services/marketplace.ts"

import { OpenGraph } from "Modules/metadata.ts"

import type { loader } from "./route.tsx"

type Data = RequiredDeep<Awaited<ReturnType<typeof loader>>>
export function createBreadcrumb(data: Data, params: URLSearchParams) {
  const { baseUrl, product, variant } = data
  const vid = params.get("v_id")
  const url = getTrueUrl(baseUrl, variant, params)
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beli",
        item: normalizeUrl(urlJoin(baseUrl, "../../")),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: product.name,
        item: baseUrl,
      },
    ],
  } satisfies WithContext<BreadcrumbList>
  if (vid != null && vid !== "")
    breadcrumbList.itemListElement.push({
      "@type": "ListItem",
      position: 3,
      name: variant.name === "" ? "Standar" : variant.name,
      item: url,
    })

  return breadcrumbList
}

const mediaToOG = (media: Pick<GalleryItem, "URL" | "caption">) =>
  ({
    "og:image:url": asset.marketItem({ file: media.URL }),
    "og:image:alt": media.caption,
  }) satisfies Partial<OpenGraph.Image>

export function createOGImages(data: Data, params: URLSearchParams) {
  const { variant, product } = data
  if (product.media.length === 1) return [mediaToOG(product.media[0])]

  const vid = params.get("v_id")
  if (vid == null || vid === "")
    return product.media
      .map((media, index) => [index, media] as const)
      .sort((a, b) => (a[1].ID === variant.photoID ? -1 : a[0] - b[0]))
      .map((v) => mediaToOG(v[1]))

  const media = product.media.find((media) => media.ID === variant.photoID)
  if (media == null) return [mediaToOG(product.media[0])]
  return [mediaToOG(media)]
}

export function createProduct(data: Data, params: URLSearchParams) {
  const { baseUrl, product, variant, reviews } = data
  const url = getTrueUrl(baseUrl, variant, params)

  const productRichData: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: getName(product, variant),
    description: product.description,
    image: createOGImages(data, params).map((image) => image["og:image:url"]),
    offers: {
      "@type": "Offer",
      url,
      price: variant.price,
      priceCurrency: "IDR",
      availability:
        variant.isLimitedByStock == false
          ? "InStock"
          : variant.stock > 0
            ? "InStock"
            : "OutOfStock",
    },
  }

  if (reviews.length <= 0 || product.reviews <= 0) return productRichData
  productRichData.aggregateRating = {
    "@type": "AggregateRating",
    reviewCount: product.reviews,
    ratingValue: product.rating,
    bestRating: 5,
    worstRating: 0,
  }
  productRichData.review = reviews.map((review) => {
    return {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
      },
      author: {
        "@type": "Person",
        name: review.user?.name,
      },
      reviewBody: review.comment,
      dateCreated: review.createdAt,
      dateModified: review.updatedAt,
    } satisfies Review
  })

  return productRichData
}

export const getTrueUrl = (
  baseUrl: string,
  variant: Pick<MarketItemVariant, "name" | "ID">,
  params: URLSearchParams,
): string => {
  const vid = params.get("v_id")
  if (vid == null || vid === "") return baseUrl
  return baseUrl + "?" + getSearchParams(variant)
}
