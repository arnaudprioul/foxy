import {
  IBorderProps,
  ICommonsComponentProps,
  IElevationProps,
  IInputProps,
  IMarginProps,
  IPaddingProps,
  IRadioProps,
  IRoundedProps,
  ISelectionControlGroupProps
} from '@foxy/interfaces'

export interface IRadioGroupProps extends ICommonsComponentProps, Partial<Omit<IRadioProps, 'trueValue' | 'falseValue'>>, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IInputProps, Partial<Omit<ISelectionControlGroupProps, 'multiple'>> {

}