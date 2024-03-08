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
