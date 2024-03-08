import { Meta, StoryObj } from "@storybook/react"

import { StorybookOAuth } from "./StorybookOAuth.tsx"

const meta = {
  component: StorybookOAuth,
  title: "Auth/Storybook OAuth Callback",
} satisfies Meta<typeof StorybookOAuth>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
