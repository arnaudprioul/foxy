import { DEFAULT_DISPLAY_OPTIONS, IN_BROWSER, SUPPORTS_TOUCH } from '@foxy/consts'

import { IDisplayOptions, IDisplayPlatform, IInternalDisplayOptions } from '@foxy/interfaces'

import { TSSROptions } from '@foxy/types'

import { mergeDeep } from '@foxy/utils'

export function parseDisplayOptions (options: IDisplayOptions = DEFAULT_DISPLAY_OPTIONS) {
  return mergeDeep(DEFAULT_DISPLAY_OPTIONS, options) as IInternalDisplayOptions
}

export function getClientWidth (ssr?: TSSROptions) {
  return IN_BROWSER && !ssr
      ? window.innerWidth
      : (typeof ssr === 'object' && ssr.clientWidth) || 0
}

export function getClientHeight (ssr?: TSSROptions) {
  return IN_BROWSER && !ssr
      ? window.innerHeight
      : (typeof ssr === 'object' && ssr.clientHeight) || 0
}

export function getPlatform (ssr?: TSSROptions): IDisplayPlatform {
  const userAgent = IN_BROWSER && !ssr
      ? window.navigator.userAgent
      : 'ssr'

  function match (regexp: RegExp) {
    return Boolean(userAgent.match(regexp))
  }

  const android = match(/android/i)
  const ios = match(/iphone|ipad|ipod/i)
  const cordova = match(/cordova/i)
  const electron = match(/electron/i)
  const chrome = match(/chrome/i)
  const edge = match(/edge/i)
  const firefox = match(/firefox/i)
  const opera = match(/opera/i)
  const win = match(/win/i)
  const mac = match(/mac/i)
  const linux = match(/linux/i)

  return {
    android,
    ios,
    cordova,
    electron,
    chrome,
    edge,
    firefox,
    opera,
    win,
    mac,
    linux,
    touch: SUPPORTS_TOUCH,
    ssr: userAgent === 'ssr',
  }
}