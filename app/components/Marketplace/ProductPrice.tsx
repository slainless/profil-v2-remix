"use client"

import { Text } from "@mantine/core"
import { useAtomValue } from "jotai"

import { selectedVariantAtom } from "Providers/marketplace.ts"

import { IDRFormatterNoComma } from "Modules/intl"

function ProductPrice({ fz }: { fz: number }) {
  const selectedVariant = useAtomValue(selectedVariantAtom)
  return (
    <Text fz={fz} fw="bold">
      {IDRFormatterNoComma.formatNoSpace(+(selectedVariant?.price ?? 0))}
    </Text>
  )
}

export default ProductPrice
