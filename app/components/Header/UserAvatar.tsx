"use client"

import { Avatar } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { useAtomValue } from "jotai"
import { useMemo } from "react"

import { vars } from "#theme/artifact/vars.mjs"

import { AuthModal } from "#components/Auth/AuthModal.tsx"

import { aliasDesaAtom, desaAtom } from "#providers/profile.ts"

import { userAtom, usernameAtom } from "#services/.client/user.js"
import { asset } from "#services/assets.ts"

import { createInitial } from "#modules/avatar.ts"

import { UserMenu } from "./UserMenu.tsx"

export function UserAvatar() {
  const [opened, { open, close }] = useDisclosure(false)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const desa = useAtomValue(desaAtom)
  const username = useAtomValue(usernameAtom)
  const user = useAtomValue(userAtom)

  const photoUrl = useMemo(() => {
    if (user == null) return
    if (user.photoURL != null && user.photoURL !== "")
      return asset.mobileUser({ file: user.photoURL })
    return createInitial(user.name)
  }, [user])

  return (
    <>
      <AuthModal
        opened={opened && user == null && username == null}
        onClose={close}
        onSuccess={() => {
          close()
          notifications.show({
            title: "Login berhasil",
            message: `Selamat datang di ${aliasDesa} ${desa}`,
          })
        }}
      />
      <UserMenu
        disabled={user == null || username == null}
        position="bottom-end"
      >
        <Avatar
          onClick={() => {
            if (user == null) open()
            else close()
          }}
          variant="light"
          color="white"
          src={photoUrl}
          style={{
            border:
              user == null ? undefined : `3px solid ${vars("color-white")}`,
          }}
        />
      </UserMenu>
    </>
  )
}
