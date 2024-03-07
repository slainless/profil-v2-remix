import { Group, ActionIcon } from "@mantine/core"
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react"

export const PageNavigation = (props: {
  onPrev: () => void
  onNext: () => void
  isPrevDisabled?: boolean
  isNextDisabled?: boolean
}) => {
  return (
    <Group justify="center">
      <ActionIcon
        disabled={props.isPrevDisabled}
        onClick={props.onPrev}
        size={"lg"}
      >
        <IconArrowLeft />
      </ActionIcon>
      <ActionIcon
        disabled={props.isNextDisabled}
        onClick={props.onNext}
        size={"lg"}
      >
        <IconArrowRight />
      </ActionIcon>
    </Group>
  )
}
