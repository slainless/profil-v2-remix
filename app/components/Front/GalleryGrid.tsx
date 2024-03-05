"use client"

import {
  Box,
  Stack,
  Title,
  Text,
  Grid,
  Image,
  Button,
  Group,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconNotes, IconPhotoX } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { DimmedNotice } from "Components/DimmedNotice"

import { aliasDesaAtom } from "Providers/profile.ts"

import { galleryItemsQuery } from "Queries/gallery.ts"

import { asset, withAtom } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils"

function GalleryGrid() {
  const [{ data }] = useQuery({
    query: galleryItemsQuery,
    variables: {
      limit: 6,
    },
  })
  const aliasDesa = useAtomValue(aliasDesaAtom)

  const galleryItems = data?.items

  return (
    <Stack>
      <Box>
        <Title
          tt={"uppercase"}
          fz={{ base: 20, sm: 44 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-5")}
        >
          GALERI {aliasDesa}
        </Title>
        <Text
          fz={{ base: "md", sm: 20 }}
          ta={{
            base: "center",
            sm: "start",
            md: "start",
          }}
        >
          Menampilkan kegiatan-kegiatan yang berlangsung di{" "}
          <span style={{ textTransform: "lowercase" }}>{aliasDesa}</span>
        </Text>
      </Box>
      <Box
        display={contentsOrNone(
          galleryItems != null && galleryItems.length > 0,
        )}
      >
        <Grid>
          {galleryItems?.map((item, key) => {
            return (
              <Grid.Col span={4} key={key}>
                <Image
                  src={withAtom(asset.gallery)({ file: item.URL })}
                  h={{ base: 100, sm: 311 }}
                  alt="Other"
                />
              </Grid.Col>
            )
          })}
        </Grid>
        <Button
          hiddenFrom="sm"
          component={Link}
          to={"/galeri"}
          variant="outline"
          color={vars("color-primary-4")}
          radius={"md"}
          fullWidth
        >
          Lihat Semua
        </Button>

        <Group justify="flex-end" visibleFrom="sm">
          <Button
            style={{ border: 0 }}
            variant="default"
            bg={"transparent"}
            leftSection={<IconNotes color="black" />}
            component={Link}
            to={"/galeri"}
          >
            <Text c="black" tt={"uppercase"} fw={"bold"}>
              LIHAT FOTO LEBIH BANYAK
            </Text>
          </Button>
        </Group>
      </Box>
      <Box
        visibleFrom="sm"
        display={contentsOrNone(
          galleryItems != null && galleryItems.length == 0,
        )}
      >
        <DimmedNotice
          icon={IconPhotoX}
          message="Belum ada foto galeri yang diunggah"
        />
      </Box>
      <Box
        hiddenFrom="sm"
        display={contentsOrNone(
          galleryItems != null && galleryItems.length == 0,
        )}
      >
        <DimmedNotice icon={IconPhotoX} message="Belum Ada Data" />
      </Box>
    </Stack>
  )
}

export default GalleryGrid
