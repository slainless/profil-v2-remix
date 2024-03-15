import { Button } from "@mantine/core"
import { IconBrandWhatsapp } from "@tabler/icons-react"

import { vars } from "#theme/artifact/vars.mjs"

export const WhatsappContactButton = (props: { number: string }) => {
  return (
    <Button
      variant="filled"
      color={vars("color-primary-6")}
      leftSection={<IconBrandWhatsapp />}
      component="a"
      href={`https://api.whatsapp.com/send?phone=62${props.number}&text=Saya%20Tertarik%20dengan%20jualan%20Anda`}
      target="_blank"
    >
      Hubungi Penjual
    </Button>
  )
}
