import type { ICalendarProps, IColorProps, ICommonsComponentProps } from "@foxy/interfaces"

import type { TTransitionProps } from "@foxy/types"

export interface IDatePickerMonthProps extends ICommonsComponentProps, IColorProps, ICalendarProps {
    hideWeekdays?: boolean
    multiple?: boolean | number | (string & {})
    range?: boolean
    showWeek?: boolean
    transition?: TTransitionProps
    reverseTransition?: TTransitionProps
}
