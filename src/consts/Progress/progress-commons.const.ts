import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, MARGIN_PROPS, PADDING_PROPS, TAG_PROPS } from '@foxy/consts'
import {
  IColorProps,
  ICommonsComponentProps,
  IMarginProps,
  IPaddingProps,
  IProgressTypeProps,
  ITagProps
} from '@foxy/interfaces'

export const PROGRESS_TYPE_PROPS :IProgressTypeProps = {
  ...COLOR_PROPS as IColorProps,
  ...COMMONS_COMPONENT_PROPS as ICommonsComponentProps,
  ...TAG_PROPS as ITagProps,
  ...PADDING_PROPS as IPaddingProps,
  ...MARGIN_PROPS as IMarginProps,

  indeterminate: undefined,
  modelValue: undefined,
  thickness: undefined,
  active: undefined,
  absolute: undefined,
  max: undefined,
  striped: undefined
}