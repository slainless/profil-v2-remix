import {
  ModalRoot,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  Group,
  Stack,
} from "@mantine/core"
import { Viewer, Worker } from "@react-pdf-viewer/core"
import "@react-pdf-viewer/core/lib/styles/index.css"
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout"
import "@react-pdf-viewer/default-layout/lib/styles/index.css"
import { useAtomValue } from "jotai"
import { useCallback, useLayoutEffect, useMemo } from "react"

import { usePathHash } from "Components/Hooks/use-path-hash.ts"

import { PPIDItemsAtom } from "Providers/PPID.ts"

import { asset, withAtom } from "Services/assets.ts"

import "./PPIDViewModal.css"

const regexpViewHash = /^#view-(\d+)$/

export const PPIDViewModal = () => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()
  const PPIDItems = useAtomValue(PPIDItemsAtom)
  const hash = usePathHash()
  const viewIndex = useMemo(() => regexpViewHash.exec(hash)?.[1] ?? "", [hash])

  const [item, opened] = useMemo(() => {
    const item = PPIDItems[viewIndex]

    let opened = viewIndex != null
    if (item === undefined) opened = false

    return [item, opened]
  }, [PPIDItems, viewIndex])

  const onClose = useCallback(() => {
    typeof window != "undefined" && (window.location.hash = " ")
  }, [])

  // cleanup hash residue...
  useLayoutEffect(() => {
    if (window.location.hash == "#%20") {
      history.replaceState(null, "", " ")
    }
  }, [hash])

  return (
    <ModalRoot
      opened={opened}
      onClose={onClose}
      size="100%"
      zIndex={9999}
      transitionProps={{ transition: "fade", duration: 200 }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Stack w="100%" gap="sm">
            <Group>
              <ModalTitle>{item?.name}</ModalTitle>
              <ModalCloseButton />
            </Group>
          </Stack>
        </ModalHeader>
        <ModalBody>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {item !== undefined ? (
              <Viewer
                fileUrl={withAtom(asset.ppid)({ file: item?.fileURL })}
                plugins={[defaultLayoutPluginInstance]}
              />
            ) : (
              "Tidak ada file yang ditampilkan."
            )}
          </Worker>
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  )
}
