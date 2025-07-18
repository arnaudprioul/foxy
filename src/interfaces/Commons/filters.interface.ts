import type { TFilterFunction, TFilterKeyFunctions, TFilterKeys, TFilterMode } from '@foxui/types'

export interface IFiltersProps {
    customFilter?: TFilterFunction
    customKeyFilter?: TFilterKeyFunctions
    filterKeys: TFilterKeys
    filterMode: TFilterMode
    noFilter?: boolean,
}
