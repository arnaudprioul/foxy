import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'


export interface IToolbarProps extends ITagProps, ICommonsComponentProps, IBorderProps, IRoundedProps, IElevationProps, IDensityProps, IColorProps, IPaddingProps, IMarginProps {
  absolute?: boolean
  collapse?: boolean
  flat?: boolean
  floating?: boolean
  height?: number | string
  title?: string
  modelValue?: boolean
  image?: string
}