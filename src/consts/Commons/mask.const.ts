import { IMaskNextCharOptional, IMaskReplaces } from "@foxy/interfaces"

/**
 * A special object to identify next character as optional
 * For example `?`
 *
 * @type {Object}
 */
export const NEXT_CHAR_OPTIONAL: IMaskNextCharOptional = {
    __nextCharOptional__: true,
};

/**
 * @type {MaskReplaces}
 */
export const DEFAULT_MASK_REPLACERS: IMaskReplaces = {
    '#': /\d/,
    A: /[a-z]/i,
    N: /[a-z0-9]/i,
    '?': NEXT_CHAR_OPTIONAL,
    X: /./,
};
