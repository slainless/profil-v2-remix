import { PPIDCategoryProvider } from "#providers/PPID.ts"
import { Outlet } from "@remix-run/react"

export default function PPIDLayout() {
  return (
    <>
      <PPIDCategoryProvider />
      <Outlet />
    </>
  )
}
