import { Stack, Box, Tabs } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

import IdmScoreYearByYear from "Components/Infography/IDM/IdmScoreYearByYear.tsx"
import IdmSummary from "Components/Infography/IDM/IdmSummary.tsx"
import IdmTable from "Components/Infography/IDM/IdmTable.tsx"

import { IDMsAtom } from "Providers/IDM.ts"
import { schemaAtom } from "Providers/profile.ts"

import { getAvailableIDM, getIDM } from "Services/idm.ts"

import type { UnderscoredCode } from "Modules/domain-handler.ts"

import { renderMetadata } from "../_.infografis/meta.ts"
import { useSetTab } from "../_.infografis/use-set-tab.ts"

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "idm")
}

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

export default function IDMView() {
  useSetTab("idm")
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
    <Tabs.Panel value="idm">
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
    </Tabs.Panel>
  )
}
