import { Box, Stack } from "@mantine/core"

import Bansos from "./Bansos.tsx"
import CekPenerimaBansos from "./BansosLookupRecipient.tsx"

export const BansosView = () => {
  return (
    <Stack gap={100} mt={64}>
      <Box mt={{ base: -65, sm: 0 }}>
        <Bansos />
      </Box>
      <CekPenerimaBansos />
    </Stack>
  )
}
