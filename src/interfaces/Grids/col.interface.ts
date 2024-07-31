import {
  IAlignProps,
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  ITagProps
} from '@foxy/interfaces'

import { TCols } from '@foxy/types'

export interface IColProps extends IColorProps, ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IAlignProps {
  cols?: Record<string, TCols | 'auto'>,
  sm?: Record<string, TCols | 'auto'>,
  md?: Record<string, TCols | 'auto'>,
  lg?: Record<string, TCols | 'auto'>,
  xl?: Record<string, TCols | 'auto'>,
  xxl?: Record<string, TCols | 'auto'>,
  offset?: Omit<Record<string, TCols>, '12'>,
  offsetSm?: Omit<Record<string, TCols>, '12'>,
  offsetMd?: Omit<Record<string, TCols>, '12'>,
  offsetLg?: Omit<Record<string, TCols>, '12'>,
  offsetXl?: Omit<Record<string, TCols>, '12'>,
  offsetXxl?: Omit<Record<string, TCols>, '12'>,
  order?: Record<string, number>,
  orderSm?: Record<string, number>,
  orderMd?: Record<string, number>,
  orderLg?: Record<string, number>,
  orderXl?: Record<string, number>,
  orderXxl?: Record<string, number>,
}