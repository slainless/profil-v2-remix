import id from "./id.ts"

export namespace Locale {
  export const ID = id
}

export function getLocale(locale: keyof typeof Locale) {
  return Locale[locale]
}
