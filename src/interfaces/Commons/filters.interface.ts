import type { TFilterFunction, TFilterKeyFunctions, TFilterKeys, TFilterMode } from '@origam/types'

export interface IFiltersProps {
    customFilter?: TFilterFunction
    customKeyFilter?: TFilterKeyFunctions
    filterKeys: TFilterKeys
    filterMode: TFilterMode
    noFilter?: boolean,
}
