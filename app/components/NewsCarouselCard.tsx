import { Group, Stack, Text, Image, Card } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconClock, IconEye } from "@tabler/icons-react"

import { formatDateOnly } from "Modules/date.ts"
import { FormattedNumber } from "Modules/intl.ts"

type Props = {
  title: string
  thumbnail?: string
  description: string
  author: string
  date: string
  slug: string
  views: number
}

export default function NewsItemCarousel({
  title,
  thumbnail,
  date,
  slug,
  views,
}: Props) {
  return (
    <Card component={Link} to={`/berita/${slug}`} padding="md" radius="md">
      <Card.Section>
        <Image
          src={thumbnail}
          alt="Other"
          h={200}
          style={{
            objectFit: "cover",
            aspectRatio: "1 / 1",
          }}
        />
      </Card.Section>

      <Card.Section
        inheritPadding
        pt="lg"
        h={90}
        style={(theme) => ({
          position: "relative",
          top: -10,
          borderRadius: theme.radius.md,
          flexGrow: 1,
          backgroundColor: theme.white,
        })}
      >
        <Stack gap={3}>
          <Text fz={13} lh="1em" fw={500} lineClamp={2}>
            {title}
          </Text>
          <Group gap={5}>
            <IconClock
              stroke={1.5}
              size="0.8rem"
              color="var(--mantine-color-dimmed)"
            />
            <Text fz={11} c="dimmed">
              {formatDateOnly(date)}
            </Text>
          </Group>
          <Group gap={5}>
            <IconEye
              stroke={1.5}
              size="0.8rem"
              color="var(--mantine-color-dimmed)"
            />
            <Text fz={11} c="dimmed">
              Dilihat {FormattedNumber.format(views)} kali
            </Text>
          </Group>
        </Stack>
      </Card.Section>
    </Card>
  )
}
