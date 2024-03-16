import { Outlet } from "@remix-run/react"

import { PPIDCategoryProvider } from "#providers/PPID.ts"

export default function PPIDLayout() {
  return (
    <>
      <PPIDCategoryProvider />
      <Outlet />
    </>
  )
}
