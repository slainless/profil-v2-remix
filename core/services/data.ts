// import { TypeOf, compile, v } from "suretype"
import { Static, Type } from "@sinclair/typebox"

import { TypeCompiler } from "../modules/typebox-compiler.ts"
import { Service } from "./oauth.ts"

export enum ErrorCode {
  // general error
  Ok = "ok",
  BadRequest = "bad_request",
  Internal = "internal_error",
  // ValidationError = "validation_error" // handled by pkg/resp
  CaptchaError = "captcha_error",
  NotInsertedError = "not_inserted",
  Timeout = "timeout_error",
  FailedFetch = "failed_fetch",
  OtherError = "other_error",
  Unauthorized = "unauthorized",
  Forbidden = "forbidden",
  NotFound = "not_found",
  Conflict = "conflict",
  PayloadTooLarge = "payload_too_large",
  BadGateway = "bad_gateway",
  GatewayTimeout = "gateway_timeout",
  Unavailable = "unavailable",
  MethodNotAllowed = "method_not_allowed",
  NotImplemented = "not_implemented",

  // file submission error
  AttachmentNumberLimit = "attachment_number_limit",
  AttachmentSizeLimit = "attachment_size_limit",
  AttachmentExtension = "attachment_extension",

  // auth error
  NotRegistered = "third_party_not_registered",
  UnsupportedService = "third_party_unsupported_service",
  EmptyCredential = "empty_credential",
  WrongCredential = "wrong_id_password",
  RetryCooldown = "retry_cooldown",
  InactiveUser = "inactive_user",
  BlockedUser = "blocked_user",

  // otp
  WrongOTP = "wrong_otp",

  /* -------------------------------------------------------------------------- */
  /*                                Local Errors                                */
  /* -------------------------------------------------------------------------- */
  SchemaNotFound = "schema_not_found",
  ProfileLoadError = "profile_load_error",
  ProfileDataEmpty = "profile_data_empty",

  ContextEmpty = "context_empty",
  MisconfiguredEnv = "misconfigured_env",
}

export const ErrorCodeReverse = Object.fromEntries(
  Object.entries(ErrorCode).map(([key, value]) => [value, key]),
)

export namespace Schema {
  const value = Type.Record(Type.String(), Type.Any())
  export const error = Type.Object({
    code: Type.String(),
    error: Type.Union([Type.Null(), value, Type.Array(value)]),
  })

  export const captchaEnforced = Type.Object({
    captcha: Type.String(),
  })

  export const notRegisteredError = Type.Object({
    code: Type.Literal(ErrorCode.NotRegistered),
    error: Type.Object({
      name: Type.String(),
      email: Type.String(),
      access_token: Type.String(),
      photo_url: Type.String(),
      source: Type.Enum(Service),
    }),
  })

  export const retryCooldownError = Type.Object({
    code: Type.Literal(ErrorCode.RetryCooldown),
    error: Type.Object({
      last_attempt: Type.String(),
      wait_time: Type.Number(),
    }),
  })
}

export namespace Compiled {
  export const error = TypeCompiler.Compile(Schema.error)
  export const captchaEnforced = TypeCompiler.Compile(Schema.captchaEnforced)
  export const notRegisteredError = TypeCompiler.Compile(
    Schema.notRegisteredError,
  )
  export const retryCooldownError = TypeCompiler.Compile(
    Schema.retryCooldownError,
  )
}

export type Error = Static<typeof Schema.error>
export type CaptchaEnforced = Static<typeof Schema.captchaEnforced>
export type NotRegisteredError = Static<typeof Schema.notRegisteredError>
export type RetryCooldownError = Static<typeof Schema.retryCooldownError>

export namespace is {
  export const error = Compiled.error.Check.bind(Compiled.error)
  export const captchaEnforced = Compiled.captchaEnforced.Check.bind(
    Compiled.captchaEnforced,
  )
  export const notRegisteredError = Compiled.notRegisteredError.Check.bind(
    Compiled.notRegisteredError,
  )
  export const retryCooldownError = Compiled.retryCooldownError.Check.bind(
    Compiled.retryCooldownError,
  )
}
