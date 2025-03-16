import {
    IColorProps,
    ICommonsComponentProps,
    IDimensionProps,
    IDirectionProps,
    IItemProps,
    IPaddingProps
} from "@foxy/interfaces"

import { TAxis, TChartType, TDirectionBoth } from "@foxy/types"

export interface IChartProps extends ICommonsComponentProps, IChartCommonProps {
    type?: TChartType
    title?: string
    titleSize?: number | string
    subtitle?: string
    subtitleSize?: number | string
    showAxisLine?: TAxis
    showGrids?: TAxis
    showLabels?: TAxis
}

export interface IChartCommonProps extends ICommonsComponentProps, IColorProps, IDimensionProps, IPaddingProps, IItemProps, IDirectionProps {
    autoDraw?: Boolean,
    autoDrawDuration?: number | string
    autoDrawEasing?: string
    gradient?: Array<string>
    gradientDirection?: TDirectionBoth
    labelSize?: number | string
    lineWidth?: number | string
    min?: number | string
    max?: number | string
    smooth?: boolean | string | number
    legend?: boolean
    legendSize?: number | string
}
