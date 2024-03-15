/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button, ButtonProps, Image } from "@mantine/core"
import { useLocation } from "@remix-run/react"
import { useAtomValue } from "jotai"
import { useEffect, useState } from "react"

import { baseDomainAtom } from "#providers/profile.ts"

import facebookLogo from "#assets/facebook-logo.svg"
import googleLogo from "#assets/google-logo.svg"

import {
  Service,
  SuccessOAuthResponse,
  createAuthUrl,
  labels,
  profileScopes,
} from "#services/oauth.ts"

import { parseMessage } from "#modules/tab-comm.ts"

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-explicit-any */

export const icons = {
  [Service.Facebook]: facebookLogo,
  [Service.Google]: googleLogo,
}

export interface OAuthButtonProps extends ButtonProps {
  service: Service
  onTokenGet?: (token: string, service: Service) => void
}

export function OAuthButton({
  service,
  onTokenGet,
  ...rest
}: OAuthButtonProps) {
  const baseDomain = useAtomValue(baseDomainAtom)
  const location = useLocation()
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    if (typeof window == "undefined") return
    const rootOrigin = new URL(window.location.origin)
    rootOrigin.hostname = "oauth." + baseDomain
    const url = createAuthUrl(
      rootOrigin.href,
      window.location.origin,
      service,
      profileScopes[service],
    )
    setUrl(url)
  }, [location, baseDomain, service])

  const [activeWindow, setActiveWindow] = useState<Window | null>(null)
  useEffect(() => {
    if (activeWindow == null) return
    const listener = (e: MessageEvent<any>) => {
      const data = parseMessage(e.data, "oauth_message") as SuccessOAuthResponse
      if (data == null) return
      if (data.token == null || data.token == "") return
      onTokenGet?.(data.token, service)
      activeWindow.close()
      setActiveWindow(null)
    }
    window.addEventListener("message", listener)
    return () => {
      window.removeEventListener("message", listener)
    }
  }, [activeWindow])

  return (
    <Button
      variant="default"
      leftSection={<Image w={20} h={20} src={icons[service]} />}
      component="a"
      href={url}
      disabled={url == ""}
      target="_blank"
      onClick={(e) => {
        e.preventDefault()
        const openedWindow = window.open(e.currentTarget.href)
        if (openedWindow == null) return
        setActiveWindow(openedWindow)

        openedWindow.onclose = () => setActiveWindow(null)
      }}
      {...rest}
    >
      {labels[service]}
    </Button>
  )
}
