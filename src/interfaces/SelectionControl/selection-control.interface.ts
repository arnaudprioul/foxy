import { IColorProps, ICommonsComponentProps, ISelectionControlGroupProps } from '@foxy/interfaces'

import { TEventProp } from '@foxy/types'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps {
  label?: string
  trueValue?: any
  falseValue?: any
  value?: any
  required?: boolean

  'onClick:label'?: TEventProp
}