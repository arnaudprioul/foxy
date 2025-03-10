import { DIRECTION } from "@foxy/enums"

export enum CHART_TYPE {
    TREND = 'trend',
    BAR = 'bar',
    LINE = 'line'
}

export enum CHART_AXIS_SIDE {
    Y = DIRECTION.VERTICAL,
    X = DIRECTION.HORIZONTAL,
    BOTH = 'both'
}
