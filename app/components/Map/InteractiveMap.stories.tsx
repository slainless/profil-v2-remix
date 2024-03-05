import { Meta, StoryObj } from "@storybook/react"

import { InteractiveMap } from "./InteractiveMap"

const meta = {
  component: InteractiveMap,
  title: "Map/Interactive Map",
} satisfies Meta<typeof InteractiveMap>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {}
