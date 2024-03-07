import {
  Badge,
  Card,
  Grid,
  Group,
  List,
  SimpleGrid,
  Space,
  Text,
  Title,
} from "@mantine/core"

import { vars } from "Theme/artifact/vars.mjs"

interface Props {
  name: string
  nik: string
  kk: string
  bansos: string[]
}
export const BansosRecipientCard = ({ name, nik, kk, bansos }: Props) => {
  return (
    <>
      {/* Mobile */}
      <Card shadow="xs" hiddenFrom="sm">
        <Grid gutter={0}>
          <Grid.Col span={3}>Nama</Grid.Col>
          <Grid.Col span={1}>:</Grid.Col>
          <Grid.Col span={8}>{name}</Grid.Col>
        </Grid>
        <Grid gutter={0}>
          <Grid.Col span={3}>NIK</Grid.Col>
          <Grid.Col span={1}>:</Grid.Col>
          <Grid.Col span={8}>{nik}</Grid.Col>
        </Grid>
        <Space h={"md"} />
        <Text>Terdaftar sebagai penerima bansos:</Text>
        <List>
          {bansos.map((v) => (
            <List.Item fw={"bold"} key={v}>
              {v}
            </List.Item>
          ))}
        </List>
      </Card>
      {/* End Mobile */}

      {/* Desktop */}
      <Card shadow="xs" visibleFrom="sm">
        <SimpleGrid cols={2}>
          <Title order={3}>{name}</Title>
          <Group justify="flex-end">
            <Text c={vars("color-dimmed")}>NIK</Text>
            <Text fw="bold">{nik}</Text>
            <Text c={vars("color-dimmed")}>KK</Text>
            <Text fw="bold">{kk}</Text>
          </Group>
        </SimpleGrid>
        <Group gap={"xs"}>
          <Text>Menerima bantuan:</Text>
          {bansos.map((v) => (
            <Badge key={v}>{v}</Badge>
          ))}
        </Group>
      </Card>
      {/* End Desktop */}
    </>
  )
}
