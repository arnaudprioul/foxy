import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IFiltersProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ISelectProps,
  ITextFieldProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

export interface IAutocompleteProps extends ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, ISelectProps, ITextFieldProps, IDensityProps, IFiltersProps, ITransitionComponentProps {
  autoSelectFirst?: boolean | string
  clearOnSelect?: boolean
  delimiters?: Array<string>
  search?: string
}