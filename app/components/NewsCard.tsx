import { Box, Group, Stack, Title, Text, Image, Card } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconEye, IconUser } from "@tabler/icons-react"
import dayjs from "dayjs"

import { vars } from "#theme/artifact/vars.mjs"

import { FormattedNumber } from "#modules/intl.ts"

type Props = {
  title: string
  thumbnail?: string
  description: string
  author: string
  date: string
  slug: string
  views: number
}

export default function NewsItem({
  title,
  thumbnail,
  description,
  author,
  date,
  slug,
  views,
}: Props) {
  const publishedAt = dayjs(date)

  return (
    <Card
      shadow="sm"
      // withBorder
      padding="xl"
      radius="md"
      component={Link}
      to={`/berita/${slug}`}
      h="100%"
    >
      <Card.Section>
        <Image
          src={thumbnail}
          fit="cover"
          alt="Other"
          h={250}
          style={() => ({
            aspectRatio: "1 / 1",
            // borderRadius: theme.radius.sm,
            // boxShadow: theme.shadows.xl,
          })}
        />
      </Card.Section>

      <Card.Section
        inheritPadding
        pt="lg"
        style={(theme) => ({
          position: "relative",
          top: -10,
          borderRadius: theme.radius.md,
          flexGrow: 1,
          backgroundColor: theme.white,
        })}
      >
        <Text lineClamp={2} component="div">
          <Title size={20} c="#5A5E62" fw={600}>
            {title}
          </Title>
        </Text>
        <Text lineClamp={3} fz={14} fw={400} mt="xs">
          {description}
        </Text>
      </Card.Section>

      <Card.Section>
        <Group justify="space-between" mt="md">
          <Stack gap={0}>
            <Group gap={5} ta={"left"} pl="xl">
              <IconUser size={18} />
              <Text c="#5A5E62" fz={13}>
                {author}
              </Text>
            </Group>
            <Group gap={5} ta={"left"} pl="xl">
              <IconEye size={18} />
              <Text c="#5A5E62" fz={13}>
                Dilihat {FormattedNumber.format(views)} kali
              </Text>
            </Group>
          </Stack>
          <Box
            p="sm"
            bg={`linear-gradient(163deg, ${vars("color-primary-5")}, ${vars(
              "color-primary-2",
            )})`}
            style={{ borderTopLeftRadius: vars("radius-md") }}
          >
            <Text
              fz={18}
              c="#fff"
              fw={700}
              ta="center"
              m={0}
              style={{ lineHeight: 1 }}
            >
              {publishedAt.format("DD")} {publishedAt.format("MMM")}
              <br /> {publishedAt.format("YYYY")}
            </Text>
          </Box>
        </Group>
      </Card.Section>
    </Card>
  )
}
