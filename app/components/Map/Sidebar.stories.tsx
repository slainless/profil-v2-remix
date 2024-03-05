import { faker } from "@faker-js/faker"
import { Box } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"

import RegularMap from "./RegularMap"
import { Entry, Sidebar } from "./Sidebar"
import { categories } from "./category"

const meta = {
  title: "Map/Sidebar",
  component: Sidebar,
  decorators: [
    (Story) => (
      <Box h={480}>
        <Story />
      </Box>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta

type Story = StoryObj<typeof Sidebar>
export const Empty = {} satisfies Story

export const EmptyWithMap = {
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <RegularMap>
          <Story />
        </RegularMap>
      )
    },
  ],
} satisfies Story

const catKeys = Object.keys(categories) as Array<keyof typeof categories>
const generate = () =>
  ({
    title: faker.location.county(),
    desc: faker.lorem.sentence(10),
    category:
      categories[
        catKeys[faker.number.int({ min: 0, max: catKeys.length - 1 })]
      ],
  }) satisfies Entry

export const HaveEntries = {
  args: {
    entries: Array(3).fill(0).map(generate),
  },
} satisfies Story

export const HaveManyEntries = {
  args: {
    entries: Array(100).fill(0).map(generate),
  },
} satisfies Story

export const FullImagesEntries = {
  args: {
    entries: Array(20).fill(0).map(generate),
  },
} satisfies Story

export const MixedImagesEntries = {
  args: {
    entries: Array(20)
      .fill(0)
      .map(() => ({
        ...generate(),
        imageSrc: faker.datatype.boolean()
          ? faker.image.url() + "?lock=" + faker.number.int(10000)
          : undefined,
      })),
  },
} satisfies Story

export const MixedImagesEntriesWithMap = {
  ...EmptyWithMap,
  ...MixedImagesEntries,
} satisfies Story
