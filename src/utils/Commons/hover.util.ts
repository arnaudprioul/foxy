import { FOXUI_HOVER_STOP_KEY, HOVER } from '@foxui/consts'

import type { IHoverDirectiveBinding, IHoverHtmlElement, IHoverOptions } from '@foxui/interfaces'

import type { THoverEvent } from '@foxui/types'

import { isObject, isTouchEvent } from '@foxui/utils'

export function updateHover (el: IHoverHtmlElement, binding: IHoverDirectiveBinding, wasEnabled: boolean, name: string) {
    const {value, modifiers} = binding
    const enabled = isHoverEnabled(value)
    const options: IHoverOptions = {class: `${name}--hover`}

    if (isObject(value) && value.class) {
        options.class = value.class
    }

    el._hover = el._hover ?? {}
    el._hover.enabled = enabled
    el._hover.class = options.class

    if (!enabled) {
        HOVER.hide(el, options)
    }

    if (enabled && !wasEnabled) {
        if (modifiers.stop) {
            el.addEventListener('touchstart', hoverStop, {passive: true})
            el.addEventListener('mouseenter', hoverStop)
            return
        }

        el.addEventListener('touchstart', hoverShow, {passive: true})
        el.addEventListener('touchend', hoverHide, {passive: true})
        el.addEventListener('touchcancel', hoverHide)

        el.addEventListener('mouseenter', hoverShow)
        el.addEventListener('mouseleave', hoverHide)
    } else if (!enabled && wasEnabled) {
        hoverRemoveListeners(el)
    }
}

export function isHoverEnabled (value: any): value is true {
    return typeof value === 'undefined' || !!value
}

export function hoverShow (e: THoverEvent) {
    const value: IHoverOptions = {class: ''}
    const element = e.currentTarget as IHoverHtmlElement | undefined

    if (!element?._hover || element._hover.touched || e[FOXUI_HOVER_STOP_KEY]) return

    // Don't allow the event to trigger ripples on any other elements
    e[FOXUI_HOVER_STOP_KEY] = true

    if (isTouchEvent(e)) {
        element._hover.touched = true
        element._hover.isTouch = true
    } else {
        // It's possible for touch events to fire
        // as mouse events on Android/iOS, this
        // will skip the event call if it has
        // already been registered as touch
        if (element._hover.isTouch) return
    }

    if (element._hover.class) {
        value.class = element._hover.class
    }

    HOVER.show(e, element, value)
}

export function hoverStop (e: THoverEvent) {
    e[FOXUI_HOVER_STOP_KEY] = true
}

export function hoverHide (e: Event) {
    const value: IHoverOptions = {class: ''}
    const element = e.currentTarget as IHoverHtmlElement | null

    if (!element?._hover) return

    if (element._hover.class) {
        value.class = element._hover.class
    }

    HOVER.hide(element, value)
}

export function hoverRemoveListeners (el: IHoverHtmlElement) {
    el.removeEventListener('mouseenter', hoverShow)
    el.removeEventListener('mouseleave', hoverHide)
    el.removeEventListener('touchstart', hoverShow)
    el.removeEventListener('touchend', hoverHide)
    el.removeEventListener('touchcancel', hoverHide)
}
