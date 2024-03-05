/* eslint-disable @typescript-eslint/no-explicit-any */
import { AspectRatio, Box, Image, Paper, PaperProps, Text } from "@mantine/core"
import clsx from "clsx"

import fallback from "Assets/location-illustration.svg"

import { rem } from "Modules/css-utils"

import styles from "./PreviewCard.module.css"

export interface PreviewCardProps extends PaperProps {
  imageSrc?: string
  imageAlt?: string
  imageSize?: number

  title?: any
  desc?: any

  cardWidth?: number | string

  titleClamp?: number
  descClamp?: number

  classNames?: PaperProps["classNames"] & {
    image?: string
  }
}
export function PreviewCard(props: PreviewCardProps) {
  const {
    imageSrc,
    imageAlt,
    imageSize,
    title,
    desc,
    cardWidth,
    titleClamp,
    descClamp,
    className,
    classNames,
    ...rest
  } = props
  const imgSize = imageSize ?? 64
  const { image: imageClassName, ...restClassNames } = classNames ?? {}
  return (
    <Paper
      className={clsx(styles.root, className)}
      shadow="sm"
      style={{
        "--image-size": rem(imgSize),
      }}
      w={
        typeof cardWidth == "number" || cardWidth == null
          ? imgSize + (cardWidth ?? 240)
          : cardWidth
      }
      classNames={restClassNames}
      {...rest}
    >
      <AspectRatio ratio={1}>
        <Image
          src={imageSrc}
          alt={imageAlt ?? title}
          fallbackSrc={fallback}
          className={clsx(styles.image, imageClassName)}
          data-fallback={!imageSrc}
        />
      </AspectRatio>
      <Box px={16}>
        <Text
          lineClamp={titleClamp ?? 1}
          style={{ wordBreak: "break-word" }}
          fw="bold"
          fz={15}
        >
          {title}
        </Text>
        <Text
          lineClamp={descClamp ?? 1}
          style={{ wordBreak: "break-word" }}
          fz={13}
        >
          {desc}
        </Text>
      </Box>
    </Paper>
  )
}
