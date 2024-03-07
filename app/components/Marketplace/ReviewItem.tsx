import { Avatar, Box, Divider, Group, Rating, Text } from "@mantine/core"

export const ReviewItem = (props: {
  name: string
  rating: number
  date: string
  photoURL?: string
  comment: string
}) => {
  return (
    <Box>
      <Group>
        <Avatar src={props.photoURL} alt={props.name} radius="xl" />
        <Box>
          <Group gap={"xs"}>
            <Text size="sm">{props.name}</Text>
            <Divider orientation="vertical" />
            <Rating value={props.rating} readOnly />
          </Group>
          <Text size="xs" c="dimmed">
            {props.date}
          </Text>
        </Box>
      </Group>
      <Text pl={54} pt="sm" size="sm">
        {props.comment}
      </Text>
    </Box>
  )
}
