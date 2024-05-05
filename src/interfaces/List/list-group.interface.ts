import {
  IBorderProps,
  IMarginProps,
  IPaddingProps,
  IColorProps,
  ICommonsComponentProps,
  ITagProps,
  IRoundedProps, IAdjacentProps
} from '@foxy/interfaces'

import { TEventProp, TIcon } from '@foxy/types'

export interface IListGroupProps extends ITagProps, ICommonsComponentProps, IColorProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IAdjacentProps {
  collapseIcon?: TIcon
  expandIcon?: TIcon
  fluid?: boolean
  title?: string
  value?: any
}

export interface IListActivatorProps extends ICommonsComponentProps, ITagProps {
}

export interface IListActivatorEvents {
  onClick?: TEventProp | undefined
  'onClick:once'?: TEventProp | undefined
}