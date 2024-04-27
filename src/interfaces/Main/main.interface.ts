import {
  IBorderProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export interface IMainProps extends ITagProps, ICommonsComponentProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps {
  scrollable?: boolean
}