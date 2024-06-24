import { useSteps } from '@foxy/composables'

import {
  IBorderProps,
  IColorProps,
  ICommonsComponentProps,
  IDensityProps,
  IDirectionProps,
  IElevationProps,
  IFocusProps,
  IInputProps,
  IMarginProps,
  IPaddingProps,
  IRippleProps,
  IRoundedProps,
  ISliderFieldThumbProps,
  ISliderFieldTrackProps
} from '@foxy/interfaces'

import { TAlways, TColor, TFoxySliderFieldThumb, TFoxySliderFieldTrack, TSize, TSliderData, TTick } from '@foxy/types'

import { Ref } from 'vue'

export interface ISliderFieldProps extends ICommonsComponentProps, IDensityProps, IColorProps, IInputProps, IFocusProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IRippleProps, IDirectionProps {
  disabled?: boolean
  required?: boolean
  label?: string
  error?: boolean
  readonly?: boolean
  max?: number | string
  min?: number | string
  step?: number | string
  thumbProps?: ISliderFieldThumbProps
  trackProps?: ISliderFieldTrackProps
  reverse?: boolean
  modelValue?: number | string | Array<number> | Array<string>
  range?: boolean

  // TODO - need rework to use tick interface
  showTicks?: TAlways
  ticks?: Array<number> | Record<number, string>
  tickSize?: TSize | number
}

export interface ISliderFieldProvide {
  activeThumbRef: Ref<HTMLElement | undefined>
  decimals: Ref<number>
  disabled: Ref<boolean | null | undefined>
  readonly: Ref<boolean | null | undefined>
  error: Ref<boolean | null | undefined>
  elevation: Ref<string | number | undefined>
  rounded: Ref<string | number | boolean | null | undefined>
  border: Ref<string | number | boolean | null | undefined>
  ripple: Ref<boolean | { class: string } | undefined>
  color: Ref<TColor>
  hoverColor: Ref<TColor>
  activeColor: Ref<TColor>
  bgColor: Ref<TColor>
  hoverBgColor: Ref<TColor>
  activeBgColor: Ref<TColor>
  min: Ref<number>
  max: Ref<number>
  mousePressed: Ref<boolean>
  numTicks: Ref<number>
  onSliderMousedown: (e: MouseEvent) => void
  onSliderTouchstart: (e: TouchEvent) => void
  parseMouseMove: (e: MouseEvent | TouchEvent) => number
  position: (val: number) => number
  roundValue: (value: number) => number
  showTicks: Ref<TAlways | undefined>
  startOffset: Ref<number>
  step: Ref<number>
  ticks: Ref<readonly number[] | Record<string, string> | undefined>
  tickSize: Ref<number>
  foxySliderFieldTrackRef: Ref<TFoxySliderFieldTrack | null | undefined>
  foxySliderFieldThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  foxySliderFieldStartThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  foxySliderFieldStopThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  isVertical: Ref<boolean>
  parsedTicks: Ref<Array<TTick>>
  hasLabels: Ref<boolean>
  isReversed: Ref<boolean | undefined>
  indexFromEnd: Ref<boolean>
}

export interface ISliderField {
  foxySliderFieldTrackRef: Ref<TFoxySliderFieldTrack | null | undefined>
  foxySliderFieldThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  foxySliderFieldStartThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  foxySliderFieldStopThumbRef: Ref<TFoxySliderFieldThumb | null | undefined>
  props: ISliderFieldProps
  steps: ReturnType<typeof useSteps>
  onSliderEnd: (data: TSliderData) => void
  onSliderStart: (data: TSliderData) => void
  onSliderMove: (data: TSliderData) => void
  getActiveThumb: (e: MouseEvent | TouchEvent) => HTMLElement
}