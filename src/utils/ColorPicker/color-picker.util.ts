import { THSVA } from "@foxy/types"

import { has, HSVtoHex, HSVtoHSL, HSVtoRGB } from "@foxy/utils"

export function stripAlpha (color: any, stripAlpha: boolean) {
    if (stripAlpha) {
        const { a, ...rest } = color

        return rest
    }

    return color
}

export function extractColor (color: THSVA, input: any) {
    if (input == null || typeof input === 'string') {
        const hex = HSVtoHex(color)

        if (color.a === 1) return hex.slice(0, 7)
        else return hex
    }

    if (typeof input === 'object') {
        let converted

        if (has(input, ['r', 'g', 'b'])) converted = HSVtoRGB(color)
        else if (has(input, ['h', 's', 'l'])) converted = HSVtoHSL(color)
        else if (has(input, ['h', 's', 'v'])) converted = color

        return stripAlpha(converted, !has(input, ['a']) && color.a === 1)
    }

    return color
}

export function hasAlpha (color: any) {
    if (!color) return false

    if (typeof color === 'string') {
        return color.length > 7
    }

    if (typeof color === 'object') {
        return has(color, ['a']) || has(color, ['alpha'])
    }

    return false
}
