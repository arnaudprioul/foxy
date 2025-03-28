import { DEFAULT_MASK_REPLACERS, NEXT_CHAR_OPTIONAL } from "@foxy/consts"
import { IMaskDirectiveBinding, IMaskHtmlElement, IMaskReplaces } from "@foxy/interfaces"
import { isFunction, isString } from "@foxy/utils"

/**
 * Extracts first input element inside given html element (if any)
 *
 * @param el
 *
 * @returns [HTMLElement|HTMLInputElement]
 */
export const queryInputElementInside = (el: HTMLElement): HTMLElement | HTMLInputElement => (
    el instanceof HTMLInputElement
        ? el
        : el.querySelector('input') || el
)

export function updateMask (el: IMaskHtmlElement, binding: IMaskDirectiveBinding, maskReplacers) {
    const {value, modifiers} = binding
    const enabled = isMaskEnabled(value)

    if (!enabled) {

    }

    el._mask = el._mask ?? {}
    el._mask.enabled = enabled
    el._mask.pattern = value

    const mask = parseMask(value, maskReplacers);

    options.partiallyUpdate(el, {mask});
}

export function isMaskEnabled (value: any): value is true {
    return typeof value === 'undefined' || !!value
}

/**
 * @param inputMask
 * @param maskReplacers
 *
 * @returns [Array<RegExp>]
 */
export function parseMask (inputMask, maskReplacers) {
    if (Array.isArray(inputMask)) {
        return arrayMaskToRegExpMask(inputMask, maskReplacers);
    }
    if (isFunction(inputMask)) {
        return inputMask;
    }
    if (isString(inputMask) && inputMask.length > 0) {
        return stringMaskToRegExpMask(inputMask, maskReplacers);
    }
    return inputMask;
}

/**
 * @param mask
 * @param maskReplacers
 *
 * @returns [Array<RegExp>]
 */
function maskToRegExpMask (mask, maskReplacers = DEFAULT_MASK_REPLACERS) {
    return mask
        .map((char, index, array) => {
            const maskChar = maskReplacers[char] || char;
            const previousChar = array[index - 1];
            const previousMaskChar = maskReplacers[previousChar] || previousChar;
            if (maskChar === NEXT_CHAR_OPTIONAL) {
                return null;
            }
            if (previousMaskChar === NEXT_CHAR_OPTIONAL) {
                return makeRegexpOptional(castToRegexp(maskChar));
            }
            return maskChar;
        })
        .filter(Boolean);
}

/**
 * Converts mask from `v-mask` string format to `text-mask-core` format
 *
 * @param stringMask
 * @param maskReplacers
 *
 * @return [Array<RegExp>]
 */
export function stringMaskToRegExpMask (stringMask, maskReplacers = DEFAULT_MASK_REPLACERS) {
    return maskToRegExpMask(stringMask.split(''), maskReplacers);
}

/**
 * Converts mask from `v-mask` array format to `text-mask-core` format
 *
 * @param arrayMask
 * @param maskReplacers
 *
 * @return [Array<RegExp>]
 */
export function arrayMaskToRegExpMask (arrayMask: Array<string | RegExp>, maskReplacers: IMaskReplaces = DEFAULT_MASK_REPLACERS) {
    const flattenedMask = arrayMask
        .map((part: RegExp | string) => {
            if (part instanceof RegExp) {
                return part
            }

            if (typeof part === 'string') {
                return part.split('')
            }

            return null;
        })
        .filter(Boolean)
        .reduce((mask: Array<any>, part) => mask.concat(part), []);

    return maskToRegExpMask(flattenedMask, maskReplacers);
}

/**
 * Makes single-char regular express optional
 *
 * @example
 * /\d/ -> /\d?/
 *
 * @param charRegexp
 *
 * @return [RegExp]
 */
export function makeRegexpOptional(charRegexp: RegExp) {
    return stringToRegexp(
        charRegexp.toString()
            .replace(
                /.(\/)[gmiyus]{0,6}$/,
                (match) => match.replace('/', '?/')
            )
    )
}

/**
 * @example
 * '/abc/g' -> /abc/g
 *
 * @param str - stringified regexp
 *
 * @return [RegExp] - real regexp
 */
export function stringToRegexp(str: string) {
    const lastSlash = str.lastIndexOf('/')

    return new RegExp(
        str.slice(1, lastSlash),
        str.slice(lastSlash + 1)
    )
}
