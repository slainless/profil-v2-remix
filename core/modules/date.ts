import dayjs from "dayjs"
import "dayjs/locale/id"
import LocalizedFormat from "dayjs/plugin/localizedFormat"

dayjs.extend(LocalizedFormat)

export const formatDateOnly = (sqlDate: string) =>
  dayjs(sqlDate).locale("id").format("LL")

export const formatDateOnlyWithDay = (sqlDate: string) =>
  dayjs(sqlDate).locale("id").format("dddd, D MMMM YYYY")
