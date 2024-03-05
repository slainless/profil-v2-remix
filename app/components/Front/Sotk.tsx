"use client"

import { Carousel, Embla } from "@mantine/carousel"
import {
  Box,
  Stack,
  Title,
  Text,
  Grid,
  Image,
  Group,
  Button,
  Tooltip,
  ActionIcon,
  Card,
  Space,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconArrowNarrowRight, IconNotes, IconUserX } from "@tabler/icons-react"
import { IconArrowNarrowLeft } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useCallback, useMemo, useState } from "react"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice.tsx"

import { profileAtom } from "Providers/profile.ts"

import placeholder from "Assets/fallback.png"

import { orgMembersQuery } from "Queries/org.ts"

import { asset, withAtom } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils"

function Sotk() {
  const profile = useAtomValue(profileAtom)
  const [{ data }] = useQuery({ query: orgMembersQuery })

  const sotk = useMemo(() => {
    if (data == null) return []
    return data.members.slice(0, 4).map((item) => ({
      name: item.name,
      position: item.position,
      image: item.photoURL,
    }))
  }, [data])

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
          SOTK
        </Title>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
        >
          Struktur Organisasi dan Tata Kerja{" "}
          {`${profile.alias.desa} ${profile.name.deskel}`}
        </Text>
      </Box>

      {/* Mobile */}
      <Stack hiddenFrom="sm">
        <Group justify="space-between" gap={"xl"}>
          <ActionIcon onClick={handlePrevSlide} size={"xl"} variant="subtle">
            <IconArrowNarrowLeft color="#000" size="2.125rem" />
          </ActionIcon>
          <ActionIcon onClick={handleNextSlide} size={"xl"} variant="subtle">
            <IconArrowNarrowRight color="#000" size="2.125rem" />
          </ActionIcon>
        </Group>
        <Carousel
          w={"91vw"}
          slideSize="45%"
          slideGap="sm"
          loop
          withControls={false}
          align={"start"}
          getEmblaApi={setEmbla}
        >
          {sotk.map((item, index) => {
            return (
              <Carousel.Slide key={index}>
                <Card
                  ta={"center"}
                  bg={vars("color-primary-5")}
                  shadow="sm"
                  radius="md"
                  withBorder
                >
                  <Card.Section>
                    <Image
                      alt={`${item.name} - ${item.position}`}
                      fallbackSrc={placeholder}
                      bg={"#F6F6F6"}
                      fit="cover"
                      w={"100%"}
                      h={200}
                      src={withAtom(asset.staff)({ file: item.image })}
                    />
                  </Card.Section>
                  <Box pt={10}>
                    <Title fz={14} c="white">
                      {item.name}
                    </Title>
                    <Text fz={12} c="white">
                      {item.position}
                    </Text>
                  </Box>
                </Card>
              </Carousel.Slide>
            )
          })}
        </Carousel>
        <Button
          component={Link}
          to={"/pemerintah"}
          variant="outline"
          color={vars("color-primary-4")}
          radius={"md"}
          fullWidth
        >
          Lihat Semua
        </Button>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Box visibleFrom="sm">
        <Grid>
          {sotk.map((item, index) => {
            return (
              <Grid.Col span={3} key={index}>
                <Tooltip label={`${item.name} - ${item.position}`}>
                  <Card
                    ta={"center"}
                    bg={vars("color-primary-4")}
                    shadow="sm"
                    radius="md"
                    withBorder
                  >
                    <Card.Section>
                      <Image
                        bg={"#F6F6F6"}
                        alt={`${item.name} - ${item.position}`}
                        fallbackSrc={placeholder}
                        h={300}
                        w={"100%"}
                        fit="cover"
                        src={withAtom(asset.staff)({ file: item.image })}
                      />
                    </Card.Section>
                    <Box pt={10}>
                      <Title fz={20} c="white">
                        {item.name}
                      </Title>
                      <Text fz={14} c="white">
                        {item.position}
                      </Text>
                    </Box>
                  </Card>
                </Tooltip>
              </Grid.Col>
            )
          })}
        </Grid>
        <Box
          display={contentsOrNone(
            data?.members != null && data.members.length == 0,
          )}
        >
          <DimmedNotice icon={IconUserX} message="Belum ada data aparat desa" />
        </Box>
        <Box display={contentsOrNone(sotk.length > 0)}>
          <Space h={"md"} />
          <Group justify="flex-end" gap={0}>
            <Button
              component={Link}
              to={"/pemerintah"}
              style={{ border: 0 }}
              variant="default"
              bg={"transparent"}
              leftSection={<IconNotes color="black" />}
            >
              <Text c="black" fw={"bold"} tt={"uppercase"}>
                lihat struktur lebih lengkap
              </Text>
            </Button>
          </Group>
        </Box>
      </Box>
      {/* End Desktop */}
    </Stack>
  )
}

export default Sotk
