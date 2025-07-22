import type {
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
} from "../../interfaces"

export interface IDatePickerProps extends ICommonsComponentProps, IColorProps, IBorderProps, IRoundedProps, IElevationProps, IPaddingProps, IMarginProps, IPickerProps, IDatePickerControlsProps, IDatePickerMonthProps, IDatePickerMonthsProps, IDatePickerYearsProps, IDatePickerHeaderProps {
    modelValue?: string | Date | Array<string | Date>
}
