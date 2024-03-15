import { BoxProps, Center } from "@mantine/core"
import { IconFocus2 } from "@tabler/icons-react"
import clsx from "clsx"
import { useAtomValue } from "jotai"
import { useMap } from "react-map-gl/maplibre"

import { isLoadedPoiAtom } from "#providers/map.ts"
import { schemaAtom } from "#providers/profile.ts"

import { PointOfInterest } from "#graphql/graphql.ts"

import bbox from "#modules/geojson-bbox.js"
import { centerOfIndonesia } from "#modules/geojson-utils.ts"

import styles from "./StyleSwitcher.module.css"
import { useBorderDesa, useBorderPoi } from "./use-border-desa"

interface FocusButtonProps extends BoxProps {
  result: Pick<PointOfInterest, "point">[]
}

export function FocusButton({ result, className, ...rest }: FocusButtonProps) {
  const map = useMap()
  const schema = useAtomValue(schemaAtom)

  const { borderDesa } = useBorderDesa(schema)
  // if (errorDesa) console.error("Unhandled error:", errorDesa)
  const { borderPoi, centerPoi, countPoi } = useBorderPoi(result)
  const isLoadedPoi = useAtomValue(isLoadedPoiAtom)

  return (
    <Center
      p={6}
      w="max-content"
      className={clsx(className, styles.root)}
      role="button"
      pos="relative"
      c="#333"
      onClick={() => {
        if (map == null || map.current == null) return

        const b = bbox(borderDesa)
        if (b == null) {
          if (isLoadedPoi) {
            const p = bbox(borderPoi)
            if (p != null) {
              if (countPoi === 1) {
                map.current.flyTo({
                  zoom: 12,
                  center: centerPoi,
                  pitch: 0,
                })
              } else {
                map.current.fitBounds(p, { padding: 100, pitch: 0 })
              }
            }
          } else {
            map.current.flyTo({
              zoom: 4,
              center: {
                lat: centerOfIndonesia.latitude,
                lng: centerOfIndonesia.longitude,
              },
            })
          }
        } else {
          map.current.fitBounds(b, { padding: 50, pitch: 0 })
        }
      }}
      {...rest}
    >
      <IconFocus2 />
    </Center>
  )
}
