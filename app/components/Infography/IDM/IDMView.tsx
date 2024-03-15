"use client"

import { UnderscoredCode } from "#modules/domain-handler.ts"
import { IDMsAtom } from "#providers/IDM.ts"
import { schemaAtom } from "#providers/profile.ts"
import { getAvailableIDM, getIDM } from "#services/idm.ts"
import { Box, Stack } from "@mantine/core"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

import IdmScoreYearByYear from "./IdmScoreYearByYear.tsx"
import IdmSummary from "./IdmSummary.tsx"
import IdmTable from "./IdmTable.tsx"

const TO_BE_FETCHED_N = 3

async function loadIDM(schema: UnderscoredCode) {
  const yearsAvailable = await getAvailableIDM(schema).catch(
    () => [] as number[],
  )
  yearsAvailable.sort()

  return await Promise.all(
    yearsAvailable.slice(0, TO_BE_FETCHED_N).map((y) => getIDM(schema, y)),
  )
}

export const IDMView = () => {
  const schema = useAtomValue(schemaAtom)
  const setIDMs = useSetAtom(IDMsAtom)

  useEffect(() => {
    loadIDM(schema).then((res) =>
      setIDMs(
        res
          .map((v) => v.mapData)
          .sort((a, b) => b.SUMMARIES.TAHUN - a.SUMMARIES.TAHUN),
      ),
    )
  }, [schema, setIDMs])

  return (
    <Stack gap={100} mt={64}>
      <Box mt={{ base: -65, sm: 0 }}>
        <IdmSummary />
      </Box>
      <Box mt={{ base: -65, sm: 0 }}>
        <IdmScoreYearByYear />
      </Box>
      <Box mt={{ base: -65, sm: 0 }}>
        <IdmTable />
      </Box>
    </Stack>
  )
}
