import { TCalendarStrategy } from "@foxy/types"

export interface ICalendarProps {
    allowedDates?: Array<unknown> | ((date: unknown) => boolean)
    disabled?: boolean
    displayValue?: unknown
    date?: Array<unknown>
    month?: number | string
    max?: unknown
    min?: unknown
    showAdjacentMonths?: boolean
    year?: number | string
    weekdays?: Array<number>
    weeksInMonth?: TCalendarStrategy
    firstDayOfWeek?: number | string
}
