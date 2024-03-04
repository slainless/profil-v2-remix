"use client"

import { useEffect, useState } from "react"

interface reCAPTCHA {
  ready(fn: () => void): void
  execute(
    siteKey: string | undefined,
    options: { action: string },
  ): Promise<string>
}

export function useReCAPTCHA() {
  const [grecaptcha, setGrecaptcha] = useState<reCAPTCHA>()
  useEffect(() => {
    if (grecaptcha != null) return
    if (typeof window == "undefined" || window == null) return
    // @ts-expect-error ...
    if (window["grecaptcha"] == null || typeof window["grecaptcha"] != "object")
      return
    // @ts-expect-error ...
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setGrecaptcha(window["grecaptcha"] as any)
  })
  return grecaptcha
}
