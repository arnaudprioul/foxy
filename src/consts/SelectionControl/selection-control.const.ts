import { COLOR_PROPS, COMMONS_COMPONENT_PROPS, SELECTION_CONTROL_GROUP_PROPS } from '@foxy/consts'

import { ISelectionControlProps, ISelectionGroupContext } from '@foxy/interfaces'

import { InjectionKey } from 'vue'

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