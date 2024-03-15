"use client"

import { Center } from "@mantine/core"
import { useHash } from "@mantine/hooks"
import { useEffect, useMemo } from "react"

import { Status, getOAuthResponse } from "#services/oauth.ts"

import { createMessage } from "#modules/tab-comm.ts"

import { OAuthError } from "./OAuthError"

export function OAuthHandler() {
  const [hash] = useHash()
  const resp = useMemo(() => getOAuthResponse(hash), [hash])

  useEffect(() => {
    if (resp == null) return
    if (window.opener == null) return
    if (resp.status == Status.OK)
      window.opener.postMessage(
        createMessage(resp, "oauth_message"),
        resp.origin,
      )
  }, [resp])

  // TODO: read from state sent from server
  const label = "Google"
  return (
    <Center>
      {(() => {
        if (resp != null)
          if (resp.status == Status.OK) return "Success!"
          else return <OAuthError code={resp.status} serviceLabel={label} />
        return "Loading..."
      })()}
    </Center>
  )
}
