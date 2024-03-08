import { Box, Group, Stack, Text } from "@mantine/core"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import type { RequiredDeep } from "type-fest"

import { WhatsappContactButton } from "Components/Marketplace/BuyButton.tsx"
import { FavoriteButton } from "Components/Marketplace/FavoriteButton.tsx"
import { Gallery } from "Components/Marketplace/Gallery.tsx"
import { ProductMeta } from "Components/Marketplace/ProductMeta.tsx"
import ProductName from "Components/Marketplace/ProductName.tsx"
import ProductPrice from "Components/Marketplace/ProductPrice.tsx"
import { ReviewSection } from "Components/Marketplace/ReviewSection.tsx"
import { ShareButtons } from "Components/Marketplace/ShareButton.tsx"
import { VariantSelector } from "Components/Marketplace/VariantSelector.tsx"

import { MarketItemHydrator } from "Providers/marketplace.ts"

import type { MarketItemCategory } from "GraphQL/graphql.ts"

import { mustNormalizeContext } from "Services/.server/context.ts"
import {
  mustGetMarketItemWithReviews,
  mustGetVariant,
} from "Services/.server/marketplace.ts"
import { getVariantPhoto, getDefaultPhoto } from "Services/marketplace.ts"

import { Layout } from "./Layout.tsx"

export async function loader({ params, context }: LoaderFunctionArgs) {
  const ctx = mustNormalizeContext(context)

  const id = Number.parseInt(params["id"] ?? "NaN")
  if (Number.isNaN(id) || id < 1) throw new Response(null, { status: 404 })
  const data = await mustGetMarketItemWithReviews(
    context.gqlClient,
    ctx.schema,
    id,
  )

  const variant = mustGetVariant(data.product, params)
  const baseUrl = new URL(ctx.canonUrl)
  baseUrl.search = ""
  return {
    product: data.product,
    variant,
    baseUrl: baseUrl.href,
    id,
  }
}

export default function MarketplaceProduct() {
  const data = useLoaderData<typeof loader>()
  const { product, variant, baseUrl, id } = data as RequiredDeep<typeof data>
  const onlyOneVariant = product.variants.length === 1

  return (
    <Layout.Root>
      <MarketItemHydrator
        initialSelectedImage={
          getVariantPhoto(product, variant) ?? getDefaultPhoto(product)
        }
        initialSelectedVariant={variant}
      />
      <Layout.Container>
        <Layout.Gallery>
          <Gallery images={product.media} />
        </Layout.Gallery>
        <Layout.Content>
          <Group align="flex-start">
            <Stack gap={5} style={{ flexGrow: 1 }}>
              <ProductName productName={product.name} fz={32} />
              <ProductMeta
                ratingN={product.reviews}
                rating={product.rating}
                category={product.category as MarketItemCategory}
                views={product.views ?? 0}
              />
            </Stack>
            <FavoriteButton />
          </Group>
          <ProductPrice fz={32} />
          <Text mt={24}>{product.description}</Text>
          {!onlyOneVariant && (
            <VariantSelector
              productName={product.name}
              images={product.media}
              variants={product.variants}
            />
          )}
          <Box mt={20}>
            <WhatsappContactButton number={product.user?.phone ?? ""} />
          </Box>
          <ShareButtons url={baseUrl} />
        </Layout.Content>
      </Layout.Container>

      <Layout.Review mt={16}>
        <ReviewSection productID={id} />
      </Layout.Review>
    </Layout.Root>
  )
}
