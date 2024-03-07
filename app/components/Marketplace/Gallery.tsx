"use client"

import { Carousel } from "@mantine/carousel"
import { Stack, Image, AspectRatio } from "@mantine/core"
import { useAtom } from "jotai"

import { vars } from "Theme/artifact/vars.mjs"

import { previewedImageAtom, selectedImageAtom } from "Providers/marketplace.ts"

import type { GalleryItem } from "GraphQL/graphql.ts"

import { asset } from "Services/assets"

import { hoverableImage } from "./Gallery.module.css"

interface Props {
  images: GalleryItem[]
}
export const Gallery = ({ images }: Props) => {
  const [selectedImage, setSelectedImage] = useAtom(selectedImageAtom)
  const [previewed, setPreviewed] = useAtom(previewedImageAtom)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const debouncedSetPreview = useCallback(debounce(setPreviewed), [
  //   setPreviewed,
  // ])

  return (
    <Stack>
      <AspectRatio
        ratio={1}
        style={{ borderRadius: vars("radius-sm"), overflow: "hidden" }}
      >
        <Image
          h="100%"
          w="100%"
          src={asset.marketItem({
            file: previewed
              ? previewed.URL
              : selectedImage?.URL ?? images[0].URL,
          })}
          alt={selectedImage?.caption}
        />
      </AspectRatio>
      <Carousel
        align="start"
        slideSize="25%"
        slideGap="sm"
        withControls={false}
      >
        {images.map((image) => (
          <Carousel.Slide key={image.ID}>
            <AspectRatio ratio={1}>
              <Image
                w={"100%"}
                src={asset.marketItem({ file: image.URL })}
                alt={image.caption}
                className={hoverableImage}
                data-is-active={image.ID === previewed?.ID}
                onClick={() => setSelectedImage(image)}
                onMouseEnter={() => {
                  setSelectedImage(image)
                  setPreviewed(image)
                }}
                style={{
                  overflow: "hidden",
                  borderRadius: vars("radius-md"),
                }}
              />
            </AspectRatio>
          </Carousel.Slide>
        ))}
      </Carousel>
    </Stack>
  )
}
