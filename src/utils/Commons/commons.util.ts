import { IN_BROWSER, ON_REGEX } from '@foxy/consts'

import { FOCUS_LOCATION } from '@foxy/enums'

import { TClientPosition, TFocusLocation, TMaybePick, TNotAUnion, TSelectItemKey, TTemplateRef } from '@foxy/types'

import { IfAny } from '@vue/shared'

import {
  capitalize,
  ComponentInternalInstance,
  ComponentPublicInstance,
  computed,
  ComputedGetter,
  Fragment,
  InjectionKey,
  MaybeRef,
  reactive,
  shallowRef,
  ToRefs,
  toRefs,
  unref,
  VNode,
  VNodeChild,
  watchEffect
} from 'vue'

export function convertToUnit (str: number, unit?: string): string
export function convertToUnit (str: string | number | null | undefined, unit?: string): string | undefined
export function convertToUnit (str: string | number | null | undefined, unit = 'px'): string | undefined {
  if (str == null || str === '') {
    return undefined
  } else if (isNaN(+str!)) {
    return String(str)
  } else if (!isFinite(+str!)) {
    return undefined
  } else {
    return `${Number(str)}${unit}`
  }
}

export function refElement (obj?: ComponentPublicInstance<any> | HTMLElement): HTMLElement | undefined {
  if (obj && '$el' in obj) {
    const el = obj.$el as HTMLElement

    if (el?.nodeType === Node.TEXT_NODE) {
      // Multi-root component, use the first element
      return el.nextElementSibling as HTMLElement
    }

    return el
  }

  return obj as HTMLElement
}

export function toKebabCase (str = '') {
  if (toKebabCase.cache.has(str)) return toKebabCase.cache.get(str)!
  const kebab = str
      .replace(/[^a-z]/gi, '-')
      .replace(/\B([A-Z])/g, '-$1')
      .toLowerCase()
  toKebabCase.cache.set(str, kebab)
  return kebab
}

toKebabCase.cache = new Map<string, string>()

export function findChildrenWithProvide (
    key: InjectionKey<any> | symbol,
    vnode?: VNodeChild,
): Array<ComponentInternalInstance> {
  if (!vnode || typeof vnode !== 'object') return []

  if (Array.isArray(vnode)) {
    return vnode.map(child => findChildrenWithProvide(key, child)).flat(1)
  } else if (Array.isArray(vnode.children)) {
    return vnode.children.map(child => findChildrenWithProvide(key, child)).flat(1)
  } else if (vnode.component) {
    if (Object.getOwnPropertySymbols(vnode.component.provides).includes(key as symbol)) {
      return [vnode.component]
    } else if (vnode.component.subTree) {
      return findChildrenWithProvide(key, vnode.component.subTree).flat(1)
    }
  }

  return []
}

export function destructComputed<T extends object> (getter: ComputedGetter<T & TNotAUnion<T>>): ToRefs<T>
export function destructComputed<T extends object> (getter: ComputedGetter<T>) {
  const refs = reactive({}) as T
  const base = computed(getter)
  watchEffect(() => {
    for (const key in base.value) {
      refs[key] = base.value[key]
    }
  }, { flush: 'sync' })
  return toRefs(refs)
}

export function padEnd (str: string, length: number, char = '0') {
  return str + char.repeat(Math.max(0, length - str.length))
}

export function padStart (str: string, length: number, char = '0') {
  return char.repeat(Math.max(0, length - str.length)) + str
}

export function clamp (value: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, value))
}

export function getDecimals (value: number) {
  const trimmedStr = value.toString().trim()
  return trimmedStr.includes('.')
      ? (trimmedStr.length - trimmedStr.indexOf('.') - 1)
      : 0
}

export function chunk (str: string, size = 1) {
  const chunked: Array<string> = []
  let index = 0
  while (index < str.length) {
    chunked.push(str.substr(index, size))
    index += size
  }
  return chunked
}

export function has<T extends string> (obj: object, key: Array<T>): obj is Record<T, unknown> {
  return key.every(k => obj.hasOwnProperty(k))
}

export function oops (): never {
  throw new Error()
}

export function noop () {
}

export function debounce (fn: Function, delay: MaybeRef<number>) {
  let timeoutId = 0 as any
  const wrap = (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), unref(delay))
  }
  wrap.clear = () => {
    clearTimeout(timeoutId)
  }
  wrap.immediate = fn
  return wrap
}

export function deepEqual (a: any, b: any): boolean {
  if (a === b) return true

  if (
      a instanceof Date &&
      b instanceof Date &&
      a.getTime() !== b.getTime()
  ) {
    // If the values are Date, compare them as timestamps
    return false
  }

  if (a !== Object(a) || b !== Object(b)) {
    // If the values aren't objects, they were already checked for equality
    return false
  }

  const props = Object.keys(a)

  if (props.length !== Object.keys(b).length) {
    // Different number of props, don't bother to check
    return false
  }

  return props.every(p => deepEqual(a[p], b[p]))
}

export function getPropertyFromItem (item: any, property: TSelectItemKey, fallback?: any): any {
  if (property === true) return item === undefined ? fallback : item

  if (property == null || typeof property === 'boolean') return fallback

  if (item !== Object(item)) {
    if (typeof property !== 'function') return fallback

    const value = property(item, fallback)

    return typeof value === 'undefined' ? fallback : value
  }

  if (typeof property === 'string') return getObjectValueByPath(item, property, fallback)

  if (Array.isArray(property)) return getNestedValue(item, property, fallback)

  if (typeof property !== 'function') return fallback

  const value = property(item, fallback)

  return typeof value === 'undefined' ? fallback : value
}

export function getObjectValueByPath (obj: any, path?: string | null, fallback?: any): any {
  if (obj == null || !path || typeof path !== 'string') return fallback
  if (obj[path] !== undefined) return obj[path]

  path = path.replace(/\[(\w+)\]/g, '.$1') // convert indexes to properties
  path = path.replace(/^\./, '') // strip a leading dot

  return getNestedValue(obj, path.split('.'), fallback)
}

export function getNestedValue (obj: any, path: Array<(string | number)>, fallback?: any): any {
  const last = path.length - 1

  if (last < 0) return obj === undefined ? fallback : obj

  for (let i = 0; i < last; i++) {
    if (obj == null) {
      return fallback
    }
    obj = obj[path[i]]
  }

  if (obj == null) return fallback

  return obj[path[last]] === undefined ? fallback : obj[path[last]]
}

export function keys<O extends {}> (o: O) {
  return Object.keys(o) as (keyof O)[]
}

export function omit<
    T extends object,
    U extends Extract<keyof T, string>
> (obj: T, exclude: Array<U>): Omit<T, U> {
  const clone = { ...obj }

  exclude.forEach(prop => delete clone[prop])

  return clone
}

export function only<
    T extends object,
    U extends Extract<keyof T, string>
> (obj: T, include: Array<U>): Pick<T, U> {
  const clone = {} as T

  include.forEach(prop => clone[prop] = obj[prop])

  return clone
}

export function pick<
    T extends object,
    U extends Extract<keyof T, string>
> (obj: T, paths: Array<U>): TMaybePick<T, U> {
  const found: any = {}

  const keys = new Set(Object.keys(obj))
  for (const path of paths) {
    if (keys.has(path)) {
      found[path] = obj[path]
    }
  }

  return found
}

export function pickWithout<
    T extends object,
    U extends Extract<keyof T, string>,
    E extends Extract<keyof T, string>
> (obj: T, include: Array<U>, exclude: Array<E>): Partial<T> {
  return omit(pick(obj, include), exclude)
}

export function pickWithRest<
    T extends object,
    U extends Extract<keyof T, string>,
    E extends Extract<keyof T, string>
> (obj: T, paths: Array<(U | RegExp)>, exclude?: Array<E>): [yes: Partial<T>, no: Partial<T>] {
  const found = Object.create(null)
  const rest = Object.create(null)

  for (const key in obj) {
    if (
        paths.some(path => path instanceof RegExp
            ? path.test(key)
            : path === key
        ) && !exclude?.some(path => path === key)
    ) {
      found[key] = obj[key]
    } else {
      rest[key] = obj[key]
    }
  }

  return [found, rest]
}

export function focusChild (el: Element, location?: TFocusLocation) {
  const focusable = focusableChildren(el)

  if (!location) {
    if (el === document.activeElement || !el.contains(document.activeElement)) {
      focusable[0]?.focus()
    }
  } else if (location === FOCUS_LOCATION.FIRST) {
    focusable[0]?.focus()
  } else if (location === FOCUS_LOCATION.LAST) {
    focusable.at(-1)?.focus()
  } else if (typeof location === 'number') {
    focusable[location]?.focus()
  } else {
    const _el = getNextElement(focusable, location)
    if (_el) _el.focus()
    else focusChild(el, location === FOCUS_LOCATION.NEXT ? FOCUS_LOCATION.FIRST : FOCUS_LOCATION.LAST)
  }
}

export function focusableChildren (el: Element, filterByTabIndex = true) {
  const targets = ['button', '[href]', 'input:not([type="hidden"])', 'select', 'textarea', '[tabindex]']
      .map(s => `${s}${filterByTabIndex ? ':not([tabindex="-1"])' : ''}:not([disabled])`)
      .join(', ')
  return [...el.querySelectorAll(targets)] as Array<HTMLElement>
}

export function getNextElement (elements: Array<HTMLElement>, location?: 'next' | 'prev', condition?: (el: HTMLElement) => boolean) {
  let _el
  let idx = elements.indexOf(document.activeElement as HTMLElement)
  const inc = location === FOCUS_LOCATION.NEXT ? 1 : -1
  do {
    idx += inc
    _el = elements[idx]
  } while ((!_el || _el.offsetParent == null || !(condition?.(_el) ?? true)) && idx < elements.length && idx >= 0)
  return _el
}

export function humanReadableFileSize (bytes: number, base: 1000 | 1024 = 1000): string {
  if (bytes < base) {
    return `${bytes} B`
  }

  const prefix = base === 1024 ? ['Ki', 'Mi', 'Gi'] : ['k', 'M', 'G']
  let unit = -1
  while (Math.abs(bytes) >= base && unit < prefix.length - 1) {
    bytes /= base
    ++unit
  }
  return `${bytes.toFixed(1)} ${prefix[unit]}B`
}

export function hasEvent (props: Record<string, any>, name: string) {
  name = 'on' + capitalize(name)
  return !!(props[name] || props[`${name}Once`] || props[`${name}Capture`] || props[`${name}OnceCapture`] || props[`${name}CaptureOnce`])
}

export function flattenFragments (nodes: Array<VNode>): Array<VNode> {
  return nodes?.map((node) => {
    if (node.type === Fragment) {
      return flattenFragments(node.children as Array<VNode>)
    } else {
      return node
    }
  }).flat()
}

export function isObject (obj: any): obj is object {
  return obj !== null && typeof obj === 'object' && !Array.isArray(obj)
}

export function mergeDeep (
    source: Record<string, any> = {},
    target: Record<string, any> = {},
    arrayFn?: (a: Array<unknown>, b: Array<unknown>) => Array<unknown>,
) {
  const out: Record<string, any> = {}

  for (const key in source) {
    out[key] = source[key]
  }

  for (const key in target) {
    const sourceProperty = source[key]
    const targetProperty = target[key]

    // Only continue deep merging if
    // both properties are objects
    if (
        isObject(sourceProperty) &&
        isObject(targetProperty)
    ) {
      out[key] = mergeDeep(sourceProperty, targetProperty, arrayFn)

      continue
    }

    if (Array.isArray(sourceProperty) && Array.isArray(targetProperty) && arrayFn) {
      out[key] = arrayFn(sourceProperty, targetProperty)

      continue
    }

    out[key] = targetProperty
  }

  return out
}

export function defer (timeout: number, cb: () => void) {
  if (!IN_BROWSER || timeout === 0) {
    cb()

    return () => {
    }
  }

  const timeoutId = window.setTimeout(cb, timeout)

  return () => window.clearTimeout(timeoutId)
}

export function matchesSelector (el: Element | undefined, selector: string): boolean | null {
  const supportsSelector = IN_BROWSER &&
      typeof CSS !== 'undefined' &&
      typeof CSS.supports !== 'undefined' &&
      CSS.supports(`selector(${selector})`)

  if (!supportsSelector) return null

  try {
    return !!el && el.matches(selector)
  } catch (err) {
    return null
  }
}

export function isOn (key: string) {
  return ON_REGEX.test(key)
}

export function eventName (propName: string) {
  return propName[2].toLowerCase() + propName.slice(3)
}

export function wrapInArray<T> (
    v: T | null | undefined
): T extends Readonly<Array<any>>
    ? IfAny<T, Array<T>, T>
    : Array<NonNullable<T>> {
  return v == null
      ? []
      : Array.isArray(v)
          ? v as any : [v]
}

export function templateRef () {
  const el = shallowRef<HTMLElement | ComponentPublicInstance | null>()
  const fn = (target: HTMLElement | ComponentPublicInstance | null) => {
    el.value = target
  }
  Object.defineProperty(fn, 'value', {
    enumerable: true,
    get: () => el.value,
    set: val => el.value = val,
  })
  Object.defineProperty(fn, 'el', {
    enumerable: true,
    get: () => refElement(el.value),
  })

  return fn as TTemplateRef
}

export function getPosition (e: MouseEvent | TouchEvent, position: TClientPosition): number {
  if ('touches' in e && e.touches.length) return e.touches[0][position]

  else if ('changedTouches' in e && e.changedTouches.length) return e.changedTouches[0][position]

  else return (e as MouseEvent)[position]
}

export function addWindowListener (event: string, listener: EventListenerOrEventListenerObject, onUnmountedCleanupFns: any = []) {
  window.addEventListener(event, listener)

  const removeListener = () => window.removeEventListener(event, listener)

  onUnmountedCleanupFns.push(removeListener)

  return () => {
    removeListener()
    onUnmountedCleanupFns.splice(onUnmountedCleanupFns.indexOf(removeListener), 1)
  }
}
