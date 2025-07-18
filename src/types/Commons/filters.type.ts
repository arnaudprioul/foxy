import { FILTERS_MODE } from '@origam/enums'

import type { IInternalItem } from '@origam/interfaces'

export type TFilterMatch = boolean | number | [number, number] | [number, number][]
export type TFilterFunction = (value: string, query: string, item?: IInternalItem) => TFilterMatch
export type TFilterKeyFunctions = Record<string, TFilterFunction>
export type TFilterKeys = string | string[]
export type TFilterMode = `${FILTERS_MODE}`
