import { Meta, StoryObj } from "@storybook/react"

import { BudgetItemCard } from "./BudgetItemCard"

const meta = {
  component: BudgetItemCard,
  title: "Infography/Budget Stats By Year/Budget Item Card",
  args: {
    w: "max-content",
    miw: 320,
  },
} satisfies Meta<typeof BudgetItemCard>

export default meta
type Story = StoryObj<typeof meta>

export const Income = {
  args: {
    title: "Pendapatan",
    value: 2490524900560000,
  },
} satisfies Story

export const Expense = {
  args: {
    title: "Belanja",
    value: -2490524900560000,
    stripSign: true,
  },
} satisfies Story

export const Zero = {
  args: {
    title: "Belanja",
    value: 0,
    stripSign: true,
  },
} satisfies Story
