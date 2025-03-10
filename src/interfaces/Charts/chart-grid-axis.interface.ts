import { ICommonsComponentProps, IDimensionProps, IDirectionProps, ILocationProps } from "@foxy/interfaces"

export interface IChartGridAxisProps extends ICommonsComponentProps, IDirectionProps, IDimensionProps, ILocationProps {
    showAxisLine?: boolean
    showGrids?: boolean
    showLabels?: boolean
    labels?: Array<string | number>
    min?: number
    max?: number
    length?: number
    title?: string
    offset?: {horizontal: number, vertical: number}
}
