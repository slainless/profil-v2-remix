"use client"

import { Group, Text, Tooltip } from "@mantine/core"
import React from "react"
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  XIcon,
  TwitterShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share"

interface ShareArticleProps {
  articleUrl: string
}

const ShareArticle: React.FC<ShareArticleProps> = ({ articleUrl }) => {
  return (
    <Group>
      <Text mb={7}>Bagikan:</Text>

      <Tooltip label="Facebook" withArrow>
        <FacebookShareButton url={articleUrl}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </Tooltip>

      <Tooltip label="WhatsApp" withArrow>
        <WhatsappShareButton url={articleUrl}>
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
      </Tooltip>

      <Tooltip label="Twitter/X" withArrow>
        <TwitterShareButton url={articleUrl}>
          <XIcon size={32} round />
        </TwitterShareButton>
      </Tooltip>

      <Tooltip label="LinkedIn" withArrow>
        <LinkedinShareButton url={articleUrl}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Tooltip>
    </Group>
  )
}

export default ShareArticle
