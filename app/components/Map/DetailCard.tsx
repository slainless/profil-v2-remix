import { AspectRatio, Box, BoxProps, Group, Image, Text } from "@mantine/core"
import { Icon, IconX } from "@tabler/icons-react"
import clsx from "clsx"
import { useAtomValue } from "jotai"
import { render } from "micromustache"

import { vars } from "#theme/artifact/vars.mjs"

import { aliasDesaAtom } from "#providers/profile.ts"

import fallback from "#assets/location-illustration.svg"

import styles from "./DetailCard.module.css"
import previewCardStyles from "./PreviewCard.module.css"

interface Category {
  icon: Icon
  name: string
}

interface DetailCardProps extends BoxProps {
  title?: string
  desc?: string
  category?: Category

  imageSrc?: string
  imageAlt?: string
}

export function DetailCard({
  title,
  desc,
  category,
  imageSrc,
  imageAlt,
  ...props
}: DetailCardProps) {
  const alias = useAtomValue(aliasDesaAtom)
  const Icon = category?.icon ?? IconX

  const strings = { alias }
  return (
    <Box {...props} className={clsx(styles.root, props.className)}>
      <AspectRatio ratio={1} className={styles.imageContainer}>
        <Image
          alt={imageAlt ?? title}
          src={imageSrc}
          fallbackSrc={fallback}
          className={previewCardStyles.image}
          data-fallback={!imageSrc}
        />
      </AspectRatio>
      <Group gap={6} mb={-6} mt={12}>
        <Icon size={16} />
        <Text fz={14}>
          {category ? render(category.name, strings) : "Tanpa kategori"}
        </Text>
      </Group>
      <Text
        fz={18}
        fw="bold"
        mb={12}
        c={desc ? undefined : vars("color-dimmed")}
      >
        {title ?? "Tidak ada judul"}
      </Text>
      <Box
        component="hr"
        style={{ borderTop: `1px solid ${vars("color-dimmed")}` }}
      />
      <Text c={desc ? undefined : vars("color-dimmed")}>
        {desc ?? "Tidak ada keterangan"}
      </Text>
    </Box>
  )
}
