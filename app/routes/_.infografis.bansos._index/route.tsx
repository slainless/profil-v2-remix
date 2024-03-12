import { Box, Stack } from "@mantine/core"
import type { MetaFunction } from "@remix-run/node"

import Bansos from "Components/Infography/Bansos/Bansos.tsx"
import CekPenerimaBansos from "Components/Infography/Bansos/BansosLookupRecipient.tsx"

import { renderMetadata } from "../_.infografis/meta.ts"

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
