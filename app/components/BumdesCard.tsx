import { Text, Card, Overlay, Button, List } from "@mantine/core"
import { Link } from "@remix-run/react"

import classes from "./BumdesCard.module.css"

type Props = {
  title: string
  thumbnail?: string
  description: string
  slug: string
}

export function BumdesCard({ title, thumbnail, slug }: Props) {
  return (
    <Card
      radius="md"
      className={classes.card}
      style={{
        backgroundImage: `url(${thumbnail})`,
      }}
    >
      <Overlay className={classes.overlay} opacity={0.55} zIndex={0} />

      <div className={classes.content}>
        <Text size="lg" fw={700} className={classes.title}>
          {title}
        </Text>
        <List c={"#fff"} withPadding>
          <List.Item>
            Unit Usaha: Perdagangan Besar Padi dan Palawija, Industri Air Minum
            dan Air Mineral, Pengelolaan Pasar
          </List.Item>
          <List.Item>Pendapatan: Rp22.000.000,00</List.Item>
          <List.Item>Penanggung Jawab: Fahmy Nd</List.Item>
        </List>

        <Button
          pos={"absolute"}
          bottom={20}
          right={20}
          variant="white"
          color="dark"
          size="sm"
          component={Link}
          to={`/bumdes/${slug}`}
        >
          Lihat Detail
        </Button>
      </div>
    </Card>
  )
}
