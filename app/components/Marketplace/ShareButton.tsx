"use client"

import {
  CopyButton,
  ActionIcon,
  Group,
  Text,
  Tooltip,
  rem,
} from "@mantine/core"
import {
  IconCopy,
  IconCheck,
  IconBrandX,
  IconBrandWhatsapp,
} from "@tabler/icons-react"
import { IconBrandFacebook } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import kebabCase from "lodash.kebabcase"
import { useMemo } from "react"
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share"

import { selectedVariantAtom } from "#providers/marketplace.ts"

interface Props {
  url: string
}

export function ShareButtons({ url }: Props) {
  const selectedVariant = useAtomValue(selectedVariantAtom)
  const variantURL = useMemo(() => {
    if (selectedVariant?.ID == null) return url
    if (selectedVariant.name == null || selectedVariant.name == "")
      return url + "?v_id=" + selectedVariant.ID
    return `${url}?v_id=${selectedVariant.ID}&v_name=${kebabCase(
      selectedVariant.name,
    )}`
  }, [selectedVariant, url])

  return (
    <Group>
      <Text mb={7}>Bagikan:</Text>

      <FacebookShareButton url={variantURL}>
        <Tooltip label="Facebook" withArrow>
          <IconBrandFacebook color="gray" size={24} />
        </Tooltip>
      </FacebookShareButton>

      <WhatsappShareButton url={variantURL}>
        <Tooltip label="WhatsApp" withArrow>
          <IconBrandWhatsapp color="gray" size={24} />
        </Tooltip>
      </WhatsappShareButton>

      <TwitterShareButton url={variantURL}>
        <Tooltip label="Twitter/X" withArrow>
          <IconBrandX color="gray" size={24} />
        </Tooltip>
      </TwitterShareButton>

      <CopyButton value={variantURL} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip
            label={copied ? "Berhasil disalin" : "Salin tautan"}
            withArrow
          >
            <ActionIcon
              color={copied ? "teal" : "gray"}
              variant="subtle"
              onClick={copy}
              mb={7}
              ml={-2}
            >
              {copied ? (
                <IconCheck style={{ width: rem(24) }} />
              ) : (
                <IconCopy style={{ width: rem(24) }} />
              )}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Group>
  )
}
