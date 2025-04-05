import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ISizeProps,
  ITagProps,
  IStatusProps, ISrcObject
} from '@foxy/interfaces'

export interface IAvatarProps extends ICommonsComponentProps, IDensityProps, IRoundedProps, ISizeProps, ITagProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IStatusProps {
  start?: boolean,
  end?: boolean,
  image?: string | ISrcObject,
  text?: string,
}
