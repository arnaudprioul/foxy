import type { IGoToInstance } from "@foxui/interfaces"

import type { InjectionKey } from "vue"

export const FOXUI_GO_TO_KEY: InjectionKey<IGoToInstance> = Symbol.for('foxui:goto')
