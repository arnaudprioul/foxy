import type { IGoToInstance } from "@origam/interfaces"

import type { InjectionKey } from "vue"

export const ORIGAM_GO_TO_KEY: InjectionKey<IGoToInstance> = Symbol.for('origam:goto')
