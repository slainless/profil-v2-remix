import { faker } from "@faker-js/faker"
import { Box, ScrollArea } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"
import { IconFish } from "@tabler/icons-react"

import { DetailCard } from "./DetailCard"
import sidebarStyles from "./Sidebar.module.css"

const meta = {
  component: DetailCard,
  title: "Map/Detail Card",
  decorators: [
    (Story) => (
      <Box h={480} className={sidebarStyles.root}>
        <ScrollArea>
          <Story />
        </ScrollArea>
      </Box>
    ),
  ],
} satisfies Meta<typeof DetailCard>

export default meta
type Story = StoryObj<typeof meta>

export const NoImage = {
  args: {
    title: faker.location.county(),
    category: {
      name: "Potensi",
      icon: IconFish,
    },
    desc: faker.lorem.paragraphs(2),
  },
} satisfies Story

export const WithImage = {
  args: {
    ...NoImage.args,
    imageSrc: faker.image.url() + "?lock=" + faker.number.int(1000),
  },
} satisfies Story
