import { IGroupProvide } from "@foxy/interfaces";

import { InjectionKey } from "vue"

export const FOXY_SLIDE_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxy:slide-group')
