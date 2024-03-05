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
} from "@mantine/core"
import { Link } from "@remix-run/react"

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

export default function ProductItemCarousel({
  title,
  thumbnail,
  price,
  rating,
  ID,
  slug,
}: Props) {
  return (
    <Card
      shadow="sm"
      radius={"md"}
      padding="sm"
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
            style={{ maxHeight: 200, aspectRatio: "1 / 1" }}
          />
        </Box>
      </Card.Section>

      <Stack h={50} mt="lg" justify="space-between" style={{ flexGrow: 1 }}>
        <Text lineClamp={2} component="div">
          <Title size={13} c="#5A5E62" fw={600}>
            {title}
          </Title>
        </Text>
        <Group justify="space-between">
          <Text fz={12} c="#5A5E62">
            {IDRFormatterNoComma.formatNoSpace(price)}
          </Text>
          <Box>
            <Rating value={rating} size="xs" readOnly />
          </Box>
        </Group>
      </Stack>
    </Card>
  )
}
