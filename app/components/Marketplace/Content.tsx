"use client"

import { Box, Grid, Stack } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useEffect } from "react"
import { useQuery } from "urql"

import { DimmedNotice } from "Components/DimmedNotice.tsx"
import { usePagination } from "Components/Hooks/use-pagination.ts"
import { PageNavigation } from "Components/PageNavigation.tsx"
import ProductItem from "Components/ProductCard.tsx"

import { schemaAtom } from "Providers/profile.ts"

import { MarketItemCategory, ProductsQuery } from "GraphQL/graphql.ts"

import { productCardsQuery } from "Queries/marketplace.ts"

import { asset } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

function Content() {
  const schema = useAtomValue(schemaAtom)
  const {
    limit,
    cursor,
    isTouched,
    currentPage,
    addResult,
    nextCursor,
    prevCursor,
  } = usePagination<ProductsQuery["products"]>(6)

  const [{ fetching: loading, data }] = useQuery({
    query: productCardsQuery,
    variables: {
      desa: schema,
      limit,
      cursor,
    },
  })

  useEffect(() => {
    if (loading == true) return
    if (data?.products != null) addResult(data.products)
  }, [addResult, data, loading])
  return (
    <Box>
      <Stack
        display={contentsOrNone(
          data?.products != null && data?.products.length > 0,
        )}
      >
        {/* <TextInput
        hiddenFrom="sm"
        placeholder="Cari"
        rightSectionWidth={42}
        rightSection={
          <IconSearch
            style={{ width: rem(18), height: rem(18) }}
            stroke={1.5}
          />
        }
      /> */}

        <Grid gutter={{ base: "sm", sm: "xl" }} style={{ overflow: "visible" }}>
          {currentPage.items?.map((item, index) => {
            const thumbnail = item.defaultPhoto
            const variant = item.defaultVariant

            return (
              <Grid.Col key={index} span={{ md: 4 }}>
                <ProductItem
                  title={item.name}
                  thumbnail={asset.marketItem({
                    file: thumbnail?.URL,
                  })}
                  price={parseInt(variant?.price ?? "")}
                  description={item.description}
                  category={item.category as MarketItemCategory}
                  rating={item.rating}
                  views={item.views ?? 0}
                  ID={item.ID}
                  slug={item.slug}
                />
              </Grid.Col>
            )
          })}
        </Grid>
        <Box display={contentsOrNone(isTouched)}>
          <Box p={20}>
            <PageNavigation
              onPrev={prevCursor}
              onNext={nextCursor}
              isPrevDisabled={loading || currentPage.isFirstPage}
              isNextDisabled={loading || currentPage.isLastPage || !isTouched}
            />
          </Box>
        </Box>
      </Stack>
      <Box
        display={contentsOrNone(
          data?.products != null && data?.products.length == 0,
        )}
      >
        <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
      </Box>
    </Box>
  )
}

export default Content
