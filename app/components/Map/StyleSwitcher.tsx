"use client"

import { AspectRatio, Box, BoxProps, Image, Text } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import clsx from "clsx"
import { useMemo } from "react"

import basicThumbnail from "#assets/map/basic.webp"
import satelliteThumbnail from "#assets/map/satellite.webp"
import streetsThumbnail from "#assets/map/streets.webp"

import styles from "./StyleSwitcher.module.css"

export const tileUrl = `https://api.maptiler.com/maps/{{ style }}/style.json?key={{ key }}`
type MapStyle = {
  name: string
  style: string
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
    style: "satellite",
    thumbnail: <Image src={satelliteThumbnail} alt="Satellite" />,
  },
  [Style.STREETS]: {
    name: "Streets",
    style: "streets",
    thumbnail: <Image src={streetsThumbnail} alt="Streets" />,
  },
  [Style.BASIC]: {
    name: "Basic",
    style: "basic",
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
