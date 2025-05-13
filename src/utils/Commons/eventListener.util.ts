import { Ref, unref } from 'vue'

export function resolveUnref (r: Ref | (() => unknown)) {
    return typeof r === 'function' ? r() : unref(r)
}

export function unrefElement (elRef: Ref) {
    let _a

    const plain = resolveUnref(elRef)

    return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain
}
