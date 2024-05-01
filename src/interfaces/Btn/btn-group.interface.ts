import {
  IBorderProps,
  IBtnProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

export interface IBtnGroupProps extends ITagProps, ICommonsComponentProps, IRoundedProps, IBorderProps, IDensityProps, IElevationProps, IColorProps {
  divided?: boolean
  items?: Array<IBtnProps>
}