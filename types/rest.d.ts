// type JsonObject = import("type-fest").JsonObject
type StandardResponse<T extends object> = T | import("#services/data").Error
type ResponsePromise<T extends object> = Omit<
  import("ky").ResponsePromise,
  "json"
> & {
  json: () => Promise<StandardResponse<T>>
}
type KyResponse<T extends object> = Omit<import("ky").KyResponse, "json"> & {
  json: () => Promise<StandardResponse<T>>
}
