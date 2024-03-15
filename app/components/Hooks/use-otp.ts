import { Type } from "@sinclair/typebox"
import { TypeCompiler } from "@sinclair/typebox/compiler"
import { useAtom } from "jotai"
import { NationalNumber } from "libphonenumber-js"
import { useCallback, useEffect } from "react"

import { alertAtom, phoneAtom, loadingAtom } from "#providers/otp.ts"

import { OTPPayload } from "#services/.client/otp.ts"

const detailValidator = TypeCompiler.Compile(
  Type.Object({
    transactionID: Type.String(),
    pin: Type.String(),
    expireAt: Type.Number(),
  }),
)

export const ErrUnknownResponse = new Error("got event but no data")
export function useOTP(onSubmit: (payload: OTPPayload) => void) {
  const [phone, setPhone] = useAtom(phoneAtom)

  const open = useCallback(
    (phoneNumber: NationalNumber) => setPhone(phoneNumber),
    [],
  )
  const close = useCallback(() => setPhone(undefined), [])

  useEffect(() => {
    const listener = (e: Event) => {
      if (e instanceof CustomEvent)
        if (detailValidator.Check(e.detail))
          onSubmit({ tid: e.detail.transactionID, pin: e.detail.pin })
    }
    window.addEventListener("submit_otp", listener)

    return () => {
      window.removeEventListener("submit_otp", listener)
    }
  }, [phone, onSubmit])

  const [alert, setAlert] = useAtom(alertAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  return { open, close, alert, setAlert, loading, setLoading }
}
