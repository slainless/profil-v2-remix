"use client"

import {
  Box,
  Center,
  AppShell,
  Grid,
  Group,
  Stack,
  Text,
  Image,
  ScrollArea,
  List,
  ActionIcon,
  Card,
  Accordion,
  rem,
  Title,
  Anchor,
  SimpleGrid,
  Space,
} from "@mantine/core"
import {
  IconClock,
  IconPhone,
  IconMail,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
  IconBrandYoutube,
  IconBrandTiktok,
  IconHome,
  IconWorld,
  IconUrgent,
  IconLink,
  IconBrandX,
} from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { useMemo } from "react"
import { useQuery } from "urql"

import { vars } from "Theme/artifact/vars.mjs"

import { profileAtom, schemaAtom } from "Providers/profile.ts"

import { mainPointOfInterestQuery } from "Queries/poi.ts"
// import { visitStatisticAtom } from "Atoms/visitor"
import { externalLinksQuery, importantContactsQuery } from "Queries/profile.ts"

import { asset } from "Services/assets"

import { getMainPOI } from "Modules/geojson-utils.ts"

// import { FormattedNumber } from "Modules/intl.ts"
import FloatingMenu from "./FloatingMenu"

const AppFooter = () => {
  const schema = useAtomValue(schemaAtom)
  const profil = useAtomValue(profileAtom)
  const [{ data: contacts }] = useQuery({ query: importantContactsQuery })
  const [{ data: links }] = useQuery({ query: externalLinksQuery })
  const [{ data: poi }] = useQuery({ query: mainPointOfInterestQuery })
  // const statistic = useAtomValue(visitStatisticAtom)

  const mainPOI = getMainPOI(poi)
  const gMapLink = mainPOI
    ? `https://www.google.com/maps/place/${mainPOI.point.latitude},${mainPOI.point.longitude}`
    : "#"

  const currentYear = new Date().getFullYear()

  const importantContacts = useMemo(() => {
    if (contacts == null) return []
    return [...(contacts.contacts ?? [])].sort((a, b) => a.order - b.order)
  }, [contacts])

  const externalLinks = useMemo(() => {
    if (links == null) return []
    return [...(links.links ?? [])].sort((a, b) => a.order - b.order)
  }, [links])

  return (
    <>
      <FloatingMenu />
      {/* Mobile */}
      <Box hiddenFrom="sm">
        <Card bg={vars("color-primary-6")} radius={"16px 16px 0 0"}>
          <Stack>
            <Group gap={"xs"}>
              <Image
                w={60}
                src={asset.logo300({ schema, file: profil.logoURL })}
                alt="Logo"
              />
              <Stack gap={0} justify="flex-start">
                <Text lh={1} c={"#fff"} fz={16} fw="bold">
                  {`${profil.alias.desa} ${profil.name.deskel}`}
                </Text>
                <Text lh={1} c="#fff" fz={12}>
                  Kecamatan {profil.name.kecamatan}
                </Text>
                <Text lh={1} c="#fff" fz={12}>
                  Kabupaten {profil.name.kabkota}
                </Text>
                <Text lh={1} c="#fff" fz={12}>
                  Provinsi {profil.name.provinsi}
                </Text>
              </Stack>
            </Group>
            <Accordion variant="filled" c={"#fff"}>
              <Accordion.Item value="visitor" bg={"transparent"}>
                <Accordion.Control
                  c={"#fff"}
                  icon={
                    <IconWorld
                      style={{ color: "#fff", width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  <Title fz={16}>Kunjungan Website</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={1} ml={32}>
                    {/* <Text fz={14}>
                      Total Pengunjung |{" "}
                      <span style={{ color: "#14FE00" }}>&#9679;</span> 28
                      Online
                    </Text> */}
                    <SimpleGrid cols={2}>
                      <Box>
                        <Text fz={14}>Hari Ini</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.today ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Kemarin</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.yesterday ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Minggu Ini</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.thisWeek ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Minggu Lalu</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.lastWeek ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Bulan Ini</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.thisMonth ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Bulan Lalu</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.lastMonth ?? 0)} */}
                        </Text>
                      </Box>
                      <Box>
                        <Text fz={14}>Total Kunjungan</Text>
                        <Text fz={21}>
                          {/* {FormattedNumber.format(statistic?.total ?? 0)} */}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="contact" bg={"transparent"}>
                <Accordion.Control
                  c={"#fff"}
                  icon={
                    <IconPhone
                      style={{ color: "#fff", width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  <Title fz={16}>Kontak {profil.alias.desa}</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={1} ml={32}>
                    <List fz={14}>
                      <List.Item icon={<IconPhone size={20} />}>
                        <Text
                          c={"#fff"}
                          component="a"
                          href={`tel:${
                            profil.phone !== "" ? profil.phone : "-"
                          }`}
                          target="_blank"
                          fz={14}
                        >
                          {profil.phone !== "" ? profil.phone : "-"}
                        </Text>
                      </List.Item>
                      <List.Item icon={<IconMail size={20} />}>
                        <Text
                          c={"#fff"}
                          component="a"
                          href={`mailto:${
                            profil.email !== "" ? profil.email : "-"
                          }`}
                          target="_blank"
                          fz={14}
                        >
                          {profil.email !== "" ? profil.email : "-"}
                        </Text>
                      </List.Item>
                      <List.Item icon={<IconClock size={20} />}>
                        {profil.workHour !== "" ? profil.workHour : "-"}
                      </List.Item>
                      <List.Item icon={<IconHome size={20} />}>
                        <Text
                          c={"#fff"}
                          component={mainPOI ? "a" : "p"}
                          href={gMapLink}
                          target="_blank"
                          fz={14}
                        >
                          {profil.officeAddress !== ""
                            ? profil.officeAddress
                            : "-"}
                        </Text>
                      </List.Item>
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="urgent" bg={"transparent"}>
                <Accordion.Control
                  c={"#fff"}
                  icon={
                    <IconUrgent
                      style={{ color: "#fff", width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  <Title fz={16}>Nomor Telepon Penting</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={1} ml={32}>
                    <Stack>
                      {importantContacts.map((item, key) => {
                        return (
                          <Box key={key}>
                            <Text fz={14}>{item.name}</Text>
                            <Text
                              c={"#fff"}
                              fz={14}
                              component="a"
                              href={`tel:${item.contact}`}
                              target="_blank"
                            >
                              {item.contact}
                            </Text>
                          </Box>
                        )
                      })}
                    </Stack>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="social" bg={"transparent"}>
                <Accordion.Control
                  c={"#fff"}
                  icon={
                    <IconBrandFacebook
                      style={{ color: "#fff", width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  <Title fz={16}>Sosial Media</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={1}>
                    <Group justify="center">
                      <ActionIcon
                        variant="transparent"
                        component={
                          profil.socialMedia.facebook === "" ||
                          profil.socialMedia.facebook === "#"
                            ? "button"
                            : "a"
                        }
                        href={profil.socialMedia.facebook}
                        target="_blank"
                      >
                        <IconBrandFacebook
                          color={
                            profil.socialMedia.facebook === "" ||
                            profil.socialMedia.facebook === "#"
                              ? "gray"
                              : "#fff"
                          }
                          size={50}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        component={
                          profil.socialMedia.instagram === "" ||
                          profil.socialMedia.instagram === "#"
                            ? "button"
                            : "a"
                        }
                        href={profil.socialMedia.instagram}
                        target="_blank"
                      >
                        <IconBrandInstagram
                          color={
                            profil.socialMedia.instagram === "" ||
                            profil.socialMedia.instagram === "#"
                              ? "gray"
                              : "#fff"
                          }
                          size={50}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        component={
                          profil.socialMedia.twitter === "" ||
                          profil.socialMedia.twitter === "#"
                            ? "button"
                            : "a"
                        }
                        href={profil.socialMedia.twitter}
                        target="_blank"
                      >
                        <IconBrandTwitter
                          color={
                            profil.socialMedia.twitter === "" ||
                            profil.socialMedia.twitter === "#"
                              ? "gray"
                              : "#fff"
                          }
                          size={50}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        component={
                          profil.socialMedia.youtube === "" ||
                          profil.socialMedia.youtube === "#"
                            ? "button"
                            : "a"
                        }
                        href={profil.socialMedia.youtube}
                        target="_blank"
                      >
                        <IconBrandYoutube
                          color={
                            profil.socialMedia.youtube === "" ||
                            profil.socialMedia.youtube === "#"
                              ? "gray"
                              : "#fff"
                          }
                          size={50}
                        />
                      </ActionIcon>
                      <ActionIcon
                        variant="transparent"
                        component={
                          profil.socialMedia.tiktok === "" ||
                          profil.socialMedia.tiktok === "#"
                            ? "button"
                            : "a"
                        }
                        href={profil.socialMedia.tiktok}
                        target="_blank"
                      >
                        <IconBrandTiktok
                          color={
                            profil.socialMedia.tiktok === "" ||
                            profil.socialMedia.tiktok === "#"
                              ? "gray"
                              : "#fff"
                          }
                          size={50}
                        />
                      </ActionIcon>
                    </Group>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="address" bg={"transparent"}>
                <Accordion.Control
                  c={"#fff"}
                  icon={
                    <IconLink
                      style={{ color: "#fff", width: rem(20), height: rem(20) }}
                    />
                  }
                >
                  <Title fz={16}>Jelajahi</Title>
                </Accordion.Control>
                <Accordion.Panel>
                  <Stack gap={1} ml={32}>
                    <List>
                      {externalLinks.map((item, key) => {
                        return (
                          <List.Item key={key}>
                            <Text
                              c={"#fff"}
                              component="a"
                              href={item.URL}
                              target="_blank"
                              fz={14}
                            >
                              {item.name}
                            </Text>
                          </List.Item>
                        )
                      })}
                    </List>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
            <Text fz={11} c={"#fff"} ta={"center"}>
              &copy; {currentYear} Powered by{" "}
              <strong>
                <Anchor
                  href="https://digitaldesa.id"
                  target="_blank"
                  c={"unset"}
                  td={"unset"}
                  fz={"unset"}
                >
                  PT Digital Desa Indonesia
                </Anchor>
              </strong>
            </Text>
          </Stack>
          <Space h={80} />
        </Card>
      </Box>
      {/* End Mobile */}

      {/* Desktop */}
      <AppShell.Footer
        visibleFrom="sm"
        pos={"initial"}
        px={"xl"}
        bg={"transparent"}
        style={{ border: "none" }}
      >
        <Box
          style={() => ({
            backgroundImage: `linear-gradient(133.36deg, ${vars(
              "color-primary-5",
            )}, ${vars("color-primary-1")})`,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          })}
        >
          <Grid px={20} pt={60} pb={20} gutter={"md"} justify="space-between">
            <Grid.Col span={4}>
              <Stack>
                <Group>
                  <Image
                    w={100}
                    src={asset.logo300({ schema, file: profil.logoURL })}
                    alt="Logo"
                  />
                  <Box>
                    <Text
                      c="#fff"
                      size={"xl"}
                      fw={"bold"}
                    >{`${profil.alias.desa} ${profil.name.deskel}`}</Text>
                    <Text c="#fff" fz={"sm"} fw={"bold"}>
                      Kecamatan {profil.name.kecamatan}
                    </Text>
                    <Text c="#fff" fz={"sm"} fw={"bold"}>
                      Kabupaten {profil.name.kabkota}
                    </Text>
                    <Text c="#fff" fz={"sm"} fw={"bold"}>
                      Provinsi {profil.name.provinsi}
                    </Text>
                  </Box>
                </Group>
                <Stack gap={0}>
                  <Text fz={"lg"} fw={"bold"} c="#fff">
                    Social Media
                  </Text>
                  <Group>
                    <ActionIcon
                      variant="transparent"
                      component={
                        profil.socialMedia.facebook === "" ||
                        profil.socialMedia.facebook === "#"
                          ? "button"
                          : "a"
                      }
                      href={profil.socialMedia.facebook}
                      target="_blank"
                    >
                      <IconBrandFacebook
                        color={
                          profil.socialMedia.facebook === "" ||
                          profil.socialMedia.facebook === "#"
                            ? "gray"
                            : "#fff"
                        }
                        size={30}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="transparent"
                      component={
                        profil.socialMedia.instagram === "" ||
                        profil.socialMedia.instagram === "#"
                          ? "button"
                          : "a"
                      }
                      href={profil.socialMedia.instagram}
                      target="_blank"
                    >
                      <IconBrandInstagram
                        color={
                          profil.socialMedia.instagram === "" ||
                          profil.socialMedia.instagram === "#"
                            ? "gray"
                            : "#fff"
                        }
                        size={30}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="transparent"
                      component={
                        profil.socialMedia.twitter === "" ||
                        profil.socialMedia.twitter === "#"
                          ? "button"
                          : "a"
                      }
                      href={profil.socialMedia.twitter}
                      target="_blank"
                    >
                      <IconBrandX
                        color={
                          profil.socialMedia.twitter === "" ||
                          profil.socialMedia.twitter === "#"
                            ? "gray"
                            : "#fff"
                        }
                        size={30}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="transparent"
                      component={
                        profil.socialMedia.youtube === "" ||
                        profil.socialMedia.youtube === "#"
                          ? "button"
                          : "a"
                      }
                      href={profil.socialMedia.youtube}
                      target="_blank"
                    >
                      <IconBrandYoutube
                        color={
                          profil.socialMedia.youtube === "" ||
                          profil.socialMedia.youtube === "#"
                            ? "gray"
                            : "#fff"
                        }
                        size={30}
                      />
                    </ActionIcon>
                    <ActionIcon
                      variant="transparent"
                      component={
                        profil.socialMedia.tiktok === "" ||
                        profil.socialMedia.tiktok === "#"
                          ? "button"
                          : "a"
                      }
                      href={profil.socialMedia.tiktok}
                      target="_blank"
                    >
                      <IconBrandTiktok
                        color={
                          profil.socialMedia.tiktok === "" ||
                          profil.socialMedia.tiktok === "#"
                            ? "gray"
                            : "#fff"
                        }
                        size={30}
                      />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Stack>
            </Grid.Col>
            <Grid.Col span={3}>
              <Stack>
                <Text fz={"md"} c={"#fff"} fw={"bold"}>
                  Kontak {profil.alias.desa}
                </Text>
                <Group>
                  <ScrollArea h={200} offsetScrollbars type="always">
                    <List>
                      <List.Item icon={<IconPhone />}>
                        <Text
                          c={"#000"}
                          component="a"
                          href={`tel:${
                            profil.phone !== "" ? profil.phone : "-"
                          }`}
                          target="_blank"
                        >
                          {profil.phone !== "" ? profil.phone : "-"}
                        </Text>
                      </List.Item>
                      <List.Item icon={<IconMail />}>
                        <Text
                          c={"#000"}
                          component="a"
                          href={`mailto:${
                            profil.email !== "" ? profil.email : "-"
                          }`}
                          target="_blank"
                        >
                          {profil.email !== "" ? profil.email : "-"}
                        </Text>
                      </List.Item>
                      <List.Item icon={<IconClock />}>
                        {profil.workHour !== "" ? profil.workHour : "-"}
                      </List.Item>
                      <List.Item icon={<IconHome />}>
                        <Text
                          c={"#000"}
                          component={mainPOI ? "a" : "p"}
                          href={gMapLink}
                          target="_blank"
                        >
                          {profil.officeAddress !== ""
                            ? profil.officeAddress
                            : "-"}
                        </Text>
                      </List.Item>
                    </List>
                  </ScrollArea>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={2}>
              <Stack>
                <Text fz={"md"} c={"#fff"} fw={"bold"}>
                  Nomor Telepon Penting
                </Text>
                <Group>
                  <ScrollArea h={200} offsetScrollbars type="always">
                    <Stack>
                      {importantContacts.map((item, key) => {
                        return (
                          <Box key={key}>
                            <Text>{item.name}</Text>
                            <Text
                              c={"#000"}
                              component="a"
                              href={`tel:${item.contact}`}
                              target="_blank"
                            >
                              {item.contact}
                            </Text>
                          </Box>
                        )
                      })}
                    </Stack>
                  </ScrollArea>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={2}>
              <Stack>
                <Text fz={"md"} c={"#fff"} fw={"bold"}>
                  Jelajahi
                </Text>
                <Group>
                  <ScrollArea h={200} offsetScrollbars type="always">
                    <List>
                      {externalLinks.map((item, key) => {
                        return (
                          <List.Item key={key}>
                            <Text
                              c={"#000"}
                              component="a"
                              href={item.URL}
                              target="_blank"
                            >
                              {item.name}
                            </Text>
                          </List.Item>
                        )
                      })}
                    </List>
                  </ScrollArea>
                </Group>
              </Stack>
            </Grid.Col>
          </Grid>
          <Center bg={vars("color-primary-5")}>
            <Text c={"#fff"}>
              &copy; {currentYear} Powered by{" "}
              <strong>
                <Anchor
                  href="https://digitaldesa.id"
                  target="_blank"
                  c={"unset"}
                  td={"unset"}
                >
                  PT Digital Desa Indonesia
                </Anchor>
              </strong>
            </Text>
          </Center>
        </Box>
      </AppShell.Footer>
      {/* End Desktop */}
    </>
  )
}

export default AppFooter
