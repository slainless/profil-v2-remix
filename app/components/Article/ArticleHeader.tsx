import {
  Breadcrumbs,
  ActionIcon,
  Title,
  Image,
  Text,
  Group,
  Box,
} from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconClock, IconEye, IconHome, IconUser } from "@tabler/icons-react"

import { vars } from "#theme/artifact/vars.mjs"

import { Span } from "#components/Span.tsx"

import { formatDateOnly } from "#modules/date.ts"
import { FormattedNumber } from "#modules/intl.ts"

import styles from "./ArticleHeader.module.css"

export const ArticleHeader = (props: {
  backLinkURL: string
  backLinkTitle: string
  thumbnailURL?: string
  thumbnailAlt?: string
  title: string
  createdAt: string
  authorName: string
  views: number
}) => {
  return (
    <Box className={styles.header}>
      <Breadcrumbs separatorMargin={2} className="breadcrumb">
        <ActionIcon variant="transparent" component={Link} to={"/"}>
          <IconHome size={20} color="#000" />
        </ActionIcon>
        <Text
          component={Link}
          to={props.backLinkURL}
          fz={14}
          c={"unset"}
          td={"unset"}
        >
          {props.backLinkTitle}
        </Text>
      </Breadcrumbs>
      <Image
        radius={"md"}
        src={props.thumbnailURL}
        fit="cover"
        alt={props.thumbnailAlt}
        mah={{ base: 320, sm: 640 }}
        className="thumbnail"
      />
      <Title
        fz={{ base: 18, xs: 28, sm: 32 }}
        lh="1.2em"
        order={1}
        className="title"
      >
        {props.title}
      </Title>
      <Group wrap="nowrap" gap={7} className="date">
        <IconClock
          className="iconSize"
          size="1.5rem"
          stroke={1.5}
          color={vars("color-gray-6")}
        />
        <Span>{formatDateOnly(props.createdAt)}</Span>
      </Group>
      <Group className="author" gap={7}>
        <IconUser
          className="iconSize"
          size="1.5rem"
          stroke={1.5}
          color={vars("color-gray-6")}
        />
        <span>
          <Span c={vars("color-gray-6")}>Ditulis oleh </Span>
          <Span>{props.authorName}</Span>
        </span>
      </Group>
      <Group className="views" gap={7}>
        <IconEye
          className="iconSize"
          size="1.5rem"
          stroke={1.5}
          color={vars("color-gray-6")}
        />
        <span>
          <Span c={vars("color-gray-6")}>Dilihat </Span>
          <Span>{FormattedNumber.format(props.views)} </Span>
          <Span c={vars("color-gray-6")}>kali</Span>
        </span>
      </Group>
    </Box>
  )
}
