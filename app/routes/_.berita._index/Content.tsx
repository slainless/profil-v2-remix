"use client"

import { Box, Grid } from "@mantine/core"
import { IconCircleX } from "@tabler/icons-react"
import { useEffect } from "react"
import { useQuery } from "urql"

import { DimmedNotice } from "Components/DimmedNotice"
import { usePagination } from "Components/Hooks/use-pagination.ts"
import NewsItem from "Components/NewsCard"
import { PageNavigation } from "Components/PageNavigation"

import { ArticleTypeValue, ArticlesQuery } from "GraphQL/graphql.ts"

import { articlesQuery } from "Queries/articles.ts"

import { asset, withAtom } from "Services/assets.ts"

import { contentsOrNone } from "Modules/css-utils.ts"

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
      limit,
      cursor,
      type: ArticleTypeValue.General,
    },
  })

  useEffect(() => {
    if (data?.articles != null) addResult(data.articles)
  }, [addResult, data])

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
                  <NewsItemList
                    title={item.title}
                    author={item.user?.name ?? ""}
                    date={item.createdAt}
                    thumbnail={withAtom(asset.gallery, {item.thumbnail?.URL ?? "")}
                    description={item.short}
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
                  <NewsItemCarousel
                    title={item.title}
                    author={item.user?.name ?? ""}
                    date={item.createdAt}
                    thumbnail={withAtom(asset.gallery, {item.thumbnail?.URL ?? "")}
                    description={item.short}
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
                <NewsItem
                  title={item.title}
                  author={item.user?.name ?? ""}
                  date={item.createdAt}
                  thumbnail={withAtom(asset.gallery)({
                    file: item.thumbnail?.URL,
                  })}
                  description={item.short}
                  slug={item.slug}
                  views={item.views ?? 0}
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
