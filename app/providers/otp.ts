import { atom } from "jotai"
import { NationalNumber } from "libphonenumber-js"

import { OTPResponse } from "Services/.client/otp.ts"
import { Feedback } from "Services/response"

// export const openedAtom = atom<boolean>(false)
export const loadingAtom = atom<boolean>(false)
export const alertAtom = atom<Feedback | undefined>(undefined)

export const phoneAtom = atom<NationalNumber | undefined>(undefined)
export const responseAtom = atom<OTPResponse | undefined>(undefined)
