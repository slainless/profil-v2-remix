import { Meta, StoryObj } from "@storybook/react"

import { FinancingCard } from "./FinancingCard"

const meta = {
  title: "Infography/Budget Stats By Year/Financing Card",
  component: FinancingCard,
} satisfies Meta<typeof FinancingCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    income: 2490524900560000,
    expense: 5490524900560000,
  },
} satisfies Story
