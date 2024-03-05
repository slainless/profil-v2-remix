import { Stack, Box } from "@mantine/core"
import { useAtomValue } from "jotai"

import BudgetStats from "Components/Front/BudgetStats.tsx"
import Destination from "Components/Front/Destination.tsx"
import Explore from "Components/Front/Explore.tsx"
import GalleryGrid from "Components/Front/GalleryGrid.tsx"
import Jumbotron from "Components/Front/Jumbotron.tsx"
import NewsPanel from "Components/Front/NewsPanel.tsx"
import PopulationStats from "Components/Front/PopulationStats.tsx"
import Potencies from "Components/Front/Potencies.tsx"
import Products from "Components/Front/Products.tsx"
import Sotk from "Components/Front/Sotk.tsx"
import WelcomeSpeech from "Components/Front/WelcomeSpeech.tsx"
import MapSection from "Components/Map/MapSection.tsx"
import PageContainer from "Components/PageContainer.tsx"

import { subdomainAtom } from "Providers/profile.ts"

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
