"use client"

import { Box, Grid } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import { useEffect } from "react"
import { useQuery } from "urql"

import { DimmedNotice } from "#components/DimmedNotice.tsx"
import { usePagination } from "#components/Hooks/use-pagination.ts"
import { PageNavigation } from "#components/PageNavigation.tsx"

import { ArticleTypeValue, ArticlesQuery } from "#graphql/graphql.ts"

import { articlesQuery } from "#queries/articles.ts"

import { asset, withAtom } from "#services/assets.ts"

import { contentsOrNone } from "#modules/css-utils.ts"

import { PotensiCard } from "./PotensiCard.tsx"

export const Content = () => {
  const {
    cursor,
    limit,
    currentPage,
    isTouched,

    addResult,
    nextCursor,
    prevCursor,
  } = usePagination<ArticlesQuery["articles"]>(6)

  const [{ fetching: loading, data }] = useQuery({
    query: articlesQuery,
    variables: {
      cursor,
      limit,
      type: ArticleTypeValue.Potential,
    },
  })

  useEffect(() => {
    if (loading == true) return
    if (data?.articles != null) addResult(data.articles)
  }, [addResult, data, loading])

  // const [view, setView] = useState<"list" | "carousel">("list")
  // const iconProps = {
  //   style: { width: rem(20), height: rem(20), display: "block" },
  //   stroke: 1.5,
  // }

  // const handleViewChange = (selectedView: string) => {
  //   if (selectedView === "list" || selectedView === "carousel") {
  //     setView(selectedView)
  //   }
  // }
  return (
    <>
      {/* Mobile */}
      {/* <Box hiddenFrom="sm">
        <Group justify="flex-end" mb={15}>
          <SegmentedControl
            size="xs"
            radius="xl"
            fullWidth={false}
            value={view}
            onChange={handleViewChange}
            data={[
              {
                value: "list",
                label: (
                  <>
                    <IconList {...iconProps} />
                    <VisuallyHidden>List</VisuallyHidden>
                  </>
                ),
              },
              {
                value: "carousel",
                label: (
                  <>
                    <IconCarouselHorizontalFilled {...iconProps} />
                    <VisuallyHidden>Carousel</VisuallyHidden>
                  </>
                ),
              },
            ]}
          />
        </Group>
        {view === "list" ? (
          <Grid gutter={"lg"} style={{ overflow: "visible" }} hiddenFrom="sm">
            {articles?.articles.map((item, index) => {
              return (
                <Grid.Col key={index} span={{ md: 4 }}>
                  <PotensiItemList
                    title={item.title}
                    thumbnail={withAtom(asset.gallery, {item.thumbnail?.URL ?? "")}
                    slug={item.slug}
                  />
                </Grid.Col>
              )
            })}
          </Grid>
        ) : (
          <Carousel slideSize="80%" slideGap="sm" loop withControls={false}>
            {articles?.articles.map((item, index) => {
              return (
                <Carousel.Slide key={index}>
                  <PotensiItemCarousel
                    title={item.title}
                    thumbnail={withAtom(asset.gallery, {item.thumbnail?.URL ?? "")}
                    slug={item.slug}
                  />
                </Carousel.Slide>
              )
            })}
          </Carousel>
        )}
      </Box> */}
      {/* End Mobile */}

      {/* Desktop */}
      <Box
        display={contentsOrNone(
          data?.articles != null && data?.articles.length > 0,
        )}
      >
        <Grid gutter={"xl"} style={{ overflow: "visible" }}>
          {currentPage.items?.map((item) => {
            return (
              <Grid.Col key={item.ID} span={{ base: 12, sm: 6, lg: 4 }}>
                <PotensiCard
                  title={item.title}
                  thumbnail={withAtom(asset.gallery)({
                    file: item.thumbnail?.URL,
                  })}
                  description={item.short}
                  slug={item.slug}
                />
              </Grid.Col>
            )
          })}
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
      <Box
        display={contentsOrNone(
          data?.articles != null && data?.articles.length == 0,
        )}
      >
        <DimmedNotice icon={IconCircleX} message="Belum Ada Data" />
      </Box>
      {/* End Desktop */}
    </>
  )
}
