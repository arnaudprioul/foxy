import { TAlign } from '@foxy/types'

export interface IAlignProps {
  align?: Record<string, TAlign>,
  alignSm?: Record<string, TAlign>,
  alignMd?: Record<string, TAlign>,
  alignLg?: Record<string, TAlign>,
  alignXl?: Record<string, TAlign>,
  alignXxl?: Record<string, TAlign>
}