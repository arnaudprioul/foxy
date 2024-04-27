import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export interface IListSubheader extends ICommonsComponentProps, ITagProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps {
  inset?: boolean,
  sticky?: boolean,
  title?: string,
}