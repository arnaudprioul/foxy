import { computed } from "vue"
import { useDate, useVModel } from "../../composables"
import type { ICalendarProps, IDay } from "../../interfaces"
import { DateAdapter } from "../../services"
import { getWeek, wrapInArray } from "../../utils"

export function useCalendar (props: ICalendarProps) {
    const adapter = useDate()
    const model = useVModel(
        props,
        'date',
        [],
        (v) => wrapInArray(v)
    )
    const year = useVModel(
        props,
        'year',
        undefined,
        (v) => {
            const value = v != null ? Number(v) : adapter.getYear(displayValue.value)

            return adapter.startOfYear(adapter.setYear(adapter.date(), value))
        },
        (v) => adapter.getYear(v)
    )
    const month = useVModel(
        props,
        'month',
        undefined,
        (v) => {
            const value = v != null ? Number(v) : adapter.getMonth(displayValue.value)
            const date = adapter.setYear(adapter.startOfMonth(adapter.date()), adapter.getYear(year.value))

            return adapter.setMonth(date, value)
        },
        (v) => adapter.getMonth(v)
    )

    const displayValue = computed(() => {
        if (props.displayValue) return adapter.date(props.displayValue)
        if (model.value.length > 0) return adapter.date(model.value[0])
        if (props.min) return adapter.date(props.min)
        if (Array.isArray(props.allowedDates)) return adapter.date(props.allowedDates[0])

        return adapter.date()
    })
    const weekDays = computed(() => {
        const firstDayOfWeek = Number(props.firstDayOfWeek ?? 0)

        return props.weekdays?.map((day) => (day + firstDayOfWeek) % 7)
    })
    const weeksInMonth = computed(() => {
        const weeks = adapter.getWeekArray(month.value, props.firstDayOfWeek)

        const days = weeks.flat()

        // Make sure there's always 6 weeks in month (6 * 7 days)
        // if weeksInMonth is 'static'
        const daysInMonth = 6 * 7

        if (props.weeksInMonth === 'static' && days.length < daysInMonth) {
            const lastDay = days[days.length - 1]

            let week = []
            for (let day = 1; day <= daysInMonth - days.length; day++) {
                week.push(adapter.addDays(lastDay, day))

                if (day % 7 === 0) {
                    weeks.push(week)
                    week = []
                }
            }
        }

        return weeks
    })
    const daysInWeek = computed(() => {
        const lastDay = adapter.startOfWeek(displayValue.value, props.firstDayOfWeek)
        const week = []

        for (let day = 0; day <= 6; day++) {
            week.push(adapter.addDays(lastDay, day))
        }

        const today = adapter.date()

        return genDays(week, today)
    })
    const daysInMonth = computed(() => {
        const days = weeksInMonth.value.flat()
        const today = adapter.date() as Date

        return genDays(days, today)
    })
    const weekNumbers = computed(() => {
        return weeksInMonth.value.map(week => {
            return week.length ? getWeek(adapter as DateAdapter, week[0]) : null
        })
    })

    const genDays = (days: unknown[], today: unknown): Array<IDay> => {
        return days
            .filter((date) => {
                return weekDays.value?.includes(adapter.toJsDate(date).getDay())
            })
            .map((date, index) => {
                const isoDate = adapter.toISO(date)
                const isAdjacent = !adapter.isSameMonth(date, month.value)
                const isStart = adapter.isSameDay(date, adapter.startOfMonth(month.value))
                const isEnd = adapter.isSameDay(date, adapter.endOfMonth(month.value))
                const isSame = adapter.isSameDay(date, month.value)

                return {
                    date,
                    isoDate,
                    formatted: adapter.format(date, 'keyboardDate'),
                    year: adapter.getYear(date),
                    month: adapter.getMonth(date),
                    isDisabled: isDisabled(date),
                    isWeekStart: index % 7 === 0,
                    isWeekEnd: index % 7 === 6,
                    isToday: adapter.isSameDay(date, today),
                    isAdjacent,
                    isHidden: isAdjacent && !props.showAdjacentMonths,
                    isStart,
                    isSelected: model.value.some(value => adapter.isSameDay(date, value)),
                    isEnd,
                    isSame,
                    localized: adapter.format(date, 'dayOfMonth')
                }
            })
    }
    const isDisabled = (value: unknown) => {
        if (props.disabled) return true

        const date = adapter.date(value)

        if (props.min && adapter.isAfter(adapter.date(props.min), date)) return true
        if (props.max && adapter.isAfter(date, adapter.date(props.max))) return true

        if (Array.isArray(props.allowedDates) && props.allowedDates.length > 0) {
            return !props.allowedDates.some(d => adapter.isSameDay(adapter.date(d), date))
        }

        if (typeof props.allowedDates === 'function') {
            return !props.allowedDates(date)
        }

        return false
    }

    return {
        displayValue,
        daysInMonth,
        daysInWeek,
        genDays,
        model,
        weeksInMonth,
        weekDays,
        weekNumbers
    }
}
