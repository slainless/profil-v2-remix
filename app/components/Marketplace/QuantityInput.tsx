"use client"

import { Group, Button, Text } from "@mantine/core"
import { useAtom } from "jotai"
import { useCallback } from "react"

import { quantityAtom } from "#providers/marketplace.ts"

export const QuantityInput = () => {
  const [qty, setQty] = useAtom(quantityAtom)
  const incrementCb = useCallback(() => setQty(qty + 1), [qty, setQty])
  const decrementCb = useCallback(
    () => setQty(qty - 1 < 0 ? 0 : qty - 1),
    [qty, setQty],
  )

  return (
    <Group>
      <Button variant="default" onClick={decrementCb}>
        -
      </Button>
      <Text>{qty}</Text>
      <Button variant="default" onClick={incrementCb}>
        +
      </Button>
    </Group>
  )
}
