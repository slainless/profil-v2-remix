import { TextInput, TextInputProps } from "@mantine/core"
import { useUncontrolled } from "@mantine/hooks"
import { IconSearch } from "@tabler/icons-react"

export interface SearchInputProps
  extends Omit<Controllable<string>, "onChange">,
    Omit<TextInputProps, "value" | "defaultValue"> {
  onSearch?: (e: string) => void
}

export function SearchInput({
  value,
  defaultValue,
  onSearch,
  onChange,
  ...rest
}: SearchInputProps) {
  const [_value, handleChange] = useUncontrolled<string>({
    value,
    defaultValue,
    onChange: onSearch,
  })
  return (
    <TextInput
      placeholder="Telusuri Peta"
      rightSection={<IconSearch size={16} />}
      onChange={(e) => {
        handleChange(e.target.value)
        onChange?.(e)
      }}
      value={_value}
      {...rest}
    />
  )
}
