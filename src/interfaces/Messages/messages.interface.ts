import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps,
  ITransitionComponentProps,
} from '@foxy/interfaces'

export interface IMessagesProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IDensityProps {
  active?: boolean
  messages?: Array<string> | string
}