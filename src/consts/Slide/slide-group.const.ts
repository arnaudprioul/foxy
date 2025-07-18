import type { IGroupProvide } from "@foxy/interfaces";

import type { InjectionKey } from "vue"

export const FOXY_SLIDE_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxy:slide-group')
