// prettier-ignore

/* eslint-disable no-useless-escape */

/* eslint-disable no-control-regex */
//
// ===
import { FormatRegistry } from "@sinclair/typebox";
import {
  DefaultErrorFunction,
  SetErrorFunction,
  ValueErrorType,
} from "@sinclair/typebox/errors"
import { isValidNumber } from "libphonenumber-js"

export enum Format {
  phone = "id_phone_number",
  name = "name",
  username = "username",
  password = "password",
  email = "email",
  otp = "otp_pin",
}

const regexpName = /^[\x20-\x7E]*$/
const regexpUsername = /^[a-zA-Z0-9_.-]+$/
const regexpOTPPin = /^\d{6}$/
const regexpEmail =
  /^(?:(?:(?:(?:[a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])+(?:\.([a-zA-Z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])+)*)|(?:(?:\x22)(?:(?:(?:(?:\x20|\x09)*(?:\x0d\x0a))?(?:\x20|\x09)+)?(?:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])|(?:(?:[\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}]))))*(?:(?:(?:\x20|\x09)*(?:\x0d\x0a))?(\x20|\x09)+)?(?:\x22))))@(?:(?:(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])|(?:(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])(?:[a-zA-Z]|\d|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])*(?:[a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])))\.)+(?:(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])|(?:(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])(?:[a-zA-Z]|\d|-|\.|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])*(?:[a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF}])))\.?$/

FormatRegistry.Set(
  Format.phone,
  (value) => typeof value == "string" && isValidNumber(value, "ID"),
)

FormatRegistry.Set(
  Format.name,
  (value) => typeof value == "string" && regexpName.test(value),
)

FormatRegistry.Set(
  Format.username,
  (value) => typeof value == "string" && regexpUsername.test(value),
)

FormatRegistry.Set(
  Format.email,
  (value) => typeof value == "string" && regexpEmail.test(value),
)

FormatRegistry.Set(
  Format.otp,
  (value) => typeof value == "string" && regexpOTPPin.test(value),
)

const regexpNumeric = /[0-9]+/
const regexpLowercase = /[a-z]+/
const regexpUppercase = /[A-Z]+/
const regexpSymbol = /[~`!@#$%^&\*()_\-\+={}\[\]\|\\:;'\"<,>.\? ]+/
FormatRegistry.Set(
  Format.password,
  (value) =>
    typeof value == "string" &&
    regexpNumeric.test(value) &&
    regexpLowercase.test(value) &&
    regexpUppercase.test(value) &&
    regexpSymbol.test(value),
)

SetErrorFunction((error) => {
  switch (error.errorType) {
    case ValueErrorType.String:
      return `Tidak boleh kosong`
    case ValueErrorType.StringMinLength:
      if (error.schema.minLength === 1) return "Tidak boleh kosong"
      return `Batas minimal ${error.schema.minLength} karakter`
    case ValueErrorType.StringMaxLength:
      return `Batas maksimal ${error.schema.maxLength} karakter`
    case ValueErrorType.Union:
      if (error.value == null) return `Tidak boleh kosong`
      return `Masukan tidak valid`
    case ValueErrorType.StringFormat:
      switch (error.schema.format) {
        case Format.phone:
          if (error.value == null || error.value == "")
            return `Tidak boleh kosong`
          return `Nomor tidak valid`
        case Format.email:
          return "Email tidak valid"
        case Format.name:
          return "Nama mengandung karakter yang tidak diizinkan"
        case Format.username:
          return "Username hanya boleh terdiri dari huruf, angka, atau simbol (-), (.), (_)"
        case Format.password:
          return "Password harus mengandung masing-masing satu huruf kecil, huruf besar, angka, dan simbol"
      }
      return DefaultErrorFunction(error)
    default:
      return DefaultErrorFunction(error)
  }
})
