import { DATE_2000_JUNARY_SUNDAY, FIRST_DAY, REGEX_DATE_YYYY_MM_DD } from "@foxy/consts"

import { IDateAdapter, IDateOptions, ILocaleInstance } from "@foxy/interfaces"
import { DateAdapter } from "@foxy/services"
import { TCustomDateFormat } from "@foxy/types"

import { createRange, padStart } from "@foxy/utils"

import { reactive, watch } from "vue"

export function createInstance (options: IDateOptions, locale: ILocaleInstance) {
    const instance = reactive(
        typeof options.adapter === 'function'
            // eslint-disable-next-line new-cap
            ? new options.adapter({
                locale: options.locale[locale.current.value] ?? locale.current.value,
                formats: options.formats
            })
            : options.adapter
    )

    watch(locale.current, value => {
        instance.locale = options.locale[value] ?? value ?? instance.locale
    })

    return instance
}

export function date (value?: any): Date | null {
    if (value == null) return new Date()

    if (value instanceof Date) return value

    if (typeof value === 'string') {
        let parsed

        if (REGEX_DATE_YYYY_MM_DD.test(value)) {
            return parseLocalDate(value)
        } else {
            parsed = Date.parse(value)
        }

        if (!isNaN(parsed)) return new Date(parsed)
    }

    return null
}

export function parseLocalDate (value: string): Date {
    const parts = value.split('-').map(Number)

    // new Date() uses local time zone when passing individual date component values
    return new Date(parts[0], parts[1] - 1, parts[2])
}

export function toISO (adapter: IDateAdapter<any>, value: Date) {
    const date = adapter.toJsDate(value)
    const year = date.getFullYear()
    const month = padStart(String(date.getMonth() + 1), 2, '0')
    const day = padStart(String(date.getDate()), 2, '0')

    return `${year}-${month}-${day}`
}

export function parseISO (value: string) {
    const [year, month, day] = value.split('-').map(Number)

    return new Date(year, month - 1, day)
}

export function addMinutes (date: Date, amount: number) {
    const d = new Date(date)

    d.setMinutes(d.getMinutes() + amount)

    return d
}

export function addHours (date: Date, amount: number) {
    const d = new Date(date)

    d.setHours(d.getHours() + amount)

    return d
}

export function addDays (date: Date, amount: number) {
    const d = new Date(date)

    d.setDate(d.getDate() + amount)

    return d
}

export function addWeeks (date: Date, amount: number) {
    const d = new Date(date)

    d.setDate(d.getDate() + (amount * 7))

    return d
}

export function addMonths (date: Date, amount: number) {
    const d = new Date(date)

    d.setDate(1)
    d.setMonth(d.getMonth() + amount)

    return d
}

export function getYear (date: Date) {
    return date.getFullYear()
}

export function getMonth (date: Date) {
    return date.getMonth()
}

export function getDate (date: Date) {
    return date.getDate()
}

export function getNextMonth (date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 1)
}

export function getPreviousMonth (date: Date) {
    return new Date(date.getFullYear(), date.getMonth() - 1, 1)
}

export function getHours (date: Date) {
    return date.getHours()
}

export function getMinutes (date: Date) {
    return date.getMinutes()
}

export function startOfYear (date: Date) {
    return new Date(date.getFullYear(), 0, 1)
}

export function endOfYear (date: Date) {
    return new Date(date.getFullYear(), 11, 31)
}

export function isWithinRange (date: Date, range: [Date, Date]) {
    return isAfter(date, range[0]) && isBefore(date, range[1])
}

export function isValid (date: any) {
    const d = new Date(date)

    return d instanceof Date && !isNaN(d.getTime())
}

export function isAfter (date: Date, comparing: Date) {
    return date.getTime() > comparing.getTime()
}

export function isAfterDay (date: Date, comparing: Date): boolean {
    return isAfter(startOfDay(date), startOfDay(comparing))
}

export function isBefore (date: Date, comparing: Date) {
    return date.getTime() < comparing.getTime()
}

export function isEqual (date: Date, comparing: Date) {
    return date.getTime() === comparing.getTime()
}

export function isSameDay (date: Date, comparing: Date) {
    return date.getDate() === comparing.getDate() &&
        date.getMonth() === comparing.getMonth() &&
        date.getFullYear() === comparing.getFullYear()
}

export function isSameMonth (date: Date, comparing: Date) {
    return date.getMonth() === comparing.getMonth() &&
        date.getFullYear() === comparing.getFullYear()
}

export function isSameYear (date: Date, comparing: Date) {
    return date.getFullYear() === comparing.getFullYear()
}

export function getDiff (date: Date, comparing: Date | string, unit?: string) {
    const d = new Date(date)
    const c = new Date(comparing)

    switch (unit) {
        case 'years':
            return d.getFullYear() - c.getFullYear()
        case 'quarters':
            return Math.floor((d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12) / 4)
        case 'months':
            return d.getMonth() - c.getMonth() + (d.getFullYear() - c.getFullYear()) * 12
        case 'weeks':
            return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24 * 7))
        case 'days':
            return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60 * 24))
        case 'hours':
            return Math.floor((d.getTime() - c.getTime()) / (1000 * 60 * 60))
        case 'minutes':
            return Math.floor((d.getTime() - c.getTime()) / (1000 * 60))
        case 'seconds':
            return Math.floor((d.getTime() - c.getTime()) / 1000)
        default: {
            return d.getTime() - c.getTime()
        }
    }
}

export function setHours (date: Date, count: number) {
    const d = new Date(date)

    d.setHours(count)

    return d
}

export function setMinutes (date: Date, count: number) {
    const d = new Date(date)

    d.setMinutes(count)

    return d
}

export function setMonth (date: Date, count: number) {
    const d = new Date(date)

    d.setMonth(count)

    return d
}

export function setDate (date: Date, day: number) {
    const d = new Date(date)

    d.setDate(day)

    return d
}

export function setYear (date: Date, year: number) {
    const d = new Date(date)

    d.setFullYear(year)

    return d
}

export function startOfDay (date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)
}

export function endOfDay (date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999)
}

export function getWeekArray (date: Date, locale: string, firstDayOfWeek?: number) {
    const weeks = []
    let currentWeek = []
    const firstDayOfMonth = startOfMonth(date)
    const lastDayOfMonth = endOfMonth(date)
    const first = firstDayOfWeek ?? FIRST_DAY[locale.slice(-2).toUpperCase()] ?? 0
    const firstDayWeekIndex = (firstDayOfMonth.getDay() - first + 7) % 7
    const lastDayWeekIndex = (lastDayOfMonth.getDay() - first + 7) % 7

    for (let i = 0; i < firstDayWeekIndex; i++) {
        const adjacentDay = new Date(firstDayOfMonth)
        adjacentDay.setDate(adjacentDay.getDate() - (firstDayWeekIndex - i))
        currentWeek.push(adjacentDay)
    }

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const day = new Date(date.getFullYear(), date.getMonth(), i)

        // Add the day to the current week
        currentWeek.push(day)

        // If the current week has 7 days, add it to the weeks array and start a new week
        if (currentWeek.length === 7) {
            weeks.push(currentWeek)
            currentWeek = []
        }
    }

    for (let i = 1; i < 7 - lastDayWeekIndex; i++) {
        const adjacentDay = new Date(lastDayOfMonth)
        adjacentDay.setDate(adjacentDay.getDate() + i)
        currentWeek.push(adjacentDay)
    }

    if (currentWeek.length > 0) {
        weeks.push(currentWeek)
    }

    return weeks
}

export function startOfWeek (date: Date, locale: string, firstDayOfWeek?: number) {
    const day = firstDayOfWeek ?? FIRST_DAY[locale.slice(-2).toUpperCase()] ?? 0
    const d = new Date(date)

    while (d.getDay() !== day) {
        d.setDate(d.getDate() - 1)
    }

    return d
}

export function endOfWeek (date: Date, locale: string) {
    const d = new Date(date)
    const lastDay = ((FIRST_DAY[locale.slice(-2).toUpperCase()] ?? 0) + 6) % 7

    while (d.getDay() !== lastDay) {
        d.setDate(d.getDate() + 1)
    }

    return d
}

export function startOfMonth (date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function endOfMonth (date: Date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0)
}

export function formatDate (
    value: Date,
    formatString: string,
    locale: string,
    formats?: Record<string, TCustomDateFormat>
): string {
    const newDate = date(value) ?? new Date()
    const customFormat = formats?.[formatString]

    if (typeof customFormat === 'function') {
        return customFormat(newDate, formatString, locale)
    }

    let options: Intl.DateTimeFormatOptions = {}
    switch (formatString) {
        case 'fullDate':
            options = {year: 'numeric', month: 'long', day: 'numeric'}
            break
        case 'fullDateWithWeekday':
            options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
            break
        case 'normalDate':
            const day = newDate.getDate()
            const month = new Intl.DateTimeFormat(locale, {month: 'long'}).format(newDate)
            return `${day} ${month}`
        case 'normalDateWithWeekday':
            options = {weekday: 'short', day: 'numeric', month: 'short'}
            break
        case 'shortDate':
            options = {month: 'short', day: 'numeric'}
            break
        case 'year':
            options = {year: 'numeric'}
            break
        case 'month':
            options = {month: 'long'}
            break
        case 'monthShort':
            options = {month: 'short'}
            break
        case 'monthAndYear':
            options = {month: 'long', year: 'numeric'}
            break
        case 'monthAndDate':
            options = {month: 'long', day: 'numeric'}
            break
        case 'weekday':
            options = {weekday: 'long'}
            break
        case 'weekdayShort':
            options = {weekday: 'short'}
            break
        case 'dayOfMonth':
            return new Intl.NumberFormat(locale).format(newDate.getDate())
        case 'hours12h':
            options = {hour: 'numeric', hour12: true}
            break
        case 'hours24h':
            options = {hour: 'numeric', hour12: false}
            break
        case 'minutes':
            options = {minute: 'numeric'}
            break
        case 'seconds':
            options = {second: 'numeric'}
            break
        case 'fullTime':
            options = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}
            break
        case 'fullTime12h':
            options = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}
            break
        case 'fullTime24h':
            options = {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false}
            break
        case 'fullDateTime':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            }
            break
        case 'fullDateTime12h':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            }
            break
        case 'fullDateTime24h':
            options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }
            break
        case 'keyboardDate':
            options = {year: 'numeric', month: '2-digit', day: '2-digit'}
            break
        case 'keyboardDateTime':
            options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }
            break
        case 'keyboardDateTime12h':
            options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: true
            }
            break
        case 'keyboardDateTime24h':
            options = {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false
            }
            break
        default:
            options = customFormat ?? {timeZone: 'UTC', timeZoneName: 'short'}
    }

    return new Intl.DateTimeFormat(locale, options).format(newDate)
}

export function getWeekdays (locale: string, firstDayOfWeek?: number) {
    const daysFromSunday = firstDayOfWeek ?? FIRST_DAY[locale.slice(-2).toUpperCase()] ?? 0

    return createRange(7)
        .map((i) => {
            const weekday = new Date(DATE_2000_JUNARY_SUNDAY)

            weekday.setDate(DATE_2000_JUNARY_SUNDAY.getDate() + daysFromSunday + i)

            return new Intl.DateTimeFormat(locale, {weekday: 'narrow'}).format(weekday)
        })
}

export function getWeek (adapter: DateAdapter<any>, value: any) {
    const date = adapter.toJsDate(value)
    let year = date.getFullYear()
    let d1w1 = new Date(year, 0, 1)

    if (date < d1w1) {
        year = year - 1
        d1w1 = new Date(year, 0, 1)
    } else {
        const tv = new Date(year + 1, 0, 1)
        if (date >= tv) {
            year = year + 1
            d1w1 = tv
        }
    }

    const diffTime = Math.abs(date.getTime() - d1w1.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    return Math.floor(diffDays / 7) + 1
}
