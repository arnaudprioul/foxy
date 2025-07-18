import type { IColorProps, ICommonsComponentProps, ISelectionControlGroupProps } from '@origam/interfaces'

export interface ISelectionControlProps extends ICommonsComponentProps, Partial<Omit<ISelectionControlGroupProps, 'items'>>, IColorProps {
    label?: string
    trueValue?: any
    falseValue?: any
    value?: any
    required?: boolean
}
