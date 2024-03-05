"use client"

import { useEffect, useMemo, useState } from "react"

const hour = 3600 * 1000
const minute = 60 * 1000
const second = 1 * 1000

interface SimpleCounterProps {
  expireAt?: number /* expire at, in millisecond */
  frequency?: number /* update frequency in millisecond, defaults to 1000 */

  remaining?: number
  setRemaining?: number
}
export function SimpleCounter({
  expireAt,
  frequency,
  remaining,
}: SimpleCounterProps) {
  const [now, setNow] = useState(Date.now())
  const display = useMemo(() => {
    const delta =
      remaining != null && expireAt == null
        ? remaining
        : expireAt == null || now >= expireAt
          ? 0
          : expireAt - now
    if (delta <= 0) return "00:00"
    const hours = Math.floor(delta / hour)
    const hoursR = delta % hour
    const minutes = Math.floor(hoursR / minute)
      .toString()
      .padStart(2, "0")
    const minutesR = hoursR % minute
    const seconds = Math.floor(minutesR / second)
      .toString()
      .padStart(2, "0")

    if (hours === 0) return `${minutes}:${seconds}`

    return `${hours.toString().padStart(2, "0")}:${minutes}:${seconds}`
  }, [now, remaining, expireAt])

  useEffect(() => {
    if (expireAt == null) return

    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), frequency ?? 1000)
    return () => clearInterval(id)
  }, [expireAt, frequency])

  return <span>{display}</span>
}
