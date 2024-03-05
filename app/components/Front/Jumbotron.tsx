"use client"

import { Carousel } from "@mantine/carousel"
import { Box, rem } from "@mantine/core"
import { IconArrowRight } from "@tabler/icons-react"
import { IconArrowLeft } from "@tabler/icons-react"
import Autoplay from "embla-carousel-autoplay"
import { useRef } from "react"
import { useQuery } from "urql"

import { ArticleTypeValue } from "GraphQL/graphql.ts"

import { articleCardsQuery } from "Queries/articles.ts"

import { asset, withAtom } from "Services/assets.ts"

import { ArticleSlide, WelcomeSlide } from "./JumbotronSlide.tsx"

const Jumbotron = () => {
  const [{ data }] = useQuery({
    query: articleCardsQuery,
    variables: {
      limit: 3,
      type: ArticleTypeValue.General,
    },
  })

  const autoplay = useRef(Autoplay({ delay: 5000 }))
  const articles = data?.articles

  return (
    <Box>
      {/* Mobile */}
      <Carousel
        hiddenFrom="sm"
        slideSize="90%"
        slideGap="xs"
        align={"center"}
        loop
        plugins={[autoplay.current]}
        withControls={false}
      >
        <WelcomeSlide />
        {articles?.map((v) => (
          <ArticleSlide
            title={v.title}
            subtitle={v.short}
            background={withAtom(asset.gallery)({ file: v.thumbnail?.URL })}
            href={`berita/${v.slug}`}
            key={v.title + v.createdAt}
          />
        ))}
      </Carousel>
      {/* Desktop */}
      <Carousel
        visibleFrom="sm"
        slideSize="100%"
        loop
        withControls={true}
        withIndicators
        plugins={[autoplay.current]}
        controlsOffset="xl"
        nextControlIcon={
          <IconArrowRight style={{ width: rem(30), height: rem(30) }} />
        }
        previousControlIcon={
          <IconArrowLeft style={{ width: rem(30), height: rem(30) }} />
        }
      >
        <WelcomeSlide />
        {articles?.map((v) => (
          <ArticleSlide
            title={v.title}
            subtitle={v.short}
            background={withAtom(asset.gallery)({ file: v.thumbnail?.URL })}
            href={`berita/${v.slug}`}
            key={v.title + v.createdAt}
          />
        ))}
      </Carousel>
    </Box>
  )
}

export default Jumbotron
