import { atom } from "jotai"
import { useHydrateAtoms } from "jotai/utils"

import type { GalleryItem, MarketItemVariant } from "GraphQL/graphql.ts"

export const quantityAtom = atom(0)
export const selectedImageAtom = atom<GalleryItem | null>(null)
export const previewedImageAtom = atom<GalleryItem | null>(null)
// TODO: enforce non-nullish
export const selectedVariantAtom = atom<MarketItemVariant | null>(null)

export interface MarketItemHydratorProps {
  initialSelectedVariant: MarketItemVariant
  initialSelectedImage: GalleryItem
}
export const MarketItemHydrator = ({
  initialSelectedVariant,
  initialSelectedImage,
}: MarketItemHydratorProps) => {
  useHydrateAtoms(
    [
      [selectedVariantAtom, initialSelectedVariant],
      [selectedImageAtom, initialSelectedImage],
    ],
    {
      // dangerouslyForceHydrate: true,
    },
  )

  return null
}
