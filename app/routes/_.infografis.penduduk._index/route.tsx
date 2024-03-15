import { Stack, Box } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import PopulationByAgama from "#components/Infography/Penduduk/PopulationByAgama.tsx"
import PopulationByAgeCategory from "#components/Infography/Penduduk/PopulationByAgeCategory.tsx"
import PopulationByDusunCategory from "#components/Infography/Penduduk/PopulationByDusunCategory.tsx"
import PopulationByPekerjaan from "#components/Infography/Penduduk/PopulationByPekerjaan.tsx"
import PopulationByPendidikan from "#components/Infography/Penduduk/PopulationByPendidikan.tsx"
import PopulationByPerkawinan from "#components/Infography/Penduduk/PopulationByPerkawinan.tsx"
import PopulationByWajibPilih from "#components/Infography/Penduduk/PopulationByWajibPilih.tsx"
import PopulationByYear from "#components/Infography/Penduduk/PopulationByYear.tsx"
import PopulationSummary from "#components/Infography/Penduduk/PopulationSummary.tsx"

import { PopulationStatisticLoader } from "#providers/population.ts"

import { renderMetadata } from "../_.infografis/meta.ts"

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "penduduk")
}

export default function Penduduk() {
  return (
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
  )
}
