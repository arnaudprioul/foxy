import {
  IBorderProps, IChipProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IFieldProps, IFiltersProps,
  IInputProps,
  IItemProps,
  IListProps,
  IMarginProps,
  IMenuProps,
  IPaddingProps,
  IRoundedProps,
  ITextFieldProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface ISelectProps extends ICommonsComponentProps, IColorProps, ITextFieldProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IItemProps, ITransitionComponentProps, IFiltersProps {
  chips?: boolean
  closableChips?: boolean
  eager?: boolean
  hideNoData?: boolean
  hideSelected?: boolean
  listProps?: IListProps
  menu?: boolean
  menuIcon?: TIcon
  menuProps?: IMenuProps
  chipProps?: IChipProps
  multiple?: boolean
  noDataText?: string
  openOnClear?: boolean

  autocomplete?: boolean
  autoSelectFirst?: boolean | string
  clearOnSelect?: boolean
  divider?: string
  search?: string
}