import { IColorProps, ICommonsComponentProps, IDimensionProps } from "@foxy/interfaces"

export interface IDatePickerYearsProps extends ICommonsComponentProps, IColorProps, IDimensionProps {
    min?: unknown
    max?: unknown
    modelValue?: number
}
