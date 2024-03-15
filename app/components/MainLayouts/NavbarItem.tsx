import { Box, Menu, Group, Anchor, Text } from "@mantine/core"
import { Link } from "@remix-run/react"
import { IconChevronDown } from "@tabler/icons-react"
import { useAtomValue } from "jotai"
import { render } from "micromustache"

import { vars } from "#theme/artifact/vars.mjs"

import { aliasDesaAtom } from "#providers/profile.ts"

import styles from "./NavbarItem.module.css"
import { NavbarRoute } from "./navbar-menu.ts"

interface Props {
  onClick(): void

  pathname: string
  item: NavbarRoute
  isTransparent: boolean
}

export const NavbarItem = ({
  pathname,
  onClick,
  item,
  isTransparent,
}: Props) => {
  const aliasDesa = useAtomValue(aliasDesaAtom)
  const isActive = pathname === item.href ? true : undefined
  if (item.hrefs == null)
    return (
      <Anchor
        key={item.title + (item.href ?? "")}
        component={Link}
        to={item.href ?? "#"}
        // className={isActive ? underlinedItemStyle : hoveredItemStyle}
        className={styles.navbarItem}
        onClick={onClick}
        data-is-active={isActive}
      >
        <Text
          c={{ sm: isTransparent ? vars("color-white") : vars("color-white") }}
          fz={{ sm: "sm", md: "md", lg: "lg" }}
          fw="bold"
        >
          {render(item.title, { alias: aliasDesa })}
        </Text>
      </Anchor>
    )

  return (
    // eslint-disable-next-line react/jsx-key
    <Box visibleFrom="sm" key={render(item.title, { alias: aliasDesa })}>
      <Menu
        key={render(item.title, { alias: aliasDesa })}
        trigger="hover"
        // transitionProps={{ exitDuration: 0 }}
        // offset={28}
        // width={"100%"}
        // withinPortal
      >
        <Menu.Target>
          <Anchor
            className={styles.navbarItem}
            href={item.href ?? "#"}
            onClick={(event) => item.href != null && event.preventDefault()}
            td={"none"}
            data-is-active={isActive}
          >
            {/* <Text
              c={isTransparent ? vars("color-white") : vars("color-black")}
              fw={"bold"}
              fz={{ sm: "sm", md: "md", lg: "lg" }}
            >
              {item.title}
            </Text> */}
            <Group gap={0}>
              <Text
                c={isTransparent ? vars("color-white") : vars("color-black")}
                fw={"bold"}
                fz={{ sm: "sm", md: "md", lg: "lg" }}
              >
                {render(item.title, { alias: aliasDesa })}
              </Text>
              <IconChevronDown
                size="1rem"
                stroke={2}
                color={
                  isTransparent ? vars("color-white") : vars("color-black")
                }
              />
            </Group>
          </Anchor>
        </Menu.Target>
        <Menu.Dropdown pb={"md"}>
          {/* <Group justify="space-between" gap={0}>
            <Menu.Label>
              <Title size={24}>Bumdes</Title>
              <Image
                w={300}
                src={
                  "https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg"
                }
                alt="other"
              />
            </Menu.Label>
            <Menu.Label>
              <Title size={24}>Galeri Desa</Title>
              <Image
                w={300}
                src={
                  "https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg"
                }
                alt="other"
              />
            </Menu.Label>
            <Menu.Label>
              <Title size={24}>Potensi Desa</Title>
              <Image
                w={300}
                src={
                  "https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg"
                }
                alt="other"
              />
            </Menu.Label>
            <Menu.Label>
              <Title size={24}>Wisata Desa</Title>
              <Image
                w={300}
                src={
                  "https://3.bp.blogspot.com/-hUt5FrdZHio/VcLb5dlwTBI/AAAAAAAAGCU/UUH5N1JkoQc/s1600/images1.jpg"
                }
                alt="other"
              />
            </Menu.Label>
          </Group> */}
          {item.hrefs.map((href) => {
            // const isActive = pathname === href.href
            return (
              <Menu.Item key={href.href}>
                <Anchor
                  component={Link}
                  to={href.href ?? "#"}
                  c={vars("color-black")}
                  fw="bold"
                  onClick={onClick}
                >
                  {href.title}
                </Anchor>
              </Menu.Item>
            )
          })}
        </Menu.Dropdown>
      </Menu>
    </Box>
  )
}
