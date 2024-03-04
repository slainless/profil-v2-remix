import { useEffect, useState } from "react"

const tresholdWidth = 767
const tresholdHeight = 0

type WindowSize = {
  width: number | undefined
  height: number | undefined
  tresholdWidth: number
  tresholdHeight: number
}

export const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
    tresholdWidth: tresholdWidth,
    tresholdHeight: tresholdHeight,
  })
  useEffect(() => {
    function handleResize(): void {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
        tresholdWidth: tresholdWidth,
        tresholdHeight: tresholdHeight,
      })
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return (): void => window.removeEventListener("resize", handleResize)
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
