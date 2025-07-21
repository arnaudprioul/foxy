import type { TColor, THSLA } from "@/types"
import { convertToUnit, HSVtoHSL, isParsableColor, normalize, parseColor, RGBtoHSV, roundTo } from "@/utils"

export function formatElevationStyle (elevation: number = 0, bgColor?: TColor) {
    const blurRadius = roundTo(normalize(elevation * .04, 0, 1, 0, 16), 1);
    const offsetX = roundTo(normalize(elevation * .04, 0, 1, 0, 8), 1);
    const offsetY = roundTo(normalize(elevation * .04, 0, 1, 0, 16), 1);
    const opacity = roundTo(normalize(elevation * .04, 0, 1, 0.5, 0.25), 2);
    let color: THSLA = {h: 0, s: 0, l: 0}

    if (bgColor && isParsableColor(bgColor)) {
        color = HSVtoHSL(RGBtoHSV(parseColor(bgColor)))
    }

    return `box-shadow: ${convertToUnit(offsetX)} ${convertToUnit(offsetY)} ${convertToUnit(blurRadius)} hsl(${convertToUnit(color.h, 'deg')} ${convertToUnit(color.s * 100, '%')} ${convertToUnit(color.l * 100, '%')} / ${opacity.toFixed(2)})`
}
