import type { IBox } from '@foxui/interfaces'
import { Box } from '@foxui/services'

export function getOverflow (a: IBox, b: IBox) {
    return {
        x: {
            before: Math.max(0, b.left - a.left),
            after: Math.max(0, a.right - b.right)
        },
        y: {
            before: Math.max(0, b.top - a.top),
            after: Math.max(0, a.bottom - b.bottom)
        }
    }
}

export function getTargetBox (target: HTMLElement | [x: number, y: number]): IBox | DOMRect {
    if (Array.isArray(target)) {
        return new Box({
            x: target[0],
            y: target[1],
            width: 0,
            height: 0
        })
    } else {
        return target.getBoundingClientRect()
    }
}
