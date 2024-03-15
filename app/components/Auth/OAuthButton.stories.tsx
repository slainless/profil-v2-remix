import { Service } from "#services/oauth.ts"
import { Meta, StoryObj } from "@storybook/react"

import { OAuthButton } from "./OAuthButton.tsx"

const meta = {
  component: OAuthButton,
  title: "Auth/OAuth Button",
} satisfies Meta<typeof OAuthButton>

export default meta
type Story = StoryObj<typeof meta>

export const Google = {
  args: {
    service: Service.Google,
  },
} satisfies Story

export const Facebook = {
  args: {
    service: Service.Facebook,
  },
} satisfies Story
