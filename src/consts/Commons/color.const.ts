import { HSLtoRGB, HSVtoRGB } from '@foxy/utils'

export const CSS_COLOR_REGEX = /^(?<fn>(?:rgb|hsl)a?)\((?<values>.+)\)/

export const COLOR_MAPPERS = {
  rgb: (r: number, g: number, b: number, a?: number) => ({ r, g, b, a }),
  rgba: (r: number, g: number, b: number, a?: number) => ({ r, g, b, a }),
  hsl: (h: number, s: number, l: number, a?: number) => HSLtoRGB({ h, s, l, a }),
  hsla: (h: number, s: number, l: number, a?: number) => HSLtoRGB({ h, s, l, a }),
  hsv: (h: number, s: number, v: number, a?: number) => HSVtoRGB({ h, s, v, a }),
  hsva: (h: number, s: number, v: number, a?: number) => HSVtoRGB({ h, s, v, a }),
}

export const SRGB_FORWARD_MATRIX = [
  [3.2406, -1.5372, -0.4986],
  [-0.9689, 1.8758, 0.0415],
  [0.0557, -0.2040, 1.0570],
]
export const SRGB_REVERSE_MATRIX = [
  [0.4124, 0.3576, 0.1805],
  [0.2126, 0.7152, 0.0722],
  [0.0193, 0.1192, 0.9505],
]
export const SRGB_FORWARD_TRANSFORM = (C: number): number => (
C <= 0.0031308
    ? C * 12.92
: 1.055 * C ** (1 / 2.4) - 0.055
)
export const SRGB_REVERSE_TRANSFORM = (C: number): number => (
    C <= 0.04045
        ? C / 12.92
        : ((C + 0.055) / 1.055) ** 2.4
)
export const COLOR_DELTA = 0.20689655172413793 // 6÷29
export const CIELAB_FORWARD_TRANSFORM = (t: number): number => (
    t > COLOR_DELTA ** 3
        ? Math.cbrt(t)
        : (t / (3 * COLOR_DELTA ** 2)) + 4 / 29
)
export const CIELAB_REVERSE_TRANSFORM = (t: number): number => (
    t > COLOR_DELTA
        ? t ** 3
        : (3 * COLOR_DELTA ** 2) * (t - 4 / 29)
)
export const MAIN_TRC = 2.4

export const RCO = 0.2126729
export const GCO = 0.7151522
export const BCO = 0.0721750

export const NORM_BG = 0.55
export const REV_BG = 0.62
export const NORM_TXT = 0.58
export const REV_TXT = 0.57

export const BLK_THRS = 0.03
export const BLK_CLMP = 1.45
export const COLOR_DELTA_Y_MIN = 0.0005
export const SCALE_B_O_W = 1.25
export const SCALE_W_O_B = 1.25
export const LO_CON_THRESH = 0.078
export const LO_CON_FACTOR = 12.82051282051282
export const LO_CON_OFFSET = 0.06
export const LO_CLIP = 0.001
