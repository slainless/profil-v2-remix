import { useCallback, useEffect, useState } from "react"

export const usePathHash = () => {
  const [hash, setHash] = useState(
    typeof window == "undefined" ? "" : window.location.hash,
  )
  const callback = useCallback(() => {
    setHash(typeof window == "undefined" ? "" : window.location.hash)
  }, [])
  useEffect(() => {
    window.addEventListener("hashchange", callback)
    return () => {
      window.removeEventListener("hashchange", callback)
    }
  }, [callback])

  return hash
}
