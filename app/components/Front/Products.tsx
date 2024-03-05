"use client"

import { Carousel, Embla } from "@mantine/carousel"
import {
  Box,
  Stack,
  Title,
  Text,
  Grid,
  Group,
  Button,
  ActionIcon,
  Space,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconNotes,
  IconShoppingCartOff,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useCallback, useState } from "react"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice.tsx"
import ProductItem from "Components/ProductCard.tsx"
import ProductItemCarousel from "Components/ProductCarouselCard.tsx"

import { aliasDesaAtom, schemaAtom } from "Providers/profile.ts"

import { MarketItemCategory } from "GraphQL/graphql.ts"

import { productCardsQuery } from "Queries/marketplace.ts"

import { asset } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils"

function Products() {
  const schema = useAtomValue(schemaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)

  const [{ data }] = useQuery({
    query: productCardsQuery,
    variables: {
      limit: 6,
      desa: schema,
    },
  })

  const [embla, setEmbla] = useState<Embla | null>()

  const handlePrevSlide = useCallback(() => {
    if (embla) {
      embla.scrollPrev()
    }
  }, [embla])

  const handleNextSlide = useCallback(() => {
    if (embla) {
      embla.scrollNext()
    }
  }, [embla])

  const products = data?.products

  return (
    <Stack>
      <Box>
        <Title
          tt={"uppercase"}
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-5")}
        >
          BELI DARI {aliasDesa}
        </Title>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
        >
          Layanan yang disediakan promosi produk UMKM{" "}
          <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>{" "}
          sehingga mampu meningkatkan perekonomian masyarakat{" "}
          <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
        </Text>
      </Box>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Box display={contentsOrNone(products != null && products.length == 0)}>
          <DimmedNotice icon={IconShoppingCartOff} message="Belum Ada Data" />
        </Box>
        <Stack
          display={contentsOrNone(products != null && products?.length > 0)}
        >
          <Group justify="space-between" gap={"xl"}>
            <ActionIcon onClick={handlePrevSlide} size={"xl"} variant="subtle">
              <IconArrowNarrowLeft color="#000" size="2.125rem" />
            </ActionIcon>
            <ActionIcon onClick={handleNextSlide} size={"xl"} variant="subtle">
              <IconArrowNarrowRight color="#000" size="2.125rem" />
            </ActionIcon>
          </Group>
          <Carousel
            w={"90vw"}
            slideSize="80%"
            slideGap="sm"
            align={"start"}
            loop
            withControls={false}
            getEmblaApi={setEmbla}
          >
            {products?.map((item, index) => {
              return (
                <Carousel.Slide key={index}>
                  <ProductItemCarousel
                    title={item.name}
                    thumbnail={asset.marketItem({
                      file: item.defaultPhoto?.URL,
                    })}
                    price={parseInt(item.defaultVariant?.price ?? "")}
                    description={item.description}
                    category={item.category as MarketItemCategory}
                    rating={item.rating}
                    views={item.views ?? 0}
                    ID={item.ID}
                    slug={item.slug}
                  />
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Button
            component={Link}
            to={"/belanja"}
            variant="outline"
            color={vars("color-primary-4")}
            radius={"md"}
            fullWidth
          >
            Lihat Semua
          </Button>
        </Stack>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Box visibleFrom="sm">
        <Box display={contentsOrNone(products != null && products?.length > 0)}>
          <Grid gutter={"xl"} style={{ overflow: "visible" }}>
            {products?.map((item, index) => {
              return (
                <Grid.Col key={index} span={{ md: 4 }}>
                  <ProductItem
                    title={item.name}
                    thumbnail={asset.marketItem({
                      file: item.defaultPhoto?.URL,
                    })}
                    price={parseInt(item.defaultVariant?.price ?? "")}
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
          <Space h={"md"} />
          <Group justify="flex-end" visibleFrom="sm">
            <Button
              style={{ border: 0 }}
              variant="default"
              bg={"transparent"}
              leftSection={<IconNotes color="black" />}
            >
              <Text
                c="black"
                tt={"uppercase"}
                fw={"bold"}
                component={Link}
                to={"/belanja"}
              >
                LIHAT PRODUK LEBIH BANYAK
              </Text>
            </Button>
          </Group>
        </Box>
        <Box display={contentsOrNone(products != null && products.length == 0)}>
          {" "}
          <DimmedNotice
            icon={IconShoppingCartOff}
            message={`Belum ada produk ${aliasDesa} yang dipasarkan`}
          />
        </Box>
      </Box>
      {/* End Desktop */}
    </Stack>
  )
}

export default Products
