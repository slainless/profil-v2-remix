import { Meta, StoryObj } from "@storybook/react"

import { SearchInput } from "./SearchInput"

const meta = {
  title: "Map/Search Input",
  component: SearchInput,
  tags: ["autodocs"],
} satisfies Meta<typeof SearchInput>

export default meta
type Story = StoryObj<typeof SearchInput>

export const Default = {} satisfies Story
