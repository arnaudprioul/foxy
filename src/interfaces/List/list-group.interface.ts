import {
  IBorderProps,
  IMarginProps,
  IPaddingProps,
  IColorProps,
  ICommonsComponentProps,
  ITagProps,
  IRoundedProps
} from '@foxy/interfaces'

import { TIcon } from '@foxy/types'

export interface IListGroupProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps {
  collapseIcon?: TIcon
  expandIcon?: TIcon
  prependIcon?: TIcon
  appendIcon?: TIcon
  fluid?: boolean
  title?: string
  value?: any
}

export interface IListActivatorProps extends ICommonsComponentProps, ITagProps {
  id?: string,
}

export interface IListActivatorEvents {
  click?: () => void | undefined
  'click:once'?: () => void | undefined
}