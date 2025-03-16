import { FoxyChart } from "@foxy/components"

import { CHART_AXIS_SIDE, CHART_TYPE } from "@foxy/enums"

export type TChartType = `${CHART_TYPE}`

export type TChartItem = string | number | { value: number, label?: string }

export type TFoxyChart = InstanceType<typeof FoxyChart>
