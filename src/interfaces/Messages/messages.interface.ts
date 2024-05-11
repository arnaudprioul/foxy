import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps, IElevationProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

export interface IMessagesProps extends ICommonsComponentProps, ITagProps, ITransitionComponentProps, IColorProps, IBorderProps, IPaddingProps, IMarginProps, IRoundedProps, IDensityProps, IElevationProps {
  active?: boolean
  messages?: Array<string> | string
}
