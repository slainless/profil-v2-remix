"use client"

import { typeboxResolver } from "@hookform/resolvers/typebox"
import {
  Button,
  FileInput,
  LoadingOverlay,
  Select,
  Stack,
  TextInput,
  Textarea,
  Title,
} from "@mantine/core"
import { notifications } from "@mantine/notifications"
import {
  IconFile3d,
  IconRadioactive,
  IconSend,
  IconThumbUp,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { WritableDeep } from "type-fest"

import { vars } from "Theme/artifact/vars.mjs"

import { PhoneNumberInput } from "Components/PhoneNumberInput.tsx"

import { schemaAtom } from "Providers/profile.ts"

import {
  ComplaintPayload,
  Schema,
  categories,
} from "Services/.client/complaint.ts"
import { getError } from "Services/response.ts"
import { formData, rest } from "Services/rest.ts"

import { errMsg, errTitle } from "Modules/strings.ts"

export function PengaduanForm() {
  const resolver = useMemo(() => typeboxResolver(Schema.payload), [])
  const schema = useAtomValue(schemaAtom)

  const [loading, setLoading] = useState<boolean>(false)
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ComplaintPayload>({ resolver, mode: "onChange" })

  const onSubmit = handleSubmit((data) => {
    const closeUp = () => {
      setLoading(false)
      reset()
      setFile(null)
    }

    setLoading(true)
    rest
      .post("pengaduan", {
        body: formData({ ...data, attachment: file }),
        headers: { "X-Digides-Schema": schema },
      })
      .then(() => {
        closeUp()
        notifications.show({
          title: "Pengaduan terkirim!",
          message: "Pengaduan Anda akan kami proses secepatnya.",
          icon: <IconThumbUp />,
        })
      })
      .catch(async (err) => {
        closeUp()
        const e = await getError(err)
        notifications.show({
          title: errTitle(e.code),
          message: errMsg(e.code),
          color: "red",
          icon: <IconRadioactive />,
        })
      })
  })

  return (
    <Stack>
      <Title
        tt={"uppercase"}
        fz={{ base: 20, sm: 44 }}
        ta={{ base: "center", sm: "start", md: "start" }}
        c={vars("color-primary-5")}
      >
        FORM PENGADUAN
      </Title>
      <form style={{ display: "contents" }} onSubmit={onSubmit}>
        <Stack pos="relative" gap={"lg"}>
          <LoadingOverlay
            visible={loading}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
          />
          <TextInput
            placeholder="Masukkan nama Anda"
            {...register("name")}
            error={errors.name?.message}
            size="md"
            label="Nama"
            withAsterisk
          />
          <PhoneNumberInput
            variant="filled"
            placeholder="Masukkan nomor telepon Anda"
            {...register("phone")}
            // @ts-expect-error ...
            error={errors.phone?.message}
            size="md"
            label="Nomor Telepon"
            withAsterisk
          />
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select
                placeholder="Pilih kategori pengaduan Anda"
                error={errors.category?.message}
                allowDeselect={false}
                data={categories as WritableDeep<typeof categories>}
                size="md"
                label="Kategori Pengaduan"
                withAsterisk
                comboboxProps={{ withinPortal: false }}
                {...field}
              />
            )}
          />

          <Textarea
            autosize
            minRows={5}
            // maxRows={10}
            placeholder="Masukkan kesan atau aduan Anda"
            {...register("complaint")}
            error={errors.complaint?.message}
            withAsterisk
            label="Pengaduan"
            size="md"
          />
          <FileInput
            leftSection={<IconFile3d />}
            placeholder={"Masukkan lampiran jika ada"}
            leftSectionPointerEvents="none"
            value={file}
            onChange={(file) => setFile(file)}
            accept="image/png,image/jpeg,application/pdf"
            label="Lampiran"
            size="md"
          />
          <Button
            fullWidth
            mt={20}
            leftSection={<IconSend size={14} />}
            color={vars("color-primary-4")}
            type="submit"
          >
            Kirim
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
