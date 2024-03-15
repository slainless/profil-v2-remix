"use client"

import {
  Title,
  Text,
  Image,
  Spoiler,
  TypographyStylesProvider,
  Box,
  Center,
  ScrollArea,
} from "@mantine/core"
import { useAtomValue } from "jotai"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { HTMLRenderer } from "#components/HTMLRenderer.tsx"

import { aliasDesaAtom, schemaAtom } from "#providers/profile.ts"

import placeholder from "#assets/fallback.png"

import { welcomeQuery } from "#queries/profile.ts"

import { asset } from "#services/assets.ts"

import styles from "./WelcomeSpeech.module.css"

const WelcomeSpeech = () => {
  const [{ data }] = useQuery({ query: welcomeQuery })

  const schema = useAtomValue(schemaAtom)
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const welcome = data?.profile?.welcome

  return (
    <Box style={{ overflow: "visible" }} className={styles.rootContainer}>
      <Center className={styles.imageContainer}>
        <Image
          radius={"50%"}
          // radius="md"
          className={styles.image}
          fit="contain"
          fallbackSrc={placeholder}
          src={asset.common({ schema, file: welcome?.photoURL })}
          alt={welcome?.personName}
          style={{ boxShadow: vars("shadow-lg") }}
        />
      </Center>
      <Title fz={24} className={styles.title}>
        {welcome?.personName}
      </Title>
      <Text fw={600} className={styles.position}>
        {welcome?.personRole}
      </Text>
      <Title
        fz={{ base: 20, sm: 32, md: 44 }}
        c={vars("color-primary-5")}
        className={styles.heading}
      >
        Sambutan Kepala {aliasDesa}
      </Title>
      <Box className={styles.content}>
        <ScrollArea
          h={16 * 1.55 * 8}
          display={{
            base: "block",
            sm: "contents",
          }}
          type="always"
        >
          <Spoiler
            display={{
              base: "contents",
              sm: "flex",
            }}
            // maxHeight={`calc(1.55em * 20)`}
            maxHeight={18 * 1.55 * 8}
            showLabel="Selengkapnya"
            hideLabel="Sembunyikan"
          >
            <TypographyStylesProvider
              pl={0}
              fz={{ base: 16, sm: 18 }}
              // fz={17}
              style={{
                "--mantine-spacing-lg": "1.55em",
              }}
            >
              <HTMLRenderer>{welcome?.content ?? ""}</HTMLRenderer>
            </TypographyStylesProvider>
          </Spoiler>
        </ScrollArea>
      </Box>
    </Box>
  )
}

export default WelcomeSpeech
