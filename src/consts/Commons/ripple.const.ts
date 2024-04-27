import { IRippleElement, IRippleHtmlElement, IRippleOptions, IRippleProps } from '@foxy/interfaces'

import { TRippleEvent } from '@foxy/types'

import { calculate, rippleTransform } from '@foxy/utils'

export const FOXY_RIPPLE_STOP_KEY = Symbol('rippleStop')

export const DELAY_RIPPLE = 80

export const KEYCODES = Object.freeze({
  enter: 13,
  tab: 9,
  delete: 46,
  esc: 27,
  space: 32,
  up: 38,
  down: 40,
  left: 37,
  right: 39,
  end: 35,
  home: 36,
  del: 46,
  backspace: 8,
  insert: 45,
  pageup: 33,
  pagedown: 34,
  shift: 16,
})

export const RIPPLES = {
  /* eslint-disable max-statements */
  show (
      e: TRippleEvent,
      el: IRippleHtmlElement,
      value: IRippleOptions = {}
  ) {
    if (!el?._ripple?.enabled) {
      return
    }

    const container = document.createElement('span')
    const animation = document.createElement('span')

    container.appendChild(animation)
    container.className = 'foxy-ripple__container'

    if (value.class) {
      container.className += ` ${value.class}`
    }

    const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value)

    const size = `${radius * 2}px`
    animation.className = 'foxy-ripple__animation'
    animation.style.width = size
    animation.style.height = size

    el.appendChild(container)

    const computed = window.getComputedStyle(el)
    if (computed && computed.position === 'static') {
      el.style.position = 'relative'
      el.dataset.previousPosition = 'static'
    }

    animation.classList.add('foxy-ripple__animation--enter')
    animation.classList.add('foxy-ripple__animation--visible')
    rippleTransform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`)
    animation.dataset.activated = String(performance.now())

    setTimeout(() => {
      animation.classList.remove('foxy-ripple__animation--enter')
      animation.classList.add('foxy-ripple__animation--in')
      rippleTransform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`)
    }, 0)
  },

  hide (el: IRippleHtmlElement | null) {
    if (!el?._ripple?.enabled) return

    const ripples = el.getElementsByClassName('foxy-ripple__animation')

    if (ripples.length === 0) return
    const animation: IRippleElement = ripples[ripples.length - 1]

    if (animation.dataset?.isHiding) return
    else animation.dataset!.isHiding = 'true'

    const diff = performance.now() - Number(animation.dataset!.activated)
    const delay = Math.max(250 - diff, 0)

    setTimeout(() => {
      animation.classList.remove('foxy-ripple__animation--in')
      animation.classList.add('foxy-ripple__animation--out')

      setTimeout(() => {
        const ripples = el.getElementsByClassName('foxy-ripple__animation')
        if (ripples.length === 1 && el.dataset.previousPosition) {
          el.style.position = el.dataset.previousPosition
          delete el.dataset.previousPosition
        }

        if (animation.parentNode?.parentNode === el) el.removeChild(animation.parentNode)
      }, 300)
    }, delay)
  },
}

export const RIPPLE_PROPS: IRippleProps = {
  ripple: undefined
}