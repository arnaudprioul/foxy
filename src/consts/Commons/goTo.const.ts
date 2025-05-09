import type { IGoToInstance } from "@foxy/interfaces"

import type { InjectionKey } from "vue"

export const FOXY_GO_TO_KEY: InjectionKey<IGoToInstance> = Symbol.for('foxy:goto')
