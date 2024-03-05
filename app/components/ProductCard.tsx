"use client"

import {
  Box,
  Group,
  Rating,
  Stack,
  Title,
  Text,
  Image,
  Card,
  Avatar,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconTags } from "@tabler/icons-react"
import { IconBuildingStore } from "@tabler/icons-react"

import { MarketItemCategory } from "GraphQL/graphql.ts"

import { IDRFormatterNoComma } from "Modules/intl"

type Props = {
  title: string
  thumbnail?: string
  description: string
  category?: MarketItemCategory
  price: number
  rating: number
  views: number
  ID: number
  slug: string
}

export default function ProductItem({
  title,
  thumbnail,
  category,
  price,
  rating,
  ID,
  slug,
}: Props) {
  return (
    <>
      {/* Mobile */}
      <Card
        hiddenFrom="sm"
        withBorder
        component={Link}
        to={`/belanja/${ID}/${slug}`}
        padding={0}
      >
        <Group wrap="nowrap" gap={5}>
          <Box pos={"relative"}>
            {/* <ActionIcon
              variant="subtle"
              color="red"
              pos={"absolute"}
              left={0}
              top={0}
              style={{ zIndex: 1 }}
            >
              <IconHeartFilled />
            </ActionIcon> */}
            <Avatar src={thumbnail} size={70} radius="md" />
          </Box>
          <Stack w={"100%"} h={70} p={5} gap={0} justify="space-between">
            <Text fz={12} lh="1em" fw={500} lineClamp={1}>
              {title}
            </Text>
            <Group gap={5}>
              <IconTags
                stroke={1.5}
                size="0.8rem"
                color="var(--mantine-color-dimmed)"
              />
              <Text fz={9} c="dimmed">
                {category?.name}
              </Text>
            </Group>
            <Group gap={5}>
              <IconBuildingStore
                stroke={1.5}
                size="0.8rem"
                color="var(--mantine-color-dimmed)"
              />
              <Text fz={9} c="dimmed">
                Toko
              </Text>
            </Group>
            <Group justify="space-between">
              <Box>
                <Rating value={rating} size="xs" readOnly />
              </Box>
              <Text fz={12} fw={600} c="#5A5E62">
                {IDRFormatterNoComma.formatNoSpace(price)}
              </Text>
            </Group>
          </Stack>
        </Group>
      </Card>
      {/* End Mobile */}

      {/* Desktop */}
      <Card
        visibleFrom="sm"
        shadow="sm"
        padding="lg"
        component={Link}
        to={`/belanja/${ID}/${slug}`}
        h="100%"
      >
        <Card.Section>
          <Box pos={"relative"}>
            {/* <ActionIcon
              variant="subtle"
              color="red"
              pos={"absolute"}
              right={10}
              top={10}
            >
              <IconHeartFilled />
            </ActionIcon> */}
            <Image
              src={thumbnail}
              fit="cover"
              alt="Product"
              style={{ maxHeight: 250, aspectRatio: "1 / 1" }}
            />
          </Box>
        </Card.Section>

        <Stack mih={75} mt="lg" justify="space-between" style={{ flexGrow: 1 }}>
          <Text lineClamp={2} component="div">
            <Title size={20} c="#5A5E62" fw={600}>
              {title}
            </Title>
          </Text>
          <Group justify="space-between">
            <Box>
              <Rating value={rating} readOnly />
            </Box>
            <Text fz={18} fw={600} c="#5A5E62">
              {IDRFormatterNoComma.formatNoSpace(price)}
            </Text>
          </Group>
        </Stack>
      </Card>
      {/* End Desktop */}
    </>
  )
}
