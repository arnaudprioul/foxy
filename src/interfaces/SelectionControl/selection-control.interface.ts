import { IColorProps, ICommonsComponentProps, ISelectionControlGroupProps } from '@foxy/interfaces'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps {
  label?: string
  trueValue?: any
  falseValue?: any
  value?: any
  required?: boolean
}