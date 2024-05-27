import {
  IBorderProps, IColorProps,
  ICommonsComponentProps, IDensityProps, IElevationProps, IInputProps, ILoaderProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps, ISelectionControlProps,
  ITagProps
} from '@foxy/interfaces'

export interface ISwitchProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IInputProps, ISelectionControlProps, ILoaderProps, IColorProps, IDensityProps, IElevationProps {
  indeterminate?: boolean
  inset?: boolean
  flat?: boolean
}