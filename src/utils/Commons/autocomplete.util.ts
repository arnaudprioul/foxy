import { COMPOSITION_IGNORE_KEYS } from '@/consts'

export function isComposingIgnoreKey (e: KeyboardEvent): boolean {
    return e.isComposing && COMPOSITION_IGNORE_KEYS.includes(e.key as typeof COMPOSITION_IGNORE_KEYS[number])
}
