import { FoxuiSliderField } from '@foxui/components'

export type TAlways = boolean | 'always'

export type TSliderData = {
    value: number
}

export type TTick = {
    value: number
    position: number
    label?: string
}

export type TFoxuiSliderField = InstanceType<typeof FoxuiSliderField>
