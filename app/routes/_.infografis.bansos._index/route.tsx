import { Box, Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import Bansos from "#components/Infography/Bansos/Bansos.tsx"
import CekPenerimaBansos from "#components/Infography/Bansos/BansosLookupRecipient.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderMetadata } from "../_.infografis/meta.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/infografis/bansos")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderMetadata(args, "bansos")
}
export default function BansosView() {
  return (
    <Stack gap={100} mt={64}>
      <Box mt={{ base: -65, sm: 0 }}>
        <Bansos />
      </Box>
      <CekPenerimaBansos />
    </Stack>
  )
}
