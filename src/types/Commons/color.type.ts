export type TColor = string | false | null | undefined

export type TXYZ = [number, number, number]
export type TLAB = [number, number, number]
export type THSV = { h: number, s: number, v: number, a?: number }
export type TRGB = { r: number, g: number, b: number, a?: number }
export type THSL = { h: number, s: number, l: number, a?: number }
export type THex = string & { __hexBrand: never }

export type TColorType = string | number | THSV | TRGB | THSL