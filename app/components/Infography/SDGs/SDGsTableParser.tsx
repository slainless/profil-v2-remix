import { Table, TableProps, TableTbody, TableTd, TableTr } from "@mantine/core"
import htmlParser, {
  HTMLReactParserOptions,
  domToReact,
} from "html-react-parser"
import { ElementType } from "htmlparser2"
import omit from "lodash.omit"

import { vars } from "#theme/artifact/vars.mjs"

function transformer(props: TableProps) {
  // @ts-expect-error ...
  const transform: NonNullable<HTMLReactParserOptions["transform"]> = (
    reactNode,
    domNode,
    index,
  ) => {
    if (domNode.type == ElementType.Tag) {
      switch (domNode.name) {
        case "tbody":
          // @ts-expect-error ...
          return domToReact(domNode.children, { transform })
        case "table":
          return (
            <Table {...omit(props, ["children"])}>
              <TableTbody>
                {/* @ts-expect-error ... */}
                {domToReact(domNode.children, { transform })}
              </TableTbody>
            </Table>
          )
        case "tr":
          if (index === 0) {
            return (
              <TableTr
                style={{
                  "--_tr-bg": vars("color-primary-3"),
                  "--_tr-hover-bg": vars("color-primary-3"),
                  "--_table-border-color": vars("color-primary-4"),
                }}
                c={vars("color-white")}
              >
                {/* @ts-expect-error ... */}
                {domToReact(domNode.children, { transform })}
              </TableTr>
            )
          }

          return (
            // @ts-expect-error ...
            <TableTr>{domToReact(domNode.children, { transform })}</TableTr>
          )
        case "td":
          return (
            // @ts-expect-error ...
            <TableTd>{domToReact(domNode.children, { transform })}</TableTd>
          )
      }
    }

    return reactNode
  }
  return transform
}

export const TableParser = (props: TableProps & { children: string }) => {
  return htmlParser(props.children, {
    transform: transformer(props),
  })
}
