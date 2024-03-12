import { Stack, Box, Tabs } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PopulationByAgama from "Components/Infography/Penduduk/PopulationByAgama.tsx"
import PopulationByAgeCategory from "Components/Infography/Penduduk/PopulationByAgeCategory.tsx"
import PopulationByDusunCategory from "Components/Infography/Penduduk/PopulationByDusunCategory.tsx"
import PopulationByPekerjaan from "Components/Infography/Penduduk/PopulationByPekerjaan.tsx"
import PopulationByPendidikan from "Components/Infography/Penduduk/PopulationByPendidikan.tsx"
import PopulationByPerkawinan from "Components/Infography/Penduduk/PopulationByPerkawinan.tsx"
import PopulationByWajibPilih from "Components/Infography/Penduduk/PopulationByWajibPilih.tsx"
import PopulationByYear from "Components/Infography/Penduduk/PopulationByYear.tsx"
import PopulationSummary from "Components/Infography/Penduduk/PopulationSummary.tsx"

import { PopulationStatisticLoader } from "Providers/population.ts"

import { renderMetadata } from "../_.infografis/meta.ts"
import { useSetTab } from "../_.infografis/use-set-tab.ts"

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "penduduk")
}

export default function Penduduk() {
  useSetTab("penduduk")
  return (
    <Tabs.Panel value="penduduk">
      <Stack gap={100}>
        <PopulationStatisticLoader />
        <Stack gap={0}>
          <PopulationByYear />
          <PopulationSummary />
        </Stack>
        <Box mt={{ base: -65, sm: 0 }}>
          <PopulationByAgeCategory />
        </Box>
        <PopulationByDusunCategory />
        <PopulationByPendidikan />
        <PopulationByPekerjaan />
        <PopulationByWajibPilih />
        <PopulationByPerkawinan />
        <PopulationByAgama />
      </Stack>
    </Tabs.Panel>
  )
}
