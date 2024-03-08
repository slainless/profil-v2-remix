import { Meta, StoryObj } from "@storybook/react"

import { OTPPrompt } from "./OTPPrompt"

const meta = {
  component: OTPPrompt,
  title: "Auth/OTP Prompt",
} satisfies Meta<typeof OTPPrompt>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    number: "82291182229",
  },
} satisfies Story
