import { atom } from "jotai"

import type { GalleryItem, MarketItemVariant } from "GraphQL/graphql.ts"

export const quantityAtom = atom(0)
export const selectedImageAtom = atom<GalleryItem | null>(null)
export const previewedImageAtom = atom<GalleryItem | null>(null)
// TODO: enforce non-nullish
export const selectedVariantAtom = atom<MarketItemVariant | null>(null)
