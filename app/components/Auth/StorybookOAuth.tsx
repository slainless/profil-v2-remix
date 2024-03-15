"use client"

import { Status, channel, getOAuthResponse } from "#services/oauth.ts"
import { Code, Table } from "@mantine/core"
import { useHash } from "@mantine/hooks"
import { useMemo } from "react"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const row = (a: any, b: any) => (
  <Table.Tr>
    <Table.Td>{a}</Table.Td>
    <Table.Td>{b}</Table.Td>
  </Table.Tr>
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const code = (a: any) => <Code>{a}</Code>

export function StorybookOAuth() {
  const [hash] = useHash()
  const resp = useMemo(() => getOAuthResponse(hash), [hash])
  if (resp?.status == Status.OK)
    return (
      <Table>
        {row(code("BroadcastChannel"), code(channel))}
        {row(code("Status"), code(resp.status))}
        {row(code("Token"), code(resp.token))}
        {row(code("Origin"), code(resp.origin))}
        {row(code("Redirect"), code(resp.redirect))}
        {row(code("Service"), code(resp.service))}
      </Table>
    )
  else
    return (
      <Table>
        {row(code("BroadcastChannel"), code(channel))}
        {row(code("Status"), code(resp?.status))}
      </Table>
    )
}
