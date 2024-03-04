"use client"

import {
  AppShell,
  Image,
  Stack,
  Text,
  Group,
  Burger,
  Drawer,
  Space,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Link, useLocation } from "@remix-run/react"
// import { Spotlight, spotlight } from "@mantine/spotlight"
// import {
//   IconSearch,
//   IconShoppingBag,
//   IconHeart,
//   IconBell,
// } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"
import {
  useState,
  useCallback,
  useMemo, // useLayoutEffect,
  useEffect,
} from "react"

import { vars } from "Theme/artifact/vars.mjs"

// import { UserAvatar } from "Components/Header/UserAvatar.tsx"
import { profileAtom, schemaAtom } from "Providers/profile.ts"

import { asset } from "Services/assets.ts"

import { DomainHandler } from "Modules/domain-handler.ts"

import { NavbarItem } from "./NavbarItem.tsx"
import { navbarMenu } from "./navbar-menu.ts"

const checkIsTop = () => window.scrollY < 20

const AppHeader = () => {
  const [isTransparent, setIsTransparent] = useState(false)
  const profile = useAtomValue(profileAtom)
  const schema = useAtomValue(schemaAtom)
  const location = useLocation()
  const isUsingTransparentHeader = useMemo(
    () => location.pathname == "/",
    [location],
  )

  const isTransparentCallback = useCallback(
    () => (isUsingTransparentHeader ? setIsTransparent(checkIsTop()) : null),
    [isUsingTransparentHeader],
  )

  useEffect(() => {
    if (!isUsingTransparentHeader) {
      setIsTransparent(false)
      return
    }

    setIsTransparent(checkIsTop())

    const controller = new AbortController()
    document.addEventListener("scroll", isTransparentCallback, {
      passive: true,
      signal: controller.signal,
    })

    return () => {
      controller.abort()
      document.removeEventListener("scroll", isTransparentCallback)
    }
  }, [isTransparentCallback, isUsingTransparentHeader, location])

  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false)

  const filteredMenu = navbarMenu.filter(
    (item) =>
      (!item.onlyDesa && !item.onlyKel) ||
      (DomainHandler.isKelurahan(schema) && item.onlyKel) ||
      (!DomainHandler.isKelurahan(schema) && item.onlyDesa),
  )

  return (
    <AppShell.Header
      bg={{
        base: vars("color-primary-6"),
        sm: isTransparent ? "transparent" : vars("color-primary-6"),
      }}
      withBorder={false}
      py={10}
      px={{ base: 10, sm: 30 }}
    >
      <Group justify="space-between" gap={0}>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Group gap={"xs"}>
            <Image
              w={{ base: 40, sm: 50, md: 60, lg: 70 }}
              src={asset.logo300({ schema, file: profile.logoURL })}
              alt="Logo"
            />
            <Stack
              gap={0}
              justify="flex-start"
              // c={{ base: "#fff", sm: isTransparent ? "#fff" : "#000" }}
              c={{
                base: "#fff",
                sm: isTransparent ? vars("color-white") : vars("color-white"),
              }}
            >
              <Text fz={{ sm: "sm", md: "md", lg: "lg" }} fw="bold">
                {`${profile.alias.desa} ${profile.name.deskel}`}
              </Text>
              <Text fz={{ base: "xs", sm: "xs", md: "sm", lg: "md" }}>
                Kabupaten {profile.name?.kabkota}
              </Text>
            </Stack>
          </Group>
        </Link>
        <Group justify="flex-end">
          <Group gap="xl" visibleFrom="sm">
            {filteredMenu.map((item) => (
              <NavbarItem
                isTransparent={isTransparent}
                item={item}
                onClick={closeDrawer}
                pathname={location.pathname}
                key={render(item.title, { alias: profile.alias.desa })}
              />
            ))}
          </Group>
          <Group gap="xs" ml={24}>
            {/* <ActionIcon color="black" variant="subtle" size="lg">
              <IconSearch
                onClick={spotlight.open}
                color={isTransparent ? "#fff" : "#fff"}
              />
            </ActionIcon>
            <IconWithBadge
              icon={<IconShoppingBag color={isTransparent ? "#fff" : "#fff"} />}
              count={"99+"}
            />
            <IconWithBadge
              icon={<IconBell color={isTransparent ? "#fff" : "#fff"} />}
              count={"99+"}
            /> */}
            {/* <UserAvatar /> */}
          </Group>
        </Group>
        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          position="right"
          size="80%"
          padding="md"
          hiddenFrom="sm"
          zIndex={10}
          withCloseButton={false}
          overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        >
          <Stack gap={"xl"} c={vars("color-black")}>
            <Space h={40} />
            {filteredMenu.map((item) => (
              <NavbarItem
                isTransparent={isTransparent}
                item={item}
                onClick={closeDrawer}
                pathname={location.pathname}
                key={render(item.title, { alias: profile.alias.desa })}
              />
            ))}
          </Stack>
        </Drawer>
        <Burger
          opened={drawerOpened}
          onClick={toggleDrawer}
          size="md"
          color="#fff"
          hiddenFrom="sm"
        />
      </Group>
      {/* <Spotlight
        actions={[]}
        centered
        size={"xl"}
        radius={"100px"}
        overlayProps={{ style: { backgroundColor: "rgba(0, 0, 0, 0.8)" } }}
        searchProps={{
          rightSection: (
            <IconSearch
              style={{ width: rem(20), height: rem(20) }}
              stroke={3}
            />
          ),
          placeholder: "Cari di sini...",
        }}
      /> */}
    </AppShell.Header>
  )
}

export default AppHeader
