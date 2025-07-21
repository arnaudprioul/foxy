import type { IChartCommonProps } from "@/interfaces"

export interface IChartLineProps extends IChartCommonProps {
    fill?: boolean
}

export interface IBoundary {
    minX: number
    minY: number
    maxX: number
    maxY: number
}

export interface IPoint {
    x: number
    y: number
    value: number
}
