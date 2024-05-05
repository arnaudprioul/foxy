import { IScrollStrategyData, IScrollStrategyProps } from '@foxy/interfaces'
import { convertToUnit, requestNewFrame } from '@foxy/utils'
import { EffectScope, onScopeDispose } from 'vue'

export function getScrollParent (el?: HTMLElement, includeHidden = false) {
  while (el) {
    if (includeHidden ? isPotentiallyScrollable(el) : hasScrollbar(el)) return el
    el = el.parentElement!
  }

  return document.scrollingElement as HTMLElement
}

export function getScrollParents (el?: Element | null, stopAt?: Element | null) {
  const elements: Array<HTMLElement> = []

  if (stopAt && el && !stopAt.contains(el)) return elements

  while (el) {
    if (hasScrollbar(el)) elements.push(el as HTMLElement)
    if (el === stopAt) break
    el = el.parentElement!
  }

  return elements
}

export function hasScrollbar (el?: Element | null) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return style.overflowY === 'scroll' || (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
}

export function isPotentiallyScrollable (el?: Element | null) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) return false

  const style = window.getComputedStyle(el)
  return ['scroll', 'auto'].includes(style.overflowY)
}

export function closeScrollStrategy (data: IScrollStrategyData) {
  function onScroll (e: Event) {
    data.isActive.value = false
  }

  bindScroll(data.targetEl.value ?? data.contentEl.value, onScroll)
}

export function blockScrollStrategy (data: IScrollStrategyData, props: IScrollStrategyProps) {
  const offsetParent = data.root.value?.offsetParent
  const scrollElements = [...new Set([
    ...getScrollParents(data.targetEl.value, props.contained ? offsetParent : undefined),
    ...getScrollParents(data.contentEl.value, props.contained ? offsetParent : undefined),
  ])].filter(el => !el.classList.contains('foxy-overlay-scroll-blocked'))
  const scrollbarWidth = window.innerWidth - document.documentElement.offsetWidth

  const scrollableParent = (el => hasScrollbar(el) && el)(offsetParent || document.documentElement)
  if (scrollableParent) {
    data.root.value!.classList.add('foxy-overlay--scroll-blocked')
  }

  scrollElements.forEach((el, i) => {
    el.style.setProperty('--foxy-body-scroll-x', convertToUnit(-el.scrollLeft))
    el.style.setProperty('--foxy-body-scroll-y', convertToUnit(-el.scrollTop))

    if (el !== document.documentElement) {
      el.style.setProperty('--foxy-scrollbar-offset', convertToUnit(scrollbarWidth))
    }

    el.classList.add('foxy-overlay-scroll-blocked')
  })

  onScopeDispose(() => {
    scrollElements.forEach((el, i) => {
      const x = parseFloat(el.style.getPropertyValue('--foxy-body-scroll-x'))
      const y = parseFloat(el.style.getPropertyValue('--foxy-body-scroll-y'))

      const scrollBehavior = el.style.scrollBehavior

      el.style.scrollBehavior = 'auto'
      el.style.removeProperty('--foxy-body-scroll-x')
      el.style.removeProperty('--foxy-body-scroll-y')
      el.style.removeProperty('--foxy-scrollbar-offset')
      el.classList.remove('foxy-overlay-scroll-blocked')

      el.scrollLeft = -x
      el.scrollTop = -y

      el.style.scrollBehavior = scrollBehavior
    })
    if (scrollableParent) {
      data.root.value!.classList.remove('foxy-overlay--scroll-blocked')
    }
  })
}

export function repositionScrollStrategy (data: IScrollStrategyData, props: IScrollStrategyProps, scope: EffectScope) {
  let slow = false
  let raf = -1
  let ric = -1

  function update (e: Event) {
    requestNewFrame(() => {
      const start = performance.now()
      data.updateLocation.value?.(e)
      const time = performance.now() - start
      slow = time / (1000 / 60) > 2
    })
  }

  ric = (typeof requestIdleCallback === 'undefined' ? (cb: Function) => cb() : requestIdleCallback)(() => {
    scope.run(() => {
      bindScroll(data.targetEl.value ?? data.contentEl.value, e => {
        if (slow) {
          // If the position calculation is slow,
          // defer updates until scrolling is finished.
          // Browsers usually fire one scroll event per frame so
          // we just wait until we've got two frames without an event
          cancelAnimationFrame(raf)
          raf = requestAnimationFrame(() => {
            raf = requestAnimationFrame(() => {
              update(e)
            })
          })
        } else {
          update(e)
        }
      })
    })
  })

  onScopeDispose(() => {
    typeof cancelIdleCallback !== 'undefined' && cancelIdleCallback(ric)
    cancelAnimationFrame(raf)
  })
}

export function bindScroll (el: HTMLElement | undefined, onScroll: (e: Event) => void) {
  const scrollElements = [document, ...getScrollParents(el)]
  scrollElements.forEach(el => {
    el.addEventListener('scroll', onScroll, { passive: true })
  })

  onScopeDispose(() => {
    scrollElements.forEach(el => {
      el.removeEventListener('scroll', onScroll)
    })
  })
}
