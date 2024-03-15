import { Box, Card, Group, ActionIcon, Stack, Text } from "@mantine/core"
import { Link, useLocation } from "@remix-run/react"
import { IconHome, IconReport, IconShoppingBag } from "@tabler/icons-react"
import { IconNews } from "@tabler/icons-react"
import React, { useState, useEffect } from "react"

import { vars } from "#theme/artifact/vars.mjs"

const FloatingMenu: React.FC = () => {
  const [activeIcon, setActiveIcon] = useState<string>("home")
  const location = useLocation()

  const handleIconClick = (icon: string) => {
    setActiveIcon(icon)
  }

  const getIconColor = (icon: string) =>
    activeIcon === icon ? vars("color-primary-4") : "#BBBBBB"

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveIcon("home")
    } else if (location.pathname === "/pengaduan") {
      setActiveIcon("pengaduan")
    } else if (location.pathname.startsWith("/belanja")) {
      setActiveIcon("belanja")
    } else if (location.pathname.startsWith("/berita")) {
      setActiveIcon("berita")
    } else {
      setActiveIcon("#BBBBBB")
    }
  }, [location])

  return (
    <Box
      p={10}
      w={"100%"}
      pos={"fixed"}
      bottom={0}
      style={{ zIndex: 9 }}
      hiddenFrom="sm"
    >
      <Card shadow="sm" p={20} radius="100px" withBorder>
        <Group justify="space-between">
          <ActionIcon
            component={Link}
            to={"/"}
            variant="transparent"
            onClick={() => handleIconClick("home")}
          >
            <Stack
              gap={0}
              justify="center"
              align="center"
              c={getIconColor("home")}
            >
              <IconHome size={30} />
              <Text fz={11}>Home</Text>
            </Stack>
          </ActionIcon>
          <ActionIcon
            component={Link}
            to={"/pengaduan"}
            variant="transparent"
            onClick={() => handleIconClick("pengaduan")}
          >
            <Stack
              gap={0}
              justify="center"
              align="center"
              c={getIconColor("pengaduan")}
            >
              <IconReport size={30} />
              <Text fz={11}>Pengaduan</Text>
            </Stack>
          </ActionIcon>
          {/* <Box /> */}
          <ActionIcon
            component={Link}
            to={"/berita"}
            variant="transparent"
            onClick={() => handleIconClick("berita")}
          >
            <Stack
              gap={0}
              justify="center"
              align="center"
              c={getIconColor("berita")}
            >
              <IconNews size={30} />
              <Text fz={11}>Berita</Text>
            </Stack>
          </ActionIcon>
          <ActionIcon
            component={Link}
            to={"/belanja"}
            variant="transparent"
            onClick={() => handleIconClick("belanja")}
          >
            <Stack
              gap={0}
              justify="center"
              align="center"
              c={getIconColor("belanja")}
            >
              <IconShoppingBag size={30} />
              <Text fz={11}>Belanja</Text>
            </Stack>
          </ActionIcon>
        </Group>
      </Card>
    </Box>
  )
}

export default FloatingMenu
