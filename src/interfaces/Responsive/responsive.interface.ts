import {
  IBorderProps,
  ICommonsComponentProps,
  IDimensionProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps
} from '@foxy/interfaces'

export interface IResponsiveProps extends IDimensionProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps{
  aspectRatio?: string | number
  contentClass?: string
  inline?: boolean
}