import { getCurrentScope, onScopeDispose, Ref, unref } from 'vue'

export function resolveUnref (r: Ref | Function) {
  return typeof r === 'function' ? r() : unref(r)
}

export function unrefElement (elRef: Ref) {
  let _a

  const plain = resolveUnref(elRef)

  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain
}

export function tryOnScopeDispose (fn: () => void) {
  if (getCurrentScope()) {
    onScopeDispose(fn)

    return true
  }

  return false
}