import { Box, Stack } from "@mantine/core"
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node"

import { PPIDFooter } from "#components/PPID/PPIDFooter.tsx"
import { PPIDHeader } from "#components/PPID/PPIDHeader.tsx"
import { PPIDHeaderMobile } from "#components/PPID/PPIDHeaderMobile.tsx"
import { PPIDLatestFiles } from "#components/PPID/PPIDLatestFiles.tsx"
import PageContainer from "#components/PageContainer.tsx"

import { tick, TickType } from "#services/.server/visit.js"

import { assertCommonContext } from "#server/context.js"

import { renderCommonMetadata } from "../_/meta.ts"
import { page } from "./meta.ts"

export function loader({ context }: LoaderFunctionArgs) {
  assertCommonContext(context)
  tick(context.schema, TickType.GENERAL, "/ppid")
  return null
}

export const meta: MetaFunction = (args) => {
  return renderCommonMetadata(args, page)
}

export default function PPIDIndex() {
  return (
    <>
      <Box mt={{ base: 63, sm: 0, md: 0, lg: 0, xl: 0 }} hiddenFrom="sm">
        <PPIDHeaderMobile />
      </Box>
      <PageContainer>
        <Stack gap={50} style={{ zIndex: 2 }}>
          <PPIDHeader />
          <PPIDLatestFiles />
          <PPIDFooter />
        </Stack>
      </PageContainer>
    </>
  )
}
