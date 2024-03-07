import { Meta, StoryObj } from "@storybook/react"

import PageContainer from "Components/PageContainer"

import { APBDReportLoader } from "Providers/APBDReportLoader"

import { BudgetStatsByYear } from "./BudgetStatsByYear"

const meta = {
  component: BudgetStatsByYear,
  title: "Infography/Budget Stats By Year",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <PageContainer>
        <APBDReportLoader />
        <Story />
      </PageContainer>
    ),
  ],
} satisfies Meta<typeof BudgetStatsByYear>

export default meta
type Story = StoryObj<typeof meta>

export const Default = {}
