import {
  IBorderProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps,
  IAdjacentProps
} from '@foxy/interfaces'

export interface ICardHeaderProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IPaddingProps, IMarginProps, IDensityProps, IAdjacentProps {
  subtitle?: string | number
  title?: string | number
}