"use client"

import { typeboxResolver } from "@hookform/resolvers/typebox"
import {
  Box,
  Button,
  FileInput,
  Group,
  LoadingOverlay,
  Popover,
  Select,
  Stack,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import {
  IconFile3d,
  IconRadioactive,
  IconSend,
  IconThumbUp,
} from "@tabler/icons-react"
import { IconHeadset } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { WritableDeep } from "type-fest"

import { vars } from "#theme/artifact/vars.mjs"

import { schemaAtom } from "#providers/profile.ts"

import { ComplaintPayload, Schema, categories } from "#services/complaint.js"
import { getError } from "#services/response.ts"
import { formData, getPublicRest } from "#services/rest.ts"

import { errMsg, errTitle } from "#modules/strings.js"

import { PhoneNumberInput } from "./PhoneNumberInput.tsx"

function Pengaduan() {
  const resolver = useMemo(() => typeboxResolver(Schema.payload), [])
  const schema = useAtomValue(schemaAtom)
  const [opened, { open, close }] = useDisclosure(false)

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
      close()
      reset()
      setFile(null)
    }

    setLoading(true)
    getPublicRest()
      .post("pengaduan", {
        body: formData({ ...data, attachment: file }),
        headers: { "X-Digides-Schema": schema },
      })
      .json()
      .then(() => {
        closeUp()
        notifications.show({
          title: "Pengaduan terkirim!",
          message: "Pengaduan anda akan kami proses secepatnya.",
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
    <Popover
      opened={opened}
      onOpen={open}
      onClose={close}
      width={300}
      trapFocus
      position="top-end"
      shadow="md"
    >
      <Popover.Target>
        <Box
          visibleFrom="sm"
          mx={"md"}
          mb={"sm"}
          bg={vars("color-red-3")}
          px={"sm"}
          py={"xs"}
          style={{
            position: "fixed",
            bottom: 0,
            right: 0,
            border: "2px solid white",
            borderRadius: 10,
            opacity: 0.8,
            zIndex: 100,
            cursor: "pointer",
          }}
          onClick={() => (opened ? close() : open())}
        >
          <Group>
            <Stack gap={0}>
              <IconHeadset size={24} color="white" />
            </Stack>
            <Text fz={"md"} fw={600} c="white">
              Pengaduan
            </Text>
          </Group>
        </Box>
      </Popover.Target>
      <Popover.Dropdown>
        <form style={{ display: "contents" }} onSubmit={onSubmit}>
          <Stack pos="relative">
            <LoadingOverlay
              visible={loading}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
            />
            <TextInput
              variant="filled"
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
              minRows={3}
              // maxRows={10}
              variant="filled"
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
              variant="filled"
              leftSectionPointerEvents="none"
              value={file}
              onChange={(file) => setFile(file)}
              accept="image/png,image/jpeg,application/pdf"
              label="Lampiran"
              size="md"
            />
            <Group justify="flex-end" mt={20}>
              <Button
                leftSection={<IconSend size={14} />}
                variant="filled"
                color={vars("color-primary-4")}
                type="submit"
              >
                Kirim
              </Button>
            </Group>
          </Stack>
        </form>
      </Popover.Dropdown>
    </Popover>
  )
}

export default Pengaduan
