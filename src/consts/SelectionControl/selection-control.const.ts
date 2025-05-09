import type { ISelectionGroupContext } from "@foxy/interfaces"
import type { InjectionKey } from 'vue'

export const FOXY_SELECTION_CONTROL_GROUP_KEY: InjectionKey<ISelectionGroupContext> = Symbol.for('foxy:selection-control-group')
