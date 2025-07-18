import type { ISelectionGroupContext } from "@foxui/interfaces"
import type { InjectionKey } from 'vue'

export const FOXUI_SELECTION_CONTROL_GROUP_KEY: InjectionKey<ISelectionGroupContext> = Symbol.for('foxui:selection-control-group')
