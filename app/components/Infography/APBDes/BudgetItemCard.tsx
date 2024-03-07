import { Card, Box, Group, Text, CardProps, TextProps } from "@mantine/core"
import {
  IconArrowBadgeDownFilled,
  IconArrowBadgeUpFilled,
  IconPointFilled,
} from "@tabler/icons-react"
import { PropsWithChildren } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { IDRFormatter } from "Modules/intl.ts"

export type BudgetItemProps = {
  title: string
  value: number
  stripSign?: boolean
}

export namespace BudgetItem {
  export const Root = (props: CardProps) => (
    <Card
      shadow="xs"
      p="sm"
      withBorder
      c={vars("color-text-dark-3")}
      {...props}
    />
  )

  export const Title = (
    props: PropsWithChildren<TextProps> & { state: State },
  ) => (
    <Group gap={6}>
      <Box component={getIcon(props.state)} c={getIconColor(props.state)} />
      <Text fz={17} fw={600} mb={0} {...props} />
    </Group>
  )

  export const Value = ({
    budget,
    state,
    stripSign,
    ...rest
  }: TextProps & { budget: number; state: State; stripSign?: boolean }) => {
    const b = normalizeBudget(budget)
    const formatted = IDRFormatter.formatNoSpace(b)
    return (
      <Text fz={24} fw={800} c={getColor(state)} {...rest}>
        {stripSign ? formatted.replace(/^-/, "") : formatted}
      </Text>
    )
  }
}

export const BudgetItemCard = ({
  title,
  value,
  stripSign,
  ...rest
}: BudgetItemProps & CardProps) => {
  const state = getState(value)
  return (
    <BudgetItem.Root {...rest}>
      <BudgetItem.Title state={state}>{title}</BudgetItem.Title>
      <BudgetItem.Value state={state} budget={value} stripSign={stripSign} />
    </BudgetItem.Root>
  )
}

export const getIconColor = (state: State) =>
  // @ts-expect-error ...
  getColor(state, vars("color-dimmed"), "darker")
export const normalizeBudget = (v: number) => (isNaN(v) ? 0 : v)

export function getState(n: number) {
  if (n < 0) return "NEGATIVE"
  if (n == 0) return "ZERO"
  return "POSITIVE"
}
type State = ReturnType<typeof getState>

export function getColor(
  state: State,
  def = "inherit",
  darkness = "darkest" as const,
) {
  switch (state) {
    case "NEGATIVE":
      return vars(`color-text-red-${darkness}`)
    case "POSITIVE":
      return vars(`color-text-green-${darkness}`)
    default:
      return def
  }
}

export function getIcon(state: State) {
  switch (state) {
    case "NEGATIVE":
      return IconArrowBadgeDownFilled
    case "POSITIVE":
      return IconArrowBadgeUpFilled
    default:
      return IconPointFilled
  }
}
