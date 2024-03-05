"use client"

import { AspectRatio, Box, BoxProps, Image, Text } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import clsx from "clsx"
import { render } from "micromustache"
import { useMemo } from "react"

import basicThumbnail from "Assets/map/basic.webp"
import satelliteThumbnail from "Assets/map/satellite.webp"
import streetsThumbnail from "Assets/map/streets.webp"

import styles from "./StyleSwitcher.module.css"

const tile = `https://api.maptiler.com/maps/{{ style }}/style.json?key=${import.meta.env.VITE_MAPTILER_KEY}`
type MapStyle = {
  name: string
  tile: string
  thumbnail: JSX.Element
}

export const enum Style {
  SATELLITE,
  STREETS,
  BASIC,
}

export const mapStyle = {
  [Style.SATELLITE]: {
    name: "Satellite",
    tile: render(tile, { style: "satellite" }),
    thumbnail: <Image src={satelliteThumbnail} alt="Satellite" />,
  },
  [Style.STREETS]: {
    name: "Streets",
    tile: render(tile, { style: "streets" }),
    thumbnail: <Image src={streetsThumbnail} alt="Streets" />,
  },
  [Style.BASIC]: {
    name: "Basic",
    tile: render(tile, { style: "basic" }),
    thumbnail: <Image src={basicThumbnail} alt="Basic" />,
  },
} satisfies Record<string, MapStyle>

const indexes = Object.fromEntries(
  Object.entries(mapStyle).map(([k], index) => [k, index]),
)
const rotations = Object.keys(mapStyle)

interface StyleSwitcherProps extends BoxProps {
  value?: Style
  defaultValue?: Style
  onChange?: (v: Style) => void
}

export function StyleSwitcher({
  value,
  onChange,
  defaultValue,
  className,
  ...rest
}: StyleSwitcherProps) {
  const [_value, handleChange] = useUncontrolled<Style>({
    value,
    onChange,
    defaultValue: defaultValue ?? Style.SATELLITE,
  })
  const style = useMemo(() => mapStyle[_value], [_value])
  return (
    <Box
      w={80}
      className={clsx(className, styles.root)}
      role="button"
      pos="relative"
      onClick={() => {
        const idx = indexes[_value]
        if (idx == null) return handleChange(Style.SATELLITE)
        const next = rotations[idx + 1]
        if (next == null) return handleChange(Style.SATELLITE)
        return handleChange(+next)
      }}
      {...rest}
    >
      <AspectRatio
        ratio={1}
        style={{
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        {style.thumbnail}
      </AspectRatio>
      <Text
        pos="absolute"
        left={0}
        bottom={0}
        c="white"
        bg="rgba(0,0,0,.5)"
        w="100%"
        p={3}
        ta="center"
      >
        {style.name}
      </Text>
    </Box>
  )
}
