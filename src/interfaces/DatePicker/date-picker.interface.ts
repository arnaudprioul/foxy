import {
    IBorderProps,
    IColorProps,
    ICommonsComponentProps,
    IDatePickerControlsProps,
    IDatePickerHeaderProps,
    IDatePickerMonthProps,
    IDatePickerMonthsProps,
    IDatePickerYearsProps,
    IElevationProps,
    IMarginProps,
    IPaddingProps,
    IPickerProps,
    IRoundedProps
} from "@foxy/interfaces"

export interface IDatePickerProps extends ICommonsComponentProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IDatePickerControlsProps, Omit<IDatePickerMonthProps, 'disabled' | 'modelValue'>, Omit<IDatePickerMonthsProps, 'modelValue'>, Omit<IDatePickerYearsProps, 'modelValue'>, IDatePickerHeaderProps {
    modelValue?: string | Date
}
