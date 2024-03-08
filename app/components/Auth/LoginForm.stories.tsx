import { Meta, StoryObj } from "@storybook/react"

import { LoginForm } from "./LoginForm"

const meta = {
  component: LoginForm,
  title: "Auth/Login Form",
} satisfies Meta<typeof LoginForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
