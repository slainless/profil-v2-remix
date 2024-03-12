"use client"

import { typeboxResolver } from "@hookform/resolvers/typebox"
import {
  Card,
  TextInput,
  Textarea,
  Button,
  Box,
  Flex,
  LoadingOverlay,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
  IconAffiliate,
  IconAt,
  IconPhone,
  IconRadioactive,
  IconSend,
  IconSignature,
  IconThumbUp,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"

import { vars } from "Theme/artifact/vars.mjs"

import { schemaAtom } from "Providers/profile.ts"

import { Schema, type PPIDRequestPayload } from "Services/.client/ppid.ts"
import { formData, rest } from "Services/rest.ts"

import { fieldSpanFullStyle, requestFormStyle } from "./PPIDRequestForm.css"

export const PPIDRequestForm = () => {
  const resolver = useMemo(() => typeboxResolver(Schema.payload), [])
  const schema = useAtomValue(schemaAtom)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PPIDRequestPayload>({ resolver, mode: "onChange" })

  const onSubmit = handleSubmit((data) => {
    const cleanUp = () => {
      setLoading(false)
      reset()
    }

    setLoading(true)
    rest
      .post("ppid_request", {
        body: formData(data),
        headers: { "X-Digides-Schema": schema },
      })
      .then(() => {
        cleanUp()
        notifications.show({
          title: "Permintaan terkirim!",
          message: "Permintaan Anda akan kami proses secepatnya.",
          icon: <IconThumbUp />,
        })
      })
      .catch(() => {
        setLoading(false)
        notifications.show({
          title: "Gagal mengirimkan permintaan!",
          message: "Ada kesalahan pada layanan permintaan informasi desa.",
          color: "red",
          icon: <IconRadioactive />,
        })
      })
  })

  return (
    <Card radius={"sm"} shadow="sm" p={{ sm: "xl" }} pos="relative">
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <form style={{ display: "contents" }} onSubmit={onSubmit}>
        <Box className={requestFormStyle}>
          <TextInput
            variant="filled"
            placeholder="Masukkan nama Anda"
            {...register("name")}
            error={errors.name?.message}
            size="lg"
            label="Nama"
            withAsterisk
            leftSection={<IconSignature />}
            readOnly={loading}
          />
          <TextInput
            variant="filled"
            placeholder="Masukkan asal instansi Anda"
            {...register("instance")}
            error={errors.instance?.message}
            size="lg"
            label="Asal Instansi"
            withAsterisk
            leftSection={<IconAffiliate />}
            readOnly={loading}
          />
          <TextInput
            variant="filled"
            placeholder="Masukkan nomor telepon Anda"
            {...register("phone")}
            error={errors.phone?.message}
            size="lg"
            label="Nomor Telepon"
            withAsterisk
            leftSection={<IconPhone />}
            readOnly={loading}
          />
          <TextInput
            variant="filled"
            placeholder="Masukkan alamat email"
            {...register("email")}
            error={errors.email?.message}
            size="lg"
            label="Alamat E-mail"
            withAsterisk
            leftSection={<IconAt />}
            readOnly={loading}
          />
          <Textarea
            autosize
            minRows={5}
            // maxRows={10}
            variant="filled"
            placeholder="Masukkan permohonan Anda"
            {...register("request")}
            error={errors.request?.message}
            size="lg"
            label="Permohonan"
            withAsterisk
            className={fieldSpanFullStyle}
            readOnly={loading}
          />
        </Box>
        <Flex mt={vars("spacing-lg")} justify={"flex-end"}>
          <Button
            leftSection={<IconSend />}
            size="md"
            variant="filled"
            color={vars("color-primary-4")}
            loading={loading}
            type="submit"
          >
            Kirim
          </Button>
        </Flex>
      </form>
    </Card>
  )
}
