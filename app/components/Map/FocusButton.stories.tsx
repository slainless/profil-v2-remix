import { Meta, StoryObj } from "@storybook/react"

import { FocusButton } from "./FocusButton"

const meta = {
  component: FocusButton,
  title: "Map/Focus Button",
} satisfies Meta<typeof FocusButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {}
