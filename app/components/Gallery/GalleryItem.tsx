"use client"

import { Box, Grid, GridCol, Image } from "@mantine/core"
import lgThumbnail from "lightgallery/plugins/thumbnail"
import lgZoom from "lightgallery/plugins/zoom"
import LightGallery from "lightgallery/react"
import { useEffect } from "react"
import { useQuery } from "urql"

import { usePagination } from "#components/Hooks/use-pagination.ts"
import { PageNavigation } from "#components/PageNavigation.tsx"

import { GalleryItemsQuery } from "#graphql/graphql.ts"

import { galleryItemsQuery } from "#queries/gallery.ts"

import { asset, withAtom } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

import containerStyle from "./GalleryItem.module.css"

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
    if (loading == true) return
    if (data?.items != null) addResult(data?.items)
  }, [addResult, data, loading])

  const onInit = () => {
    // console.log("lightGallery has been initialized")
  }

  return (
    <Box>
      <Grid className={containerStyle.container}>
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
