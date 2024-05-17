import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IElevationProps,
  IFieldProps,
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

export interface ISelectProps extends ICommonsComponentProps, IColorProps, ITextFieldProps, IDensityProps, IFieldProps, IInputProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IItemProps, ITransitionComponentProps {
  chips?: boolean
  closableChips?: boolean
  eager?: boolean
  hideNoData?: boolean
  hideSelected?: boolean
  listProps?: IListProps
  menu?: boolean
  menuIcon?: TIcon
  menuProps?: IMenuProps
  multiple?: boolean
  noDataText?: string
  openOnClear?: boolean
}