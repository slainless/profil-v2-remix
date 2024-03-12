import { Outlet } from "@remix-run/react"

import { PPIDCategoryProvider } from "Providers/PPID.ts"

export default function PPIDLayout() {
  return (
    <>
      <PPIDCategoryProvider />
      <Outlet />
    </>
  )
}
