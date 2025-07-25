import type { IBox } from '../../interfaces'
import { Box } from '../../services'

export function nullifyTransforms (el: HTMLElement): IBox {
    const rect = el.getBoundingClientRect()
    const style = getComputedStyle(el)
    const tx = style.transform

    if (tx) {
        let ta, sx, sy, dx, dy
        if (tx.startsWith('matrix3d(')) {
            ta = tx.slice(9, -1).split(/, /)
            sx = +ta[0]
            sy = +ta[5]
            dx = +ta[12]
            dy = +ta[13]
        } else if (tx.startsWith('matrix(')) {
            ta = tx.slice(7, -1).split(/, /)
            sx = +ta[0]
            sy = +ta[3]
            dx = +ta[4]
            dy = +ta[5]
        } else {
            return new Box(rect)
        }

        const to = style.transformOrigin
        const x = rect.x - dx - (1 - sx) * parseFloat(to)
        const y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1))
        const w = sx ? rect.width / sx : el.offsetWidth + 1
        const h = sy ? rect.height / sy : el.offsetHeight + 1

        return new Box({x, y, width: w, height: h})
    } else {
        return new Box(rect)
    }
}

export function animate (
    el: Element,
    keyframes: Array<Keyframe> | PropertyIndexedKeyframes | null,
    options?: number | KeyframeAnimationOptions
) {
    if (typeof el.animate === 'undefined') return {finished: Promise.resolve()}

    let animation: Animation
    try {
        animation = el.animate(keyframes, options)
    } catch {
        return {finished: Promise.resolve()}
    }

    if (typeof animation.finished === 'undefined') {
        (animation as any).finished = new Promise(resolve => {
            animation.onfinish = () => {
                resolve(animation)
            }
        })
    }

    return animation
}
