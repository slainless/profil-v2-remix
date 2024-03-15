import { Box, Center } from "@mantine/core"
import { Meta, StoryObj } from "@storybook/react"

import PageContainer from "#components/PageContainer.ts"

import { Status, Service, labels } from "#services/oauth.ts"

import { OAuthError } from "./OAuthError"

const meta = {
  component: OAuthError,
  title: "Auth/OAuth Error",
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
} satisfies Meta<typeof OAuthError>

export default meta
type Story = StoryObj<typeof meta>

export const GoogleWithInvalidToken = {
  args: {
    serviceLabel: labels[Service.Google],
    code: Status.INVALID_TOKEN,
  },
} satisfies Story

export const GoogleWithInvalidCall = {
  args: {
    serviceLabel: labels[Service.Google],
    code: Status.INVALID_CALL,
  },
} satisfies Story

export const FacebookWithInvalidToken = {
  args: {
    serviceLabel: labels[Service.Facebook],
    code: Status.INVALID_TOKEN,
  },
} satisfies Story
