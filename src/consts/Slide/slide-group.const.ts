import type { IGroupProvide } from "@foxui/interfaces";

import type { InjectionKey } from "vue"

export const FOXUI_SLIDE_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxui:slide-group')
