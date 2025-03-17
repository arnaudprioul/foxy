export type TColor = string | false | null | undefined

export type TXYZ = [number, number, number]
export type TLAB = [number, number, number]
export type THSVA = { h: number, s: number, v: number, a?: number }
export type TRGBA = { r: number, g: number, b: number, a?: number }
export type THSLA = { h: number, s: number, l: number, a?: number }
export type THex = string & { __hexBrand: never }

export type TColorType = string | number | THSVA | TRGBA | THSLA