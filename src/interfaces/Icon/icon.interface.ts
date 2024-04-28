import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  ISizeProps,
  ITagProps
} from '@foxy/interfaces'

import { TIcon, TIconComponent } from '@foxy/types'

export interface IIconProps {
  icon?: TIcon
}

export interface IIconComponentProps extends IIconProps, IColorProps, ICommonsComponentProps, ITagProps, ISizeProps, IPaddingProps, IMarginProps, IBorderProps {
  disabled?: Boolean
}

export interface IIconAliases {
  [name: string]: TIcon
  complete: TIcon
  cancel: TIcon
  close: TIcon
  delete: TIcon
  clear: TIcon
  success: TIcon
  info: TIcon
  warning: TIcon
  error: TIcon
  prev: TIcon
  next: TIcon
  checkboxOn: TIcon
  checkboxOff: TIcon
  checkboxIndeterminate: TIcon
  delimiter: TIcon
  sortAsc: TIcon
  sortDesc: TIcon
  expand: TIcon
  menu: TIcon
  subgroup: TIcon
  dropdown: TIcon
  radioOn: TIcon
  radioOff: TIcon
  edit: TIcon
  ratingEmpty: TIcon
  ratingFull: TIcon
  ratingHalf: TIcon
  loading: TIcon
  first: TIcon
  last: TIcon
  unfold: TIcon
  file: TIcon
  plus: TIcon
  minus: TIcon
  calendar: TIcon
}

export interface IIconSet {
  component: TIconComponent
}