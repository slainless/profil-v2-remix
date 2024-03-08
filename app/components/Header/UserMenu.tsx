import { Loader, Menu, MenuProps } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import {
  Icon as IconType,
  IconBuildingStore,
  IconChecklist,
  IconShoppingCart,
  IconFileDescription,
  IconSettings,
  IconLogout,
  IconHomeMove,
  IconCheck,
} from "@tabler/icons-react"
import { useSetAtom } from "jotai"
import { PropsWithChildren, useCallback, useState } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { Icon } from "Components/Icon.tsx"

import { userAtom, usernameAtom, credentialAtom } from "Providers/user.ts"

import { getLocale } from "Locale/locale.ts"

import { logout } from "Services/.client/login.ts"
import { getError } from "Services/response"

import { errMsg, errTitle } from "Modules/strings.ts"

const icon = (icon: IconType) => (
  <Icon icon={icon} c={vars("color-dimmed")} w={14} h={14} />
)

interface UserMenuProps extends PropsWithChildren<MenuProps> {}
export function UserMenu({
  children,
  opened: o,
  defaultOpened: dO,
  onChange: setO,
  ...props
}: UserMenuProps) {
  const [opened, setOpened] = useUncontrolled({
    value: o,
    defaultValue: dO,
    onChange: setO,
  })
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const setUser = useSetAtom(userAtom)
  const setUsername = useSetAtom(usernameAtom)
  const setCredential = useSetAtom(credentialAtom)
  const locale = getLocale("ID")

  const logoutCb = useCallback(async () => {
    setIsLoggingOut(true)

    try {
      const res = await logout()
      if (res.status === 200) {
        notifications.show({
          message: "Berhasil logout",
          icon: <Icon icon={IconCheck} w={20} h={20} />,
        })
        setUser(null)
        setUsername(null)
        setCredential(null)
      } else {
        throw new Error("Unknown response")
      }
    } catch (err) {
      const e = await getError(err)
      notifications.show({
        title: locale[errTitle(e.code)],
        message: locale[errMsg(e.code)],
      })
    }

    setIsLoggingOut(false)
  }, [])

  return (
    <Menu
      shadow="md"
      width={200}
      opened={opened}
      onChange={setOpened}
      closeOnItemClick={false}
      {...props}
    >
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Pasar</Menu.Label>
        <Menu.Item leftSection={icon(IconBuildingStore)} disabled>
          Tokoku
        </Menu.Item>
        <Menu.Item leftSection={icon(IconShoppingCart)} disabled>
          Belanja
        </Menu.Item>
        <Menu.Item leftSection={icon(IconChecklist)} disabled>
          Aktifitas
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Pelayanan</Menu.Label>
        <Menu.Item leftSection={icon(IconFileDescription)} disabled>
          Surat
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>Akun</Menu.Label>
        <Menu.Item leftSection={icon(IconSettings)} disabled>
          Pengaturan
        </Menu.Item>
        <Menu.Item
          leftSection={isLoggingOut ? <Loader size={14} /> : icon(IconLogout)}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            logoutCb()
          }}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Sedang keluar..." : "Keluar"}
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item leftSection={icon(IconHomeMove)} disabled>
          Ke Desa
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
