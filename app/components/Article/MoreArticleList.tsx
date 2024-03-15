"use client"

import { Carousel } from "@mantine/carousel"
import {
  Card,
  Stack,
  Title,
  Box,
  Group,
  Avatar,
  Text,
  Image,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconClock, IconEye } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import urlJoin from "url-join"
import { useQuery } from "urql"

import { schemaAtom } from "#providers/profile.ts"

import { Article, ArticleType } from "#graphql/graphql.ts"

import { articlesQuery } from "#queries/articles.ts"

import { asset } from "#services/assets.ts"

import { formatDateOnly } from "#modules/date.ts"
import { FormattedNumber } from "#modules/intl.ts"

const LIMIT = 8

interface Props {
  article: Pick<Article, "slug"> & { type: Pick<ArticleType, "type"> }
  moreText?: string
  baseUrl: string
}
export const MoreArticleList = (props: Props) => {
  const schema = useAtomValue(schemaAtom)
  const [{ data }] = useQuery({
    query: articlesQuery,
    variables: {
      limit: LIMIT,
      type: props.article.type.type,
    },
  })

  const articles =
    data?.articles
      .filter((article) => article.slug !== props.article.slug)
      .slice(0, LIMIT) ?? []

  return (
    <>
      {/* Mobile */}
      <Stack hiddenFrom="lg">
        <Title fz={14}>{props.moreText}</Title>
        <Carousel
          w={"90vw"}
          slideSize={{ base: "80%", sm: "50%" }}
          slideGap="sm"
          loop
          withControls={false}
        >
          {articles.map((v) => (
            <Carousel.Slide key={v.title + v.user?.name}>
              <Card
                component={Link}
                to={urlJoin(props.baseUrl, v.slug)}
                padding="md"
                radius="md"
              >
                <Card.Section>
                  <Image
                    src={asset.gallery({ schema, file: v.thumbnail?.URL })}
                    fit="cover"
                    alt="Other"
                    h={200}
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
                    <Text fz={13} lh="1em" fw={500} lineClamp={2} mb={5}>
                      {v.title}
                    </Text>
                    <Group gap={5}>
                      <IconClock
                        stroke={1.5}
                        size="0.8rem"
                        color="var(--mantine-color-dimmed)"
                      />
                      <Text fz={11} c="dimmed">
                        {formatDateOnly(v.createdAt)}
                      </Text>
                    </Group>
                    <Group gap={5}>
                      <IconEye
                        stroke={1.5}
                        size="0.8rem"
                        color="var(--mantine-color-dimmed)"
                      />
                      <Text fz={11} c="dimmed">
                        Dilihat {FormattedNumber.format(v.views)} kali
                      </Text>
                    </Group>
                  </Stack>
                </Card.Section>
              </Card>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Stack>
      {/* End Mobile */}

      {/* Desktop */}
      <Card visibleFrom="lg">
        <Stack>
          <Title fz={20}>{props.moreText}</Title>
          {articles.map((v) => (
            <Card
              key={v.title + v.user?.name}
              component={Link}
              to={urlJoin(props.baseUrl, v.slug)}
              padding={0}
            >
              <Group wrap="nowrap" gap={"sm"}>
                <Avatar
                  src={asset.gallery({ schema, file: v.thumbnail?.URL })}
                  size={70}
                  radius="md"
                />
                <Box>
                  <Text fz={15} lh="1em" fw={500} lineClamp={2} mb={5}>
                    {v.title}
                  </Text>
                  {/* <Group gap={5}>
                    <IconUser
                      stroke={1.5}
                      size="1rem"
                      color="var(--mantine-color-dimmed)"
                    />
                    <Text fz={12}>{v.user?.name}</Text>
                  </Group> */}
                  <Group gap={5}>
                    <IconClock
                      stroke={1.5}
                      size="1rem"
                      color="var(--mantine-color-dimmed)"
                    />
                    <Text fz={12} c="dimmed">
                      {formatDateOnly(v.createdAt)}
                    </Text>
                  </Group>
                  <Group gap={5}>
                    <IconEye
                      stroke={1.5}
                      size="1rem"
                      color="var(--mantine-color-dimmed)"
                    />
                    <Text fz={12} c="dimmed">
                      Dilihat {FormattedNumber.format(v.views)} kali
                    </Text>
                  </Group>
                </Box>
              </Group>
            </Card>
          ))}
        </Stack>
      </Card>
      {/* End Desktop */}
    </>
  )
}
