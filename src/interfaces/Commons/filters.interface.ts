import { TFilterFunction, TFilterKeyFunctions, TFilterKeys, TFilterMode } from '@foxy/types'

export interface IFiltersProps {
  customFilter?: TFilterFunction
  customKeyFilter?: TFilterKeyFunctions
  filterKeys: TFilterKeys
  filterMode: Record<string, TFilterMode>
  noFilter?: boolean,
}