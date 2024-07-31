import { TJustify } from '@foxy/types'

export interface IJustifyProps {
  justify?: Record<string, TJustify>,
  justifySm?: Record<string, TJustify>,
  justifyMd?: Record<string, TJustify>,
  justifyLg?: Record<string, TJustify>,
  justifyXl?: Record<string, TJustify>,
  justifyXxl?: Record<string, TJustify>
}