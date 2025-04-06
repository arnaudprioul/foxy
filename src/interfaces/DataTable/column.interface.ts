import { ALIGN } from '@foxy/enums'
import { ICommonsComponentProps, IDimensionProps, IPaddingProps, ITagProps } from '@foxy/interfaces'

export interface IDataTableColumnProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IPaddingProps {
  align?: ALIGN.START | ALIGN.END | ALIGN.CENTER
  fixed?: boolean
  fixedOffset?: number | string
  lastFixed?: boolean
  nowrap?: boolean
}
