import { Box, Button, Card, Center, Stack, Title } from "@mantine/core"
import { Link } from "@remix-run/react"

import { vars } from "Theme/artifact/vars.mjs"

export const PPIDFooter = () => {
  return (
    <Box mx={"auto"} w={{ base: "100%", sm: "60%" }}>
      <Card radius={"sm"} shadow="sm">
        <Center>
          <Stack>
            <Title fz={{ base: 20, sm: 26 }} ta={"center"}>
              Ingin mengajukan permohonan informasi?
            </Title>
            <Box ta={"center"}>
              <Button
                variant="outline"
                color={vars("color-primary-4")}
                c={vars("color-black")}
                size={"lg"}
                w={{ base: "100%", sm: "70%" }}
                bg={"white"}
                fz={{ base: 14, sm: 20 }}
                component={Link}
                to="/ppid/permintaan"
              >
                Ajukan Permohonan Informasi
              </Button>
            </Box>
          </Stack>
        </Center>
      </Card>
    </Box>
  )
}
