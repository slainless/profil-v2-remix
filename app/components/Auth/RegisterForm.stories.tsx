import { Meta, StoryObj } from "@storybook/react"

import { RegisterForm } from "./RegisterForm.tsx"

const meta = {
  component: RegisterForm,
  title: "Auth/Register Form",
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {} satisfies Story
