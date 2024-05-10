import { IGoToInstance } from "@foxy/interfaces"

import { InjectionKey } from "vue"

export const FOXY_GO_TO_KEY: InjectionKey<IGoToInstance> = Symbol.for('foxy:goto')
