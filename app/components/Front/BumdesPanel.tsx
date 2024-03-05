"use client"

import { Carousel } from "@mantine/carousel"
import { Box, Stack, Title, Text, Button } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconCurrencyDollarOff } from "@tabler/icons-react"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { BumdesCard } from "Components/BumdesCard.tsx"
import { DimmedNotice } from "Components/DimmedNotice.tsx"

import { bumdesQuery } from "Queries/articles.ts"

import { asset, withAtom } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

function BumdesPanel() {
  const [{ data }] = useQuery({ query: bumdesQuery })
  const bumdes = data?.bumdes
  return (
    <>
      <Stack>
        <Box>
          <Title
            fz={{ base: 20, sm: 44 }}
            ta={{ base: "center", sm: "start", md: "start" }}
            c={vars("color-primary-5")}
          >
            BUMDES
          </Title>
          <Text
            fz={{ base: "md", sm: 20 }}
            ta={{
              base: "center",
              sm: "start",
              md: "start",
            }}
          >
            Badan Usaha Milik Desa
          </Text>
        </Box>
        <Box display={contentsOrNone(bumdes != null && bumdes.length > 0)}>
          <Carousel slideSize="100%" slideGap="sm" loop withControls={true}>
            {bumdes?.map((item, index) => {
              return (
                <Carousel.Slide key={index}>
                  <BumdesCard
                    title={item.title}
                    thumbnail={withAtom(asset.gallery)({
                      file: item.thumbnail?.URL,
                    })}
                    description={item.short}
                    slug={item.slug}
                  />
                </Carousel.Slide>
              )
            })}
          </Carousel>
          <Button
            hidden
            component={Link}
            to={"/bumdes"}
            variant="outline"
            color={vars("color-primary-4")}
            radius={"md"}
            fullWidth
          >
            Lihat Semua
          </Button>
        </Box>
        <Box
          visibleFrom="sm"
          display={contentsOrNone(bumdes != null && bumdes.length == 0)}
        >
          <DimmedNotice
            icon={IconCurrencyDollarOff}
            message="Belum ada lembaga Bumdes yang terdaftar"
          />
        </Box>
        <Box
          hiddenFrom="sm"
          display={contentsOrNone(bumdes != null && bumdes.length == 0)}
        >
          <DimmedNotice icon={IconCurrencyDollarOff} message="Belum Ada Data" />
        </Box>
      </Stack>
    </>
  )
}

export default BumdesPanel
