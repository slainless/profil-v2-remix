"use client"

import { Carousel } from "@mantine/carousel"
import { BackgroundImage, Box, Stack, Text } from "@mantine/core"
import { useMediaQuery } from "@mantine/hooks"
import { Link } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"
import { ReactNode } from "react"

import { bp } from "Theme/artifact/vars.mjs"

import { desaAtom, profileAtom } from "Providers/profile.ts"

import fallback from "Assets/bg.webp"

import { getLocale } from "Locale/locale.ts"

import { asset, withAtom } from "Services/assets.ts"

import { largerThan } from "Modules/css-utils"

import jumbotronSlideStyle from "./Jumbotron.module.css"

export const Slide = (props: {
  background?: string
  children: ReactNode
  href?: string
}) => {
  return (
    <Carousel.Slide>
      <BackgroundImage
        src={props.background ? props.background : fallback}
        h={{ base: 180, sm: "100vh" }}
        style={{ overflow: "hidden" }}
        component={props.href ? Link : undefined}
        // @ts-expect-error ...
        to={props.href ?? undefined}
        className={jumbotronSlideStyle.container}
      >
        <Stack h="inherit" className={jumbotronSlideStyle.slide}>
          {props.children}
        </Stack>
      </BackgroundImage>
    </Carousel.Slide>
  )
}

export const WelcomeSlide = () => {
  const isLtSmall = useMediaQuery(largerThan(bp("sm")), false)
  const profile = useAtomValue(profileAtom)
  const desa = useAtomValue(desaAtom)

  return (
    <Slide
      background={
        withAtom(asset.common)({
          file: profile.welcome.backgroundURL,
        }) ?? fallback
      }
    >
      <Text
        fz={{ base: 24, sm: 52 }}
        fw="bold"
        c="#fff"
        lh="1.2em"
        lineClamp={2}
      >
        <span style={{ display: isLtSmall ? "contents" : "none" }}>
          Selamat Datang
          <br />
          {render(getLocale("ID").DESA_PROFILE_WEBSITE_TITLE, {
            desa_name: desa,
          })}
        </span>
        <span style={{ display: isLtSmall ? "none" : "contents" }}>
          {render(getLocale("ID").DESA_PROFILE_WEBSITE_TITLE, {
            desa_name: "",
          }).trim()}
          <br />
          {desa}
        </span>
      </Text>
      <Box>
        <Text fz={{ sm: "xl" }} fw={{ sm: "bold" }} c="#fff">
          Sumber informasi terbaru tentang pemerintahan di {profile.alias.desa}{" "}
          {profile.name.deskel}
        </Text>
      </Box>
    </Slide>
  )
}

export const ArticleSlide = (props: {
  href?: string
  background?: string
  title?: string
  subtitle: string
}) => {
  return (
    <Slide href={props.href} background={props.background}>
      <Text
        fz={{ base: 24, sm: 52 }}
        fw="bold"
        c="#fff"
        lh="1.2em"
        lineClamp={2}
      >
        {props.title}
      </Text>
      <Box>
        <Text fz={{ sm: "xl" }} fw={{ sm: "bold" }} c="#fff" lineClamp={2}>
          {props.subtitle}
        </Text>
      </Box>
    </Slide>
  )
}
