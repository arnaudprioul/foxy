import { IChartCommonProps } from "@foxy/interfaces"

export interface IChartBarProps extends IChartCommonProps {
    autoLineWidth?: Boolean
}

export interface IBar {
    x: number
    y: number
    height: number
    value: number
}
