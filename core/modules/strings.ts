export const errTitle = <T extends string>(c: T) =>
  `ERROR_TITLE_${c.toUpperCase() as Uppercase<T>}` as const

export const errMsg = <T extends string>(c: T) =>
  `ERROR_MESSAGE_${c.toUpperCase() as Uppercase<T>}` as const
