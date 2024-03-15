import { PopulationStatisticLoader } from "#providers/population.ts"
import { Box, Stack } from "@mantine/core"

import PopulationByAgama from "./PopulationByAgama"
import PopulationByAgeCategory from "./PopulationByAgeCategory"
import PopulationByDusunCategory from "./PopulationByDusunCategory"
import PopulationByPekerjaan from "./PopulationByPekerjaan"
import PopulationByPendidikan from "./PopulationByPendidikan"
import PopulationByPerkawinan from "./PopulationByPerkawinan"
import PopulationByWajibPilih from "./PopulationByWajibPilih"
import PopulationByYear from "./PopulationByYear"
import PopulationSummary from "./PopulationSummary"

export const PendudukView = () => {
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
