import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, DENSITY_PROPS, RIPPLE_PROPS } from '@foxy/consts'

import { ISelectionControlGroupProps, ISelectionControlProps, ISelectionGroupContext } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

export const SELECTION_CONTROL_GROUP_PROPS: ISelectionControlGroupProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...DENSITY_PROPS,
  ...RIPPLE_PROPS,

  disabled: undefined,
  defaultsTarget: undefined,
  error: undefined,
  inline: undefined,
  falseIcon: undefined,
  trueIcon: undefined,
  multiple: undefined,
  name: undefined,
  readonly: undefined,
  modelValue: undefined,
  type: undefined,
  valueComparator: undefined
}

export const SELECTION_CONTROL_PROPS: ISelectionControlProps = {
  ...COMMONS_COMPONENT_PROPS,
  ...COLOR_PROPS,
  ...SELECTION_CONTROL_GROUP_PROPS,

  label: undefined,
  trueValue: undefined,
  falseValue: undefined,
  value: undefined,
  required: undefined
}

export const FOXY_SELECTION_CONTROL_GROUP_KEY: InjectionKey<ISelectionGroupContext> = Symbol.for('foxy:selection-control-group')