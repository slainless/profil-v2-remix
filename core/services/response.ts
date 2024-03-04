/* eslint-disable @typescript-eslint/no-explicit-any */
import { Static, TSchema } from "@sinclair/typebox"
import { TypeCheck } from "@sinclair/typebox/compiler"
import { HTTPError, TimeoutError } from "ky"
import { render } from "micromustache"
import type { Writable } from "type-fest"

import { ErrorCode, ErrorCodeReverse, is } from "Services/data.ts"

import { errMsg, errTitle } from "Modules/strings.ts"

export interface NormalizedError {
  status: number
  code: ErrorCode
  error?: unknown
  text?: string | null
}

export interface Feedback {
  title?: any
  message?: any
  color?: string
  icon?: any
}

const r = <T extends NormalizedError>(resp: Writable<Readonly<T>>) => resp

const statusCodeMap = {
  400: ErrorCode.BadRequest,
  401: ErrorCode.Unauthorized,
  403: ErrorCode.Forbidden,
  404: ErrorCode.NotFound,
  405: ErrorCode.MethodNotAllowed,
  413: ErrorCode.PayloadTooLarge,
  500: ErrorCode.Internal,
  501: ErrorCode.NotImplemented,
  502: ErrorCode.BadGateway,
  503: ErrorCode.Unavailable,
  504: ErrorCode.GatewayTimeout,
}

export async function mustGetResponse<T extends TSchema>(
  res: Response,
  validator: TypeCheck<T>,
): Promise<Static<T>> {
  const text = await res.text()
  try {
    const json = JSON.parse(text)
    if (validator.Check(json)) {
      return json
    }
  } catch (e) {
    //
  }
  throw new Error(`Unknown response: "${text}"`)
}

export async function getError(res: unknown): Promise<NormalizedError> {
  let resp: Response
  if (res instanceof Response) {
    resp = res
  } else if (res instanceof HTTPError) {
    resp = res.response
  } else if (res instanceof TimeoutError) {
    return r({ status: 0, code: ErrorCode.Timeout })
  } else if (res instanceof TypeError) {
    return r({ status: 0, code: ErrorCode.FailedFetch })
  } else {
    return r({ status: 0, code: ErrorCode.OtherError })
  }

  if (200 <= resp.status && resp.status < 300) {
    return r({ status: resp.status, code: ErrorCode.Ok })
  }

  let json: any | null = null
  let text: string | null = null
  try {
    text = await resp.text()
    json = JSON.parse(text)
  } catch (e) {
    //
  }

  if (json == null)
    return r({
      // @ts-expect-error ...
      code: statusCodeMap[resp.status] ?? ErrorCode.OtherError,
      status: resp.status,
      text,
    })

  if (is.error(json))
    if (json.code in ErrorCodeReverse)
      return r({
        code: json.code as ErrorCode,
        status: resp.status,
        error: json.error,
      })

  return r({
    code: ErrorCode.OtherError,
    status: resp.status,
    error: json.error,
  })
}

export function getErrorTitle(
  locale: Record<string, string>,
  err: NormalizedError,
) {
  const fallback = "Masalah tidak diketahui"
  const title = locale[errTitle(err.code)] ?? fallback
  if (title === fallback || err.error == null || typeof err.error != "object")
    return title
  return render(title, err.error)
}

export function getErrorMessage(
  locale: Record<string, string>,
  err: NormalizedError,
) {
  const fallback = `Kode error: ${err.code}`
  const title = locale[errMsg(err.code)] ?? fallback
  if (title === fallback || err.error == null || typeof err.error != "object")
    return title
  return render(title, err.error)
}
