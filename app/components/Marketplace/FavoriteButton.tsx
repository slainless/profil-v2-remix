import { ActionIcon } from "@mantine/core"
import { IconHeart } from "@tabler/icons-react"

export const FavoriteButton = () => {
  return (
    <ActionIcon variant="subtle" color="red">
      <IconHeart />
    </ActionIcon>
  )
}
