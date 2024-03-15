"use client"

import { Carousel } from "@mantine/carousel"
import {
  BackgroundImage,
  Box,
  Stack,
  Title,
  Text,
  Group,
  Button,
  Center,
  Paper,
  rem,
  Space,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconBeachOff, IconNotes } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useState } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { DimmedNotice } from "#components/DimmedNotice.tsx"

import { aliasDesaAtom } from "#providers/profile.ts"

import backgroundImage from "#assets/background_wisata.png"

import { destinationsQuery } from "#queries/articles.ts"

import { asset, withAtom } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

function Destination() {
  const [{ data }] = useQuery({ query: destinationsQuery })
  const aliasDesa = useAtomValue(aliasDesaAtom)

  const destinations = data?.destinations
  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Box>
          <Title fz={20} ta={"center"} c={vars("color-primary-5")}>
            WISATA
          </Title>
          <Text fz={"md"} ta={"center"}>
            Layanan yang mempermudah promosi wisata{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>{" "}
            sehingga dapat menarik pengunjung{" "}
            <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
          </Text>
        </Box>
        <Box
          display={contentsOrNone(
            destinations != null && destinations.length == 0,
          )}
        >
          <DimmedNotice icon={IconBeachOff} message="Belum Ada Data" />
        </Box>
        <Stack
          display={contentsOrNone(
            destinations != null && destinations.length > 0,
          )}
        >
          <Carousel
            hiddenFrom="sm"
            slideSize="90%"
            slideGap="xs"
            align={"start"}
            loop
            withControls={false}
          >
            {destinations?.map((item, key) => {
              return (
                <Carousel.Slide key={key}>
                  <BackgroundImage
                    component={Link}
                    to={`/wisata/${item.slug}`}
                    td={"unset"}
                    c={"unset"}
                    src={withAtom(asset.gallery)({ file: item.thumbnail?.URL })}
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
                        <Text lh={1} lineClamp={2} fz={14} c="white">
                          {item.short}
                        </Text>
                      </Stack>
                    </Center>
                  </BackgroundImage>
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Button
            component={Link}
            to={"/wisata"}
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
        <BackgroundImage src={backgroundImage}>
          <Stack p={50}>
            <Box>
              <Title
                tt={"uppercase"}
                fz={44}
                order={1}
                style={() => ({ color: "white" })}
              >
                WISATA {aliasDesa}
              </Title>
              <Text c="white" fz={20}>
                Layanan yang mempermudah promosi wisata{" "}
                <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>{" "}
                sehingga dapat menarik pengunjung{" "}
                <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
              </Text>
            </Box>
            <Box
              display={contentsOrNone(
                destinations != null && destinations.length > 0,
              )}
            >
              <DestinationCarousel
                items={destinations?.map((spot) => ({
                  title: spot.title,
                  description: spot.short,
                  image: withAtom(asset.gallery)({ file: spot.thumbnail?.URL }),
                  slug: spot.slug,
                }))}
              />
            </Box>
            <Box
              display={contentsOrNone(
                destinations != null && destinations.length == 0,
              )}
            >
              <Paper w="max-content" p={20} bg={"transparent"} opacity={0.7}>
                <Group justify="center">
                  <IconBeachOff
                    style={{ width: rem(32), height: "auto" }}
                    color={vars("color-gray-4")}
                  />
                  <Text fz={24} c={vars("color-gray-4")}>
                    Belum ada titik wisata yang didaftarkan
                  </Text>
                </Group>
              </Paper>
            </Box>
          </Stack>
        </BackgroundImage>
        <Group justify="flex-end">
          <Box
            display={contentsOrNone(
              destinations != null && destinations.length > 0,
            )}
          >
            <Space h={"md"} />
            <Button
              component={Link}
              to={"/wisata"}
              style={{ border: 0 }}
              variant="default"
              bg={"transparent"}
              leftSection={<IconNotes color="black" />}
            >
              <Text c="black" tt={"uppercase"} fw={"bold"}>
                lihat wisata lebih banyak
              </Text>
            </Button>
          </Box>
        </Group>
      </Box>
      {/* End Desktop */}
    </>
  )
}

type DestinationCarouselProps = {
  items?: {
    slug: string
    title: string
    description: string
    image?: string
  }[]
}

const DestinationCarousel = ({ items = [] }: DestinationCarouselProps) => {
  const [isFirstActive] = useState(true)

  return (
    <Carousel
      withControls={true}
      loop
      style={() => ({
        control: {
          "&:firstChild": {
            display: isFirstActive ? "none" : "flex",
          },
        },
        controls: {
          justifyContent: isFirstActive ? "end" : "space-between",
        },
      })}
    >
      {items.map((item, key) => (
        <Carousel.Slide key={key}>
          <DestinationItem
            title={item.title}
            description={item.description}
            image={item.image}
            slug={item.slug}
          />
        </Carousel.Slide>
      ))}
    </Carousel>
  )
}

type DestinationItemProps = {
  title: string
  slug: string
  description: string
  image?: string
}

const DestinationItem = ({
  title,
  slug,
  description,
  image,
}: DestinationItemProps) => {
  return (
    <Stack pl={150}>
      <BackgroundImage
        src={image ?? ""}
        component={Link}
        to={`/wisata/${slug}`}
        td={"unset"}
        c={"unset"}
      >
        <Box
          h={350}
          style={{
            display: "flex",
            alignItems: "center",
            justifyItems: "center",
            background: "rgba(29, 29, 29, 0.40)",
          }}
        >
          <Box w={"70%"} left={-70} style={{ position: "relative" }}>
            <Title size={38} c="white">
              {title}
            </Title>
            <Text lineClamp={2} fz={16} c="white">
              {description}
            </Text>
          </Box>
        </Box>
      </BackgroundImage>
    </Stack>
  )
}

export default Destination
