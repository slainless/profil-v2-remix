"use client"

import { selectedVariantAtom } from "#providers/marketplace.ts"
import { Title } from "@mantine/core"
import { useAtomValue } from "jotai"

function ProductName({ productName, fz }: { productName: string; fz: number }) {
  const selectedVariant = useAtomValue(selectedVariantAtom)
  return (
    <Title fz={fz} fw={500} tt="capitalize">
      {`${productName}${
        selectedVariant?.name ? ` - ${selectedVariant.name}` : ""
      }`}
    </Title>
  )
}

export default ProductName
