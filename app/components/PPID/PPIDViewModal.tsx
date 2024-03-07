import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer"
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
import { useAtomValue } from "jotai"
import { useCallback, useLayoutEffect, useMemo } from "react"

import { vars } from "Theme/artifact/vars.mjs"

import { usePathHash } from "Components/Hooks/use-path-hash.ts"
import { useWindowSize } from "Components/Hooks/use-window-size.ts"

import { PPIDItemsAtom } from "Providers/PPID.ts"

import { asset, withAtom } from "Services/assets.ts"

import "./PPIDViewModal.css"

const regexpViewHash = /^#view-(\d+)$/

export const PPIDViewModal = () => {
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

  const { width, tresholdWidth } = useWindowSize()
  const pdfDefaultZoom = useMemo(() => {
    if (width == null || width > tresholdWidth) return 1
    else if (width > 660) return 1.1
    else if (width > 550) return 1.2
    else if (width > 420) return 1.3
    else return 1.4
  }, [tresholdWidth, width])

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
          {item !== undefined ? (
            <DocViewer
              documents={[
                { uri: withAtom(asset.ppid)({ file: item?.fileURL }) },
              ]}
              pluginRenderers={DocViewerRenderers}
              config={{
                header: {
                  disableHeader: true,
                  // disableFileName: false,
                  // retainURLParams: false,
                },
                // csvDelimiter: ",",
                pdfZoom: {
                  defaultZoom: pdfDefaultZoom!,
                  zoomJump: 0.1,
                },
                pdfVerticalScrollByDefault: true,
              }}
              theme={{
                primary: "#fff",
                secondary: vars("color-primary-0"),
                tertiary: vars("color-primary-5"),
                textPrimary: vars("color-primary-0"),
                textSecondary: vars("color-primary-7"),
                textTertiary: vars("color-primary-9"),
                disableThemeScrollbar: false,
              }}
            />
          ) : (
            "Tidak ada file yang ditampilkan."
          )}
        </ModalBody>
      </ModalContent>
    </ModalRoot>
  )
}
