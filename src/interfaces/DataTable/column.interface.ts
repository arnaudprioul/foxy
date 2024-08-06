import { ALIGN } from '@foxy/enums'
import { ICommonsComponentProps, IDimensionProps, IPaddingProps, ITagProps } from '@foxy/interfaces'

import { TAlign } from '@foxy/types'

export interface IDataTableColumnProps extends ICommonsComponentProps, ITagProps, IDimensionProps, IPaddingProps {
  align?: Record<string, Omit<TAlign, ALIGN.BASELINE | ALIGN.STRETCH>>
  fixed?: boolean
  fixedOffset?: number | string
  lastFixed?: boolean
  nowrap?: boolean
}