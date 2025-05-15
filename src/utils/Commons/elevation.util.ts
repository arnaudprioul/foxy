import { convertToUnit, normalize, roundTo } from "@foxy/utils"

export function formatElevationStyle (elevation: number = 0) {
    const blurRadius = roundTo(normalize(elevation * .01, 0, 1, 0, 16), 1);
    const offsetX = roundTo(normalize(elevation * .01, 0, 1, 0, 8), 1);
    const offsetY = roundTo(normalize(elevation * .01, 0, 1, 0, 16), 1);
    const opacity = roundTo(normalize(elevation * .01, 0, 1, 0.5, 0.25), 2);

    return `box-shadow: ${convertToUnit(offsetX)} ${convertToUnit(offsetY)} ${convertToUnit(blurRadius)} hsl(0deg 0% 0% / ${opacity.toFixed(2)})`
}
