import { produce } from "immer"
import { useCallback, useMemo, useState } from "react"

type Single<T> = T extends Array<infer I> ? I : never

export function usePagination<T extends { ID: number }[], I = Single<T>>(
  perPage: number,
) {
  const [cursorIndex, setCursorIndex] = useState(0)
  const [results, setResults] = useState<I[][]>([])

  const isTouched = useMemo(() => results.length > 0, [results])

  const isLastPage = useMemo(() => {
    // if result.length === 0, then its untouched...
    if (results.length === 0) return false
    // is last page if length of last result < perPage + 1
    return results[results.length - 1].length < perPage + 1
  }, [results, perPage])

  const isEmpty = useMemo(
    () =>
      isLastPage &&
      isTouched &&
      results.length === 1 &&
      results[0].length === 0,
    [isLastPage, isTouched, results],
  )

  const cursor = useMemo<number | null>(
    // obtain cursor from previous result
    // @ts-expect-error ...
    () => results?.[cursorIndex - 1]?.[perPage - 1].ID ?? null,
    [cursorIndex, perPage, results],
  )

  const nextCursor = useCallback(() => {
    if (cursorIndex - results.length > 1) return
    setCursorIndex((old) => old + 1)
  }, [results, cursorIndex])

  const previousCursor = useCallback(() => {
    setCursorIndex((old) => (old - 1 < -1 ? -1 : old - 1))
  }, [cursorIndex])

  const addResult = useCallback(
    (result: I[]) => {
      if (results.length - 1 >= cursorIndex || results[cursorIndex] != null)
        return
      setResults(
        produce((draft) => {
          // @ts-expect-error ...
          draft[cursorIndex] = result
        }),
      )
    },
    [cursorIndex, results],
  )

  const currentPage = useMemo(
    () => ({
      items: results[cursorIndex]?.slice(0, perPage) as I[] | null,
      isLastPage: cursorIndex == results.length - 1 && isLastPage,
      isFirstPage: cursorIndex === 0,
    }),
    [cursorIndex, results, isLastPage, perPage],
  )

  return {
    cursor,

    nextCursor: nextCursor,
    prevCursor: previousCursor,
    addResult,
    results,
    cursorIndex,
    limit: perPage + 1,

    isLastPage,
    isEmpty,
    isTouched,
    currentPage,
  }
}
