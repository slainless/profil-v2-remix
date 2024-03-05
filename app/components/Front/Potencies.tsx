"use client"

import { Carousel, Embla } from "@mantine/carousel"
import {
  Box,
  Stack,
  Title,
  Text,
  Image,
  Group,
  ActionIcon,
  Button,
  SimpleGrid,
  BackgroundImage,
  Center,
  Space,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconFishOff,
  IconNotes,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useCallback, useState } from "react"
import { stripHtml } from "string-strip-html"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice"

import { aliasDesaAtom } from "Providers/profile.ts"

import { potenciesQuery } from "Queries/articles.ts"

import { asset, withAtom } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

function Potency() {
  const [{ data }] = useQuery({ query: potenciesQuery })
  const aliasDesa = useAtomValue(aliasDesaAtom)

  const potencies = data?.potencies

  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Box>
          <Title
            tt={"uppercase"}
            fz={20}
            ta={"center"}
            c={vars("color-primary-5")}
          >
            POTENSI {aliasDesa}
          </Title>
          <Text fz={"md"} ta={"center"}>
            Potensi dan kemajuan{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span> di
            berbagai bidang (ekonomi, pariwisata, dan lain-lain)
          </Text>
        </Box>
        <Box
          display={contentsOrNone(potencies != null && potencies.length == 0)}
        >
          <DimmedNotice icon={IconFishOff} message="Belum Ada Data" />
        </Box>
        <Stack
          display={contentsOrNone(potencies != null && potencies.length > 0)}
        >
          <Carousel
            hiddenFrom="sm"
            slideSize="90%"
            slideGap="xs"
            align={"start"}
            loop
            withControls={false}
          >
            {potencies?.map((item, key) => {
              return (
                <Carousel.Slide key={key}>
                  <BackgroundImage
                    component={Link}
                    to={`/potensi/${item.slug}`}
                    td={"unset"}
                    c={"unset"}
                    src={
                      withAtom(asset.gallery)({ file: item.thumbnail?.URL }) ??
                      ""
                    }
                    radius="lg"
                    pos={"relative"}
                    style={{
                      objectFit: "cover",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <Center
                      p="md"
                      pos={"absolute"}
                      bottom={0}
                      style={{ textShadow: "2px 2px #000" }}
                    >
                      <Stack>
                        <Title lh={1} fz={20} c="white">
                          {item.title}
                        </Title>
                      </Stack>
                    </Center>
                  </BackgroundImage>
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Button
            component={Link}
            to={"/potensi"}
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
      <Stack visibleFrom="sm">
        <SimpleGrid cols={2} spacing={0}>
          <Box>
            <Title tt={"uppercase"} fz={44} c={vars("color-primary-5")}>
              POTENSI {aliasDesa}
            </Title>
            <Box>
              <Text fz={20}>
                Informasi tentang potensi dan kemajuan{" "}
                <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>{" "}
                di berbagai bidang seperti ekonomi, pariwisata, pertanian,
                industri kreatif, dan kelestarian lingkungan
              </Text>
            </Box>
          </Box>
          <Group justify="flex-end">
            <Box
              display={contentsOrNone(
                potencies != null && potencies.length > 0,
              )}
            >
              <Space h={"md"} />
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
                  to={"/potensi"}
                >
                  LIHAT POTENSI LEBIH BANYAK
                </Text>
              </Button>
            </Box>
          </Group>
        </SimpleGrid>
        <Box
          display={contentsOrNone(potencies != null && potencies.length > 0)}
        >
          <PotenciesCarousel
            data={
              potencies?.map((item) => ({
                content: "",
                title: item.title,
                image: withAtom(asset.gallery)({ file: item.thumbnail?.URL }),
                slug: item.slug,
              })) ?? []
            }
          />
        </Box>
        <Box
          display={contentsOrNone(potencies != null && potencies.length == 0)}
        >
          <DimmedNotice
            icon={IconFishOff}
            message={`Belum ada potensi ${aliasDesa} yang terdaftar`}
          />
        </Box>
      </Stack>
      {/* End Desktop */}
    </>
  )
}

type CarouselProps = {
  data: {
    slug: string
    image?: string
    title: string
    content: string
  }[]
}

export function PotenciesCarousel({ data }: CarouselProps) {
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
      <Carousel
        loop
        withControls={false}
        slideSize="33.333333%"
        // includeGapInSize={false}
        // slidesToScroll={3}
        align={"start"}
        slideGap={100}
        controlsOffset="xs"
        getEmblaApi={setEmbla}
      >
        {data.map((item, key) => {
          return (
            <Carousel.Slide key={key}>
              <Box
                component={Link}
                to={`/potensi/${item.slug}`}
                td={"unset"}
                c={"unset"}
              >
                <Image
                  alt="Potensi"
                  radius={"100%"}
                  src={item.image}
                  w="100%"
                  style={{
                    objectFit: "cover",
                    aspectRatio: "1 / 1",
                  }}
                />
                <Stack mt={"xl"} gap={0}>
                  <Text
                    ta="center"
                    fz={20}
                    fw={800}
                    style={{
                      textTransform: "uppercase",
                    }}
                  >
                    {item.title}
                  </Text>
                  <Text lineClamp={1} ta="center">
                    {stripHtml(item.content).result}
                  </Text>
                </Stack>
              </Box>
            </Carousel.Slide>
          )
        })}
      </Carousel>
      <Group justify="center" gap={"xl"}>
        <ActionIcon onClick={handlePrevSlide} size={"xl"} variant="subtle">
          <IconArrowNarrowLeft color="#000" size="2.125rem" />
        </ActionIcon>
        <ActionIcon onClick={handleNextSlide} size={"xl"} variant="subtle">
          <IconArrowNarrowRight color="#000" size="2.125rem" />
        </ActionIcon>
      </Group>
    </Stack>
  )
}

export default Potency
