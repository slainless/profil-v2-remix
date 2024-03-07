"use client"

import { Stack, Group, Button, Text, Image } from "@mantine/core"
import { useAtom, useAtomValue, useSetAtom } from "jotai"
import kebabCase from "lodash.kebabcase"
import { render } from "micromustache"
import { useEffect, useMemo, useState } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import {
  previewedImageAtom,
  selectedImageAtom,
  selectedVariantAtom,
} from "Providers/marketplace.ts"
import { desaAtom } from "Providers/profile.ts"

import { getLocale } from "Locale/locale.ts"

import type { GalleryItem, MarketItemVariant } from "GraphQL/graphql.ts"

import { asset } from "Services/assets.ts"

interface Props {
  productName: string
  images: GalleryItem[]
  variants: MarketItemVariant[]
}

export const VariantSelector = ({ productName, images, variants }: Props) => {
  const [selectedVariant, setSelectedVariant] = useAtom(selectedVariantAtom)
  const desa = useAtomValue(desaAtom)

  const setPreviewed = useSetAtom(previewedImageAtom)
  const setSelectedImage = useSetAtom(selectedImageAtom)
  const imageMap = useMemo(
    () => Object.fromEntries(images.map((image) => [image.ID, image])),
    [images],
  )

  const [isTouched, setIsTouched] = useState(false)

  useEffect(() => {
    if (selectedVariant == null) return
    const locale = getLocale("ID")
    const pageName =
      productName +
      (selectedVariant.name == "" ? "" : ` - ${selectedVariant.name}`)
    const siteName = render(locale.DESA_PROFILE_PAGE_TITLE, {
      desa_fullname: desa,
      page_name: pageName,
    })
    document.title = siteName
  }, [desa, productName, selectedVariant])

  useEffect(() => {
    if (
      typeof window == "undefined" ||
      window.location == null ||
      window.location.href == null ||
      typeof history == "undefined"
    )
      return
    if (isTouched == false) return

    const url = new URL(window.location.href)
    const searchParams = url.searchParams

    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (selectedVariant == null) {
        searchParams.delete("v_id")
        searchParams.delete("v_name")
        break
      }

      searchParams.set("v_id", selectedVariant.ID + "")
      if (selectedVariant.name == "") searchParams.delete("v_name")
      else searchParams.set("v_name", kebabCase(selectedVariant.name))
      break
    }

    // history.pushState({}, "", url)
    history.replaceState({}, "", url)
  }, [isTouched, selectedVariant])

  useEffect(() => {
    if (selectedVariant == null) return
    const image = imageMap[selectedVariant.photoID] as GalleryItem | null
    image && setSelectedImage(image)
  }, [imageMap, selectedVariant, setSelectedImage])

  return (
    <Stack gap={"xs"}>
      <Text fz={22} fw={"bold"}>
        Jenis:
      </Text>
      <Group>
        {variants.map((variant) => {
          const image = imageMap[variant.photoID] as GalleryItem | null
          return (
            <Button
              leftSection={
                image && (
                  <Image
                    src={asset.marketItem({ file: image.URL })}
                    w={20}
                    h={20}
                    alt={image.caption}
                  />
                )
              }
              variant={
                selectedVariant?.ID === variant.ID ? "filled" : "default"
              }
              color={
                selectedVariant?.ID === variant.ID
                  ? vars("color-primary-3")
                  : undefined
              }
              key={variant.ID}
              onMouseEnter={() => image && setPreviewed(image)}
              onMouseLeave={() => image && setPreviewed(null)}
              onClick={() => {
                setSelectedVariant(variant)
                setIsTouched(true)
              }}
            >
              {variant.name || "Standar"}
            </Button>
          )
        })}
      </Group>
    </Stack>
  )
}
