import { Stack, Box } from "@mantine/core"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { useAtomValue } from "jotai"

import BudgetStats from "#components/Front/BudgetStats.tsx"
import Destination from "#components/Front/Destination.tsx"
import Explore from "#components/Front/Explore.tsx"
import GalleryGrid from "#components/Front/GalleryGrid.tsx"
import Jumbotron from "#components/Front/Jumbotron.tsx"
import NewsPanel from "#components/Front/NewsPanel.tsx"
import PopulationStats from "#components/Front/PopulationStats.tsx"
import Potencies from "#components/Front/Potencies.tsx"
import Products from "#components/Front/Products.tsx"
import Sotk from "#components/Front/Sotk.tsx"
import WelcomeSpeech from "#components/Front/WelcomeSpeech.tsx"
import MapSection from "#components/Map/MapSection.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { subdomainAtom } from "#providers/profile.ts"

import { TickType, tick } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/")
  return null
}

export default function Index() {
  const slug = useAtomValue(subdomainAtom)
  return (
    <Stack>
      <Box mt={{ base: 90, sm: 0, md: 0, lg: 0, xl: 0 }}>
        <Jumbotron />
      </Box>
      <PageContainer>
        <Stack gap={100}>
          <Explore />
          <WelcomeSpeech />
          <MapSection slug={slug} />
          <Sotk />
          <PopulationStats />
          <BudgetStats />
          <NewsPanel />
          {/* <BumdesPanel /> */}
          <Potencies />
          <Destination />
          <Products />
          <GalleryGrid />
        </Stack>
      </PageContainer>
    </Stack>
  )
}
