import { clamp } from "@mantine/hooks"
import { useEffect, useState } from "react"

export function useExpireCounter(expireAt?: number, frequency?: number) {
  const [remaining, setRemaining] = useState(
    expireAt == null ? 0 : clamp(expireAt - Date.now(), 0, Infinity),
  )

  useEffect(() => {
    if (expireAt == null) return

    setRemaining(clamp(expireAt - Date.now(), 0, Infinity))
    const id = setInterval(
      () => setRemaining(clamp(expireAt - Date.now(), 0, Infinity)),
      frequency ?? 1000,
    )
    return () => clearInterval(id)
  }, [expireAt, frequency])

  return { remaining, isExpired: remaining <= 0 }
}
