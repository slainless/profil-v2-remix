/* eslint-disable @typescript-eslint/no-explicit-any */
import { Static, TSchema, Type } from "@sinclair/typebox"
import { TypeCheck, TypeCompiler } from "@sinclair/typebox/compiler"
import { HTTPError, TimeoutError } from "ky"
import { render } from "micromustache"
import type { Writable } from "type-fest"

import { errMsg, errTitle } from "../modules/strings.ts"
import { ErrorCode, ErrorCodeReverse, is } from "./data.ts"

export namespace Schema {
  export const normalizedError = Type.Object({
    status: Type.Number(),
    code: Type.Enum(ErrorCode),
    error: Type.Optional(Type.Unknown()),
    text: Type.Optional(Type.Union([Type.String(), Type.Null()])),
  })
}

export namespace Compiled {
  export const normalizedError = TypeCompiler.Compile(Schema.normalizedError)
}

export type NormalizedError = Static<typeof Schema.normalizedError>
export const isNormalizedError = Compiled.normalizedError.Check.bind(
  Compiled.normalizedError,
)

export interface Feedback {
  title?: any
  message?: any
  color?: string
  icon?: any
}

export const createNormalizedError = <T extends Partial<NormalizedError>>(
  resp: Writable<Readonly<T>>,
) => ({ status: 0, ...resp })

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
    return createNormalizedError({ status: 0, code: ErrorCode.Timeout })
  } else if (res instanceof TypeError) {
    return createNormalizedError({ status: 0, code: ErrorCode.FailedFetch })
  } else {
    return createNormalizedError({ status: 0, code: ErrorCode.OtherError })
  }

  if (200 <= resp.status && resp.status < 300) {
    return createNormalizedError({ status: resp.status, code: ErrorCode.Ok })
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
    return createNormalizedError({
      // @ts-expect-error ...
      code: statusCodeMap[resp.status] ?? ErrorCode.OtherError,
      status: resp.status,
      text,
    })

  if (is.error(json))
    if (json.code in ErrorCodeReverse)
      return createNormalizedError({
        code: json.code as ErrorCode,
        status: resp.status,
        error: json.error,
      })

  return createNormalizedError({
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
