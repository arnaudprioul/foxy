import { IColorProps, ICommonsComponentProps, ISizeProps } from '@foxy/interfaces'

import { TAlways } from '@foxy/types'

export interface IRangeSliderTickProps extends ICommonsComponentProps, IColorProps, ISizeProps {
  show?: TAlways
  items?: Array<number> | Record<number, string>
}