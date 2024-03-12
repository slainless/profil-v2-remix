import { Box, Group, Title, Text, Image, Card } from "@mantine/core"
import { Link } from "@remix-run/react"

type Props = {
  title: string
  thumbnail?: string
  description: string
  slug: string
  views: number
}

export function WisataCard({ title, thumbnail, description, slug }: Props) {
  return (
    <Card
      shadow="sm"
      // withBorder
      padding="xl"
      radius="md"
      component={Link}
      to={`/wisata/${slug}`}
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
        <Group justify="flex-end" mt="md">
          <Box
            px={"lg"}
            py={"sm"}
            style={(theme) => ({
              backgroundImage: `linear-gradient(163deg, ${theme.colors.primary[5]}, ${theme.colors.secondary[0]})`,
              borderRadius: "10px 0px 5px 0px",
            })}
          >
            <Text
              fz={20}
              c="#fff"
              fw={700}
              ta="center"
              m={0}
              style={{ lineHeight: 1 }}
            >
              Selengkapnya
            </Text>
          </Box>
        </Group>
      </Card.Section>
    </Card>
  )
}
