import {
  IconEye,
  IconFileTypeDoc,
  IconFileTypeDocx,
  IconFileTypeJpg,
  IconFileTypePdf,
  IconFileTypePng,
  IconFileTypePpt,
  IconFileTypeXls,
} from "@tabler/icons-react"

interface Props {
  fileExt: string
  size: number | undefined
}

function PPIDFileTypes({ fileExt, size }: Props) {
  switch (fileExt) {
    case "jpg":
    case "jpeg":
      return <IconFileTypeJpg size={size} />

    case "png":
      return <IconFileTypePng size={size} />

    case "pdf":
      return <IconFileTypePdf size={size} />

    case "doc":
      return <IconFileTypeDoc size={size} />

    case "docx":
      return <IconFileTypeDocx size={size} />

    case "xls":
    case "xlsx":
      return <IconFileTypeXls size={size} />

    case "ppt":
    case "pptx":
      return <IconFileTypePpt size={size} />

    default:
      return <IconEye size={size} />
  }
}

export default PPIDFileTypes
