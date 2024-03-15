"use client"

import { Box, Stack, TextInput, Title, rem } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"
import debounce from "lodash.debounce"
import { ChangeEvent, useCallback, useState } from "react"
import { useQuery } from "urql"

import { vars } from "#theme/artifact/vars.mjs"

import { bansosRecipientQuery } from "#queries/bansos.ts"

import { BansosRecipientCard } from "./BansosRecipientCard.tsx"

const NIKRegexp = /^\d{16,}$/

const CekPenerimaBansos = () => {
  const [query, setQuery] = useState("")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnChange = useCallback(
    debounce((e: ChangeEvent<HTMLInputElement>) => {
      setQuery(e.target.value)
    }, 350),
    [],
  )
  const [{ data }] = useQuery({
    query: bansosRecipientQuery,
    variables: {
      searchQuery: query,
    },
    pause: query == "" || !NIKRegexp.test(query),
  })

  return (
    <Stack>
      <Box>
        <Title
          fz={{ base: 20, sm: 38 }}
          ta={{ base: "center", sm: "start", md: "start" }}
          c={vars("color-primary-4")}
        >
          Cek Penerima Bansos
        </Title>
      </Box>
      <TextInput
        size="lg"
        // label="Cari penerima bansos"
        placeholder="Masukkan NIK penerima bansos"
        leftSectionWidth={42}
        leftSection={
          <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={3} />
        }
        onChange={debouncedOnChange}
      />
      <Stack>
        {data?.recipients.map((recipient) => (
          <BansosRecipientCard
            name={recipient.name}
            nik={recipient.NIK}
            kk={recipient.KK}
            bansos={recipient.bansos.map((v) => v.name)}
            key={recipient.name + recipient.NIK}
          />
        ))}
      </Stack>
    </Stack>
  )
}

export default CekPenerimaBansos
