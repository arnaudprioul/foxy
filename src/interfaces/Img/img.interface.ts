import {
  IColorProps,
  ICommonsComponentProps,
  IIntersectionObserverInit,
  IResponsiveProps,
  IRoundedProps,
  ITransitionComponentProps
} from '@foxy/interfaces'

import { TCrossOrigin, TReferrerPolicy } from '@foxy/types'




export interface IImgProps extends IColorProps, ICommonsComponentProps, IRoundedProps, IResponsiveProps, ITransitionComponentProps {
  alt?: string
  cover?: boolean,
  draggable?: boolean
  eager?: boolean
  gradient?: string
  lazySrc?: string
  options?: IIntersectionObserverInit
  sizes?: string
  src?: string | ISrcObject
  crossorigin?: TCrossOrigin,
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

