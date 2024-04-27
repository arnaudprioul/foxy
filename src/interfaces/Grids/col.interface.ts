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
  cols?: TCols | 'auto',
  sm?: TCols | 'auto',
  md?: TCols | 'auto',
  lg?: TCols | 'auto',
  xl?: TCols | 'auto',
  xxl?: TCols | 'auto',
  offset?: Omit<TCols, '12'>,
  offsetSm?: Omit<TCols, '12'>,
  offsetMd?: Omit<TCols, '12'>,
  offsetLg?: Omit<TCols, '12'>,
  offsetXl?: Omit<TCols, '12'>,
  offsetXxl?: Omit<TCols, '12'>,
  order?: TCols,
  orderSm?: TCols,
  orderMd?: TCols,
  orderLg?: TCols,
  orderXl?: TCols,
  orderXxl?: TCols,
}