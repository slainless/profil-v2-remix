import { AppShell } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"

import AppHeader from "./Header"

const meta = {
  component: AppHeader,
  title: "Layout/Header",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof AppHeader>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
