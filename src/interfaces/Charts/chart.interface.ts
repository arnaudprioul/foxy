import { IChartLineProps, IColorProps, ICommonsComponentProps, IDimensionProps, IPaddingProps } from "@foxy/interfaces"
import { IChartBarProps } from "@foxy/interfaces/Charts/chart-bar.interface.ts"

import { TChartItem, TChartType, TDirectionBoth } from "@foxy/types"

export interface IChartProps extends ICommonsComponentProps, IChartLineProps, IChartBarProps {
    type?: TChartType
}

export interface IChartCommonProps extends ICommonsComponentProps, IColorProps, IDimensionProps, IPaddingProps {
    autoDraw?: Boolean,
    autoDrawDuration?: number | string
    autoDrawEasing?: string
    gradient?: Array<string>
    gradientDirection?: TDirectionBoth
    labels?: Array<TChartItem>
    labelSize?: number | string
    lineWidth?: number | string
    itemValue?: string
    modelValue?: Array<TChartItem>
    min?: number | string
    max?: number | string
    showLabels?: boolean
    smooth?: boolean | string | number
}