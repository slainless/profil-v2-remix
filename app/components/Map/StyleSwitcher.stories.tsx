import { Meta, StoryObj } from "@storybook/react"

import { StyleSwitcher } from "./StyleSwitcher"

const meta = {
  component: StyleSwitcher,
  title: "Map/Style Switcher",
} satisfies Meta<typeof StyleSwitcher>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
