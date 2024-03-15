import { formatDateOnly } from "#modules/date.ts"
import { FormattedNumber } from "#modules/intl.ts"
import { Group, GroupProps, Text } from "@mantine/core"
import { IconEye, IconClock, IconUser } from "@tabler/icons-react"

export const ArticleMetaInfo = (
  props: GroupProps & {
    date: string
    author: string
    views: number
  },
) => {
  return (
    <Group {...props}>
      <Group wrap="nowrap" gap={7}>
        <IconClock size="1.5rem" stroke={1.5} />
        <Text>{formatDateOnly(props.date)}</Text>
      </Group>
      <Group wrap="nowrap" gap={7}>
        <IconUser size="1.5rem" stroke={1.5} />
        <Text>{props.author}</Text>
      </Group>
      <Group wrap="nowrap" gap={7}>
        <IconEye size="1.5rem" stroke={1.5} />
        <Text>Dilihat {FormattedNumber.format(props.views)} kali</Text>
      </Group>
    </Group>
  )
}
