import { Box, Center } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"

import PageContainer from "Components/PageContainer.tsx"

import { Service, labels } from "Services/oauth.ts"

import { OAuthRedirectNotice } from "./OAuthRedirectNotice.tsx"

const meta = {
  component: OAuthRedirectNotice,
  title: "Auth/OAuth Redirect Notice",
  decorators: [
    (Story) => (
      <PageContainer>
        <Center>
          <Box maw={480}>
            <Story />
          </Box>
        </Center>
      </PageContainer>
    ),
  ],
} satisfies Meta<typeof OAuthRedirectNotice>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {
  args: {
    serviceLabel: labels[Service.Google],
  },
} satisfies Story
