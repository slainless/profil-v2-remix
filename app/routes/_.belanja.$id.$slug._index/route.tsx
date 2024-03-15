import { Box, Group, Stack, Text } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { stripHtml } from "string-strip-html"
import type { RequiredDeep } from "type-fest"

import { WhatsappContactButton } from "#components/Marketplace/BuyButton.tsx"
import { FavoriteButton } from "#components/Marketplace/FavoriteButton.tsx"
import { Gallery } from "#components/Marketplace/Gallery.tsx"
import { ProductMeta } from "#components/Marketplace/ProductMeta.tsx"
import ProductName from "#components/Marketplace/ProductName.tsx"
import ProductPrice from "#components/Marketplace/ProductPrice.tsx"
import { ReviewSection } from "#components/Marketplace/ReviewSection.tsx"
import { ShareButtons } from "#components/Marketplace/ShareButton.tsx"
import { VariantSelector } from "#components/Marketplace/VariantSelector.tsx"

import { MarketItemHydrator } from "#providers/marketplace.ts"

import { getLocale } from "#locale/locale.ts"

import type { MarketItemCategory } from "#graphql/graphql.ts"

import {
  mustGetMarketItemWithReviews,
  mustGetVariant,
} from "#services/marketplace.ts"
import {
  getVariantPhoto,
  getDefaultPhoto,
  getName,
} from "#services/marketplace.ts"

import {
  breadcrumb,
  link,
  metadata,
  metadatas,
  product,
} from "#modules/metadata.ts"
import { stripURL } from "#modules/url.ts"

import { mustGetCommonContext } from "#server/context.ts"

import {
  createDescription,
  createMetadata,
  createTitle,
  renderDescription,
  renderMetadata,
  renderTitle,
} from "../_/meta.ts"
import { Layout } from "./Layout.tsx"
import {
  createBreadcrumb,
  createOGImages,
  createProduct,
  getTrueUrl,
} from "./meta.ts"

export async function loader({ params, context }: LoaderFunctionArgs) {
  const ctx = mustGetCommonContext(context)

  const id = Number.parseInt(params["id"] ?? "NaN")
  if (Number.isNaN(id) || id < 1) throw new Response(null, { status: 404 })
  const data = await mustGetMarketItemWithReviews(ctx.gqlClient, ctx.schema, id)

  const variant = mustGetVariant(data.product, params)
  const baseUrl = stripURL(ctx.canonUrl)
  return {
    product: data.product,
    reviews: data.reviews,
    variant,
    baseUrl,
    id,
    ...ctx,
  }
}

export const meta: MetaFunction<typeof loader> = ({ data, location }) => {
  if (data == null) return []
  const { product: _product, variant, profile, baseUrl } = data
  const params = new URLSearchParams(location.search)
  const url = getTrueUrl(baseUrl, variant, params)

  const locale = getLocale("ID")

  const productName = getName(_product, variant)
  const title = createTitle(locale, profile, productName)
  const description = createDescription(
    locale,
    profile,
    stripHtml(_product.description).result,
  )
  const author = _product.user?.name ?? `[User dihapus]`

  const _metadata = createMetadata(locale, data, {
    image: createOGImages(data, params),
    author,
    canonical: link("canonical", url),
    "og:url": url,
    // @ts-expect-error ...
    "og:type": "product",
  })

  return [
    ...renderTitle(title),
    ...renderDescription(description),
    ...renderMetadata(_metadata),
    ...metadatas("creator", [author, "PT Digital Desa Indonesia"]),
    metadata("product:plural_title", productName),
    metadata("product:price.amount", variant.price),
    metadata("product:price.currency", "IDR"),
    breadcrumb(createBreadcrumb(data, params)),
    product(createProduct(data, params)),
  ]
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
