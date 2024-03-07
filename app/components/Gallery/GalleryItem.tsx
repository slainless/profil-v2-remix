"use client"

import { Box, Grid, GridCol, Image } from "@mantine/core"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import LightGallery from "lightgallery/react"
import { useEffect } from "react"
import { useQuery } from "urql"

import { usePagination } from "Components/Hooks/use-pagination.ts"
import { PageNavigation } from "Components/PageNavigation"

import { GalleryItemsQuery } from "GraphQL/graphql.ts"

import { galleryItemsQuery } from "Queries/gallery.ts"

import { asset, withAtom } from "Services/assets"

import { contentsOrNone } from "Modules/css-utils"

import { container } from "./GalleryItem.module.css"

function GalleryItem() {
  const {
    limit,
    cursor,
    isTouched,
    currentPage,
    addResult,
    nextCursor,
    prevCursor,
  } = usePagination<GalleryItemsQuery["items"]>(20)

  const [{ data, fetching: loading }] = useQuery({
    query: galleryItemsQuery,
    variables: {
      limit,
      cursor,
    },
  })

  useEffect(() => {
    if (data?.items != null) addResult(data?.items)
  }, [addResult, data])

  const onInit = () => {
    // console.log("lightGallery has been initialized")
  }

  return (
    <Box>
      <Grid className={container}>
        <LightGallery
          onInit={onInit}
          speed={100}
          plugins={[lgThumbnail, lgZoom]}
          // addClass={contentsGallery}
        >
          {currentPage.items?.map((item, key) => {
            // let size = Math.floor(Math.random() * 200) + 200
            return (
              <button
                key={key}
                // className={`gallery-item ${items}`}
                className={`gallery-item`}
                data-src={withAtom(asset.gallery)({ file: item.URL })}
                style={{ display: "contents" }}
              >
                <GridCol span={{ base: 12, sm: 6, md: 3 }} display={"flex"}>
                  <Image
                    className="img-responsive"
                    src={withAtom(asset.gallery)({ file: item.URL })}
                    alt={item.caption}
                    // w={size}
                  />
                </GridCol>
              </button>
            )
          })}
        </LightGallery>
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
    </Box>
  )
}

export default GalleryItem