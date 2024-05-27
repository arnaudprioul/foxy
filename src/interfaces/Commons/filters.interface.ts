import { TFilterFunction, TFilterKeyFunctions, TFilterKeys, TFilterMode } from '@foxy/types/Commons/filters.type.ts'

export interface IFiltersProps {
  customFilter?: TFilterFunction
  customKeyFilter?: TFilterKeyFunctions
  filterKeys: TFilterKeys
  filterMode: TFilterMode
  noFilter?: boolean,
}