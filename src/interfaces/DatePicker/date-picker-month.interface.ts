import type { ICalendarProps, IColorProps, ICommonsComponentProps } from "@origam/interfaces"

import type { TTransitionProps } from "@origam/types"

export interface IDatePickerMonthProps extends ICommonsComponentProps, IColorProps, ICalendarProps {
    hideWeekdays?: boolean
    multiple?: boolean | number | (string & {})
    range?: boolean
    showWeek?: boolean
    transition?: TTransitionProps
    reverseTransition?: TTransitionProps
}
