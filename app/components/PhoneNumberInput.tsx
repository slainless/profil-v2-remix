import { InputWrapperProps, TextInput, TextInputProps } from "@mantine/core"
import { mergeRefs } from "@mantine/hooks"
import IMask, { MaskedOptions } from "imask"
import { forwardRef, useCallback } from "react"

const maskOptions = {
  mask: `\\0000-0000-000[00]`,
} satisfies MaskedOptions
export const PhoneNumberInput = forwardRef<TextInputProps & InputWrapperProps>(
  (props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const localRef = useCallback((e: any) => {
      if (e == null) return
      IMask(e, maskOptions)
    }, [])
    return <TextInput ref={mergeRefs(ref, localRef)} {...props} />
  },
)
PhoneNumberInput.displayName = "PhoneNumberInput"
