import { Meta, StoryObj } from "@storybook/react"

import PageContainer from "#components/PageContainer.tsx"

import { APBDReportLoader } from "#providers/APBD.ts"

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

export const Default = {}
