import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, DENSITY_PROPS, RIPPLE_PROPS } from '@foxy/consts'

import { ISelectionControlGroupProps } from '@foxy/interfaces'

export const SELECTION_CONTROL_GROUP_PROPS: ISelectionControlGroupProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...DENSITY_PROPS,
  ...RIPPLE_PROPS,

  disabled: undefined,
  error: undefined,
  inline: undefined,
  trueIcon: undefined,
  falseIcon: undefined,
  multiple: undefined,
  name: undefined,
  readonly: undefined,
  modelValue: undefined,
  type: undefined,
  valueComparator: undefined
}