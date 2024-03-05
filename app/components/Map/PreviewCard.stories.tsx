import { faker } from "@faker-js/faker"
import { Box } from "@mantine/core"
import type { Meta, StoryObj } from "@storybook/react"

import { PreviewCard } from "./PreviewCard"

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Map/Preview Card",
  component: PreviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <Box bg={"var(--mantine-color-layer-1)"} p={48}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof PreviewCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    imageSrc: faker.image.url(),
    imageAlt: faker.lorem.sentence(),

    desc: faker.lorem.sentence(5),
    title: faker.location.county(),
  },
} satisfies Story

export const LongDescription = {
  args: {
    ...Default.args,
    desc: faker.lorem.paragraph(5),
  },
} satisfies Story

export const NoDescription = {
  args: {
    ...Default.args,
    desc: "",
  },
} satisfies Story

export const NoTitle = {
  args: {
    ...Default.args,
    title: "",
  },
} satisfies Story

export const FallbackImage = {
  args: {
    ...Default.args,
    imageSrc: undefined,
  },
} satisfies Story

export const LargerImage = {
  args: {
    ...Default.args,
    imageSize: 96,
  },
} satisfies Story

export const RaisedClampLimit = {
  args: {
    ...LongDescription.args,
    imageSize: 96,
    descClamp: 3,
  },
} satisfies Story

export const LongerCard = {
  args: {
    ...LongDescription.args,
    imageSize: 128,
    descClamp: 3,
    cardWidth: 320,
  },
} satisfies Story
