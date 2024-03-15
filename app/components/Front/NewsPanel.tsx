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
  IconNewsOff,
  IconNotes,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useCallback, useState } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import NewsItem from "#components/NewsCard.tsx"
import NewsItemCarousel from "#components/NewsCarouselCard.tsx"

import { aliasDesaAtom, profileAtom } from "#providers/profile.ts"

import { ArticleTypeValue } from "#graphql/graphql.ts"

import { articlesQuery } from "#queries/articles.ts"

import { asset, withAtom } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

function NewsPanel() {
  const profile = useAtomValue(profileAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)

  const [{ data }] = useQuery({
    query: articlesQuery,
    variables: { limit: 6, type: ArticleTypeValue.General },
    // errorPolicy: "all",
  })
  const articles = data?.articles

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

  return (
    <Stack>
      <Box>
        <Title
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-5")}
        >
          Berita {aliasDesa}
        </Title>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
        >
          Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan
          artikel-artikel jurnalistik dari{" "}
          {`${profile.alias.desa} ${profile.name.deskel}`}
        </Text>
        {/* Mobile */}
        <Stack hiddenFrom="sm">
          <Box
            display={contentsOrNone(articles != null && articles.length == 0)}
          >
            <DimmedNotice icon={IconNewsOff} message="Belum Ada Data" />
          </Box>
          <Stack display={contentsOrNone((articles?.length ?? 0) > 0)}>
            <Group justify="space-between" gap={"xl"}>
              <ActionIcon
                onClick={handlePrevSlide}
                size={"xl"}
                variant="subtle"
              >
                <IconArrowNarrowLeft color="#000" size="2.125rem" />
              </ActionIcon>
              <ActionIcon
                onClick={handleNextSlide}
                size={"xl"}
                variant="subtle"
              >
                <IconArrowNarrowRight color="#000" size="2.125rem" />
              </ActionIcon>
            </Group>

            <Carousel
              w={"90vw"}
              slideSize="90%"
              slideGap="sm"
              align={"start"}
              loop
              withControls={false}
              getEmblaApi={setEmbla}
            >
              {articles?.map((item, index) => {
                return (
                  <Carousel.Slide key={index}>
                    <NewsItemCarousel
                      title={item.title}
                      author={item.user?.name ?? ""}
                      date={item.createdAt}
                      thumbnail={withAtom(asset.gallery)({
                        file: item.thumbnail?.URL,
                      })}
                      description={item.short}
                      slug={item.slug}
                      views={item.views ?? 0}
                    />
                  </Carousel.Slide>
                )
              })}
            </Carousel>

            <Button
              component={Link}
              to={"/berita"}
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
      </Box>

      {/* Desktop */}
      <Box visibleFrom="sm">
        <Box display={contentsOrNone(articles != null && articles.length == 0)}>
          <DimmedNotice
            icon={IconNewsOff}
            message="Belum ada artikel berita yang diterbitkan"
          />
        </Box>
        <Box display={contentsOrNone((articles?.length ?? 0) > 0)}>
          <Grid gutter="xl" style={{ overflow: "visible" }}>
            {articles?.map((item, index) => {
              return (
                <Grid.Col key={index} span={{ md: 4 }}>
                  <NewsItem
                    title={item.title}
                    author={item.user?.name ?? ""}
                    date={item.createdAt}
                    thumbnail={withAtom(asset.gallery)({
                      file: item.thumbnail?.URL,
                    })}
                    description={item.short}
                    slug={item.slug}
                    views={item.views ?? 0}
                  />
                </Grid.Col>
              )
            })}
          </Grid>
          <Space h={"md"} />
          <Group justify="flex-end">
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
                to={"/berita"}
              >
                LIHAT BERITA LEBIH BANYAK
              </Text>
            </Button>
          </Group>
        </Box>
      </Box>
      {/* End Desktop */}
    </Stack>
  )
}

export default NewsPanel
