import kebabCase from "lodash.kebabcase"

import type {
  GalleryItem,
  MarketItem,
  MarketItemVariant,
} from "GraphQL/graphql.ts"

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
