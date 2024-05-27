import { ISlideGroupProps, IGroupProvide } from "@foxy/interfaces";
import {
    BORDER_PROPS,
    COMMONS_COMPONENT_PROPS, DIRECTION_PROPS, DISPLAY_PROPS, GROUP_PROPS,
    MARGIN_PROPS,
    PADDING_PROPS,
    ROUNDED_PROPS,
    TAG_PROPS
} from "@foxy/consts";

import { InjectionKey } from "vue"

export const FOXY_SLIDE_GROUP_KEY: InjectionKey<IGroupProvide> = Symbol.for('foxy:slide-group')

export const SLIDE_GROUP_PROPS: ISlideGroupProps = {
    ...COMMONS_COMPONENT_PROPS,
    ...TAG_PROPS,
    ...ROUNDED_PROPS,
    ...BORDER_PROPS,
    ...MARGIN_PROPS,
    ...PADDING_PROPS,
    ...DIRECTION_PROPS,
    ...GROUP_PROPS,
    ...DISPLAY_PROPS,

    centerActive: undefined,
    nextIcon: undefined,
    prevIcon: undefined,
    showArrows: undefined
}
