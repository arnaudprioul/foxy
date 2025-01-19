import { ICalendarProps, IColorProps, ICommonsComponentProps } from "@foxy/interfaces"

import { TTransitionProps } from "@foxy/types"

export interface IDatePickerMonthProps extends ICommonsComponentProps, IColorProps, ICalendarProps {
    hideWeekdays?: boolean
    multiple?: boolean | 'range' | number | (string & {})
    showWeek?: boolean
    transition?: TTransitionProps
    reverseTransition?: TTransitionProps
}
