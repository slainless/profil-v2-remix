import { Group, Rating, Divider, Text, Stack } from "@mantine/core"
import { IconTags, IconMapPinFilled } from "@tabler/icons-react"

import { vars } from "Theme/artifact/vars.mjs"

import type { MarketItemCategory } from "GraphQL/graphql.ts"

import { FormattedNumber } from "Modules/intl"

interface Props {
  ratingN?: number
  rating?: number
  category?: MarketItemCategory
  views: number
}
export const ProductMeta = (props: Props) => {
  return (
    <Stack gap={0}>
      <Group gap={"xs"}>
        <Rating value={props.rating} readOnly />
        <Divider orientation="vertical" />
        <Text fz={14} component="span">
          Penilaian
          <Text component="span" ml={3} c={vars("color-dimmed")}>
            ({FormattedNumber.format(props.ratingN ?? 0)})
          </Text>
        </Text>
        <Divider orientation="vertical" />
        <Group gap={3}>
          <IconTags size={16} style={{ color: vars("color-gray-7") }} />
          <Text fz={14}>{props.category?.name}</Text>
        </Group>
      </Group>
      <Group gap={5} hidden>
        <IconMapPinFilled size={16} style={{ color: vars("color-gray-7") }} />
        <Text fz={14}>Lokasi Jualan</Text>
      </Group>
    </Stack>
  )
}
