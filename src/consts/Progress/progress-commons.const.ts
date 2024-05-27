import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, MARGIN_PROPS, PADDING_PROPS, TAG_PROPS } from '@foxy/consts'

import { IProgressTypeProps } from '@foxy/interfaces'

export const PROGRESS_TYPE_PROPS :IProgressTypeProps = {
  ...COLOR_PROPS,
  ...COMMONS_COMPONENT_PROPS,
  ...TAG_PROPS,
  ...PADDING_PROPS,
  ...MARGIN_PROPS,

  indeterminate: undefined,
  modelValue: undefined,
  thickness: undefined,
  active: undefined,
  absolute: undefined,
  max: undefined,
  striped: undefined
}