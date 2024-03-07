/* eslint-disable @typescript-eslint/no-explicit-any */
export type SortedHashTable<T> = Map<T, number>
export type SortedHashTableValues<T> =
  T extends SortedHashTable<infer V> ? V : never
/**
 * Create value-sorting hash table from ordered array of values. Use `as const`
 * on input to get a solid type instead of generic `string[]` or `number[]`
 */
export function createSortByValue<T extends readonly any[]>(
  values: T,
): SortedHashTable<T[number]> {
  return new Map(values.map((v, i) => [v, i]))
}

/**
 * Fast value sorting using `SortedHashTable`. Unregistered value will fallback
 * to `0`. Use accessor when input (a, b) is not of type `TValues`.
 */
export function sortByValue<
  TTables extends SortedHashTable<any>,
  TValues extends SortedHashTableValues<TTables>,
>(sortOrder: TTables): (a: TValues, b: TValues) => number

export function sortByValue<
  TTables extends SortedHashTable<any>,
  TValues extends SortedHashTableValues<TTables>,
  TInput,
>(
  sortOrder: TTables,
  accessor: (item: TInput) => TValues,
): (a: TInput, b: TInput) => number

export function sortByValue<
  TTables extends SortedHashTable<any>,
  TValues extends SortedHashTableValues<TTables>,
  TInput,
>(
  sortOrder: TTables,
  accessor?: (item: TInput) => TValues,
): (a: TInput, b: TInput) => number {
  const acc = accessor
  return (a: TInput, b: TInput) => {
    return (
      (sortOrder.get(acc ? acc(b) : (b as any as TValues)) ?? 0) -
      (sortOrder.get(acc ? acc(a) : (a as any as TValues)) ?? 0)
    )
  }
}
