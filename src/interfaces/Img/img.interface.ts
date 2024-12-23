import {
  IColorProps,
  IIntersectionObserverInit,
  ILazyProps,
  IResponsiveProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

import { TCrossOrigin, TReferrerPolicy } from '@foxy/types'

export interface IImgProps extends IColorProps, IResponsiveProps, ITransitionComponentProps, ILazyProps {
  alt?: string
  cover?: boolean,
  draggable?: boolean
  gradient?: string
  lazySrc?: string
  options?: IIntersectionObserverInit
  sizes?: string
  src?: string | ISrcObject
  crossorigin?: TCrossOrigin
  referrerpolicy?: TReferrerPolicy
  srcset?: string
  position?: string
}

export interface ISrcObject {
  src?: string
  srcset?: string
  lazySrc?: string
  aspect: number
}

