import { NationalNumber, format, parse } from "libphonenumber-js"
import { Opaque } from "type-fest"

class NumberFormat extends Intl.NumberFormat {
  formatNoSpace(value: number | bigint) {
    return this.format(value).replaceAll(/\s/g, "")
  }
}

export const IDRFormatter = new NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
})

export const IDRFormatterNoComma = new NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  maximumFractionDigits: 0,
})

export const FormattedNumber = new Intl.NumberFormat("id-ID")

// export const capitalize = (string: string) =>
//   string.replace(/^\p{CWU}/u, (char) => char.toLocaleUpperCase("id"))

// export const capitalizeEachWord = (string: string) =>
//   string.replace(/(?:^| )(\p{CWU})/gu, (char) => char.toLocaleUpperCase("id"))

// wtf these are faster???
export const capitalize = (string: string) =>
  string.charAt(0).toLocaleUpperCase("ID") + string.slice(1)
export const capitalizeEachWord = (string: string) =>
  string
    .split(" ")
    .map((s) => s.charAt(0).toLocaleUpperCase("ID") + s.slice(1))
    .join(" ")

export const parsePhoneNumber = (
  string: string,
): NationalNumber | undefined => {
  try {
    return parse(string, "ID").phone
  } catch {
    return
  }
}

// const capturer =
//   /(?:^| )([a-zA-Z0-9\xC0-\xD6\xD8-\xF6\xF8-\xFF\u0100-\u01BF\u01C4-\u024F\u1E00-\u1EFF\u0250-\u02AF])/gu
// export const initials = (str?: string): string | undefined => {
//   if (str === "" || str == null) return
//   if (str.length === 1) return str.toLocaleUpperCase("ID")

//   const arr = Array.from(str.matchAll(capturer))
//   switch (arr.length) {
//     case 0:
//       return
//     case 1:
//       return arr[0][1].toLocaleUpperCase("ID")
//     case 2:
//       return (arr[0][1] + arr[1][1]).toLocaleUpperCase("ID")
//     default:
//       return (arr[0][1] + arr[arr.length - 1][1]).toLocaleUpperCase("ID")
//   }
// }
