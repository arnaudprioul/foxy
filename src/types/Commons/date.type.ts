import type { IDateAdapter } from "@origam/interfaces"

export type TCustomDateFormat =
    Intl.DateTimeFormatOptions
    | ((date: Date, formatString: string, locale: string) => string)

export type TAdapter = object

export type TInternalAdapter = object extends TAdapter ? IDateAdapter : TAdapter
