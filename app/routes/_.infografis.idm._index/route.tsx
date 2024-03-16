import { Stack, Box } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"
import { useAtomValue, useSetAtom } from "jotai"
import { useEffect } from "react"

import IdmScoreYearByYear from "#components/Infography/IDM/IdmScoreYearByYear.tsx"
import IdmSummary from "#components/Infography/IDM/IdmSummary.tsx"
import IdmTable from "#components/Infography/IDM/IdmTable.tsx"

import { IDMsAtom } from "#providers/IDM.ts"
import { schemaAtom } from "#providers/profile.ts"

import { tick, TickType } from "#services/.server/visit.js"
import { getAvailableIDM, getIDM } from "#services/idm.ts"

import type { UnderscoredCode } from "#modules/domain-handler.ts"

import { assertCommonContext } from "#server/context.js"

import { renderMetadata } from "../_.infografis/meta.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/infografis/idm")
  return null
}

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
