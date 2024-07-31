import {
  IBorderProps,
  IBox,
  ICommonsComponentProps,
  IElevationProps,
  IMarginProps,
  IPaddingProps,
  IRoundedProps,
  ITagProps
} from '@foxy/interfaces'

import { TAnchor, TAxis, TParallaxElementType, TParallaxEvent, TPoint } from '@foxy/types'

export interface IParallaxElementTypeProps {
  type?: Record<string, TParallaxElementType>
}

export interface IParallaxElementProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IElevationProps, IParallaxElementTypeProps {
  transformOrigin?: Record<string, TAnchor>
  originX?: number
  originY?: number
  strength?: number
  axis?: Record<string, TAxis>
  maxX?: number
  maxY?: number
  minX?: number
  minY?: number
  cycle?: number
  audioIndex?: number
}

export interface IParallaxElementMovement {
  x: number,
  y: number,
  target?: DOMRect | IBox,
  originX?: number,
  originY?: number,
  strength: number,
  event: Record<string, TParallaxEvent>,
  minX?: number,
  minY?: number,
  maxX?: number,
  maxY?: number,
}

export interface IParallaxElementCicle {
  referencePosition: TPoint,
  shape: IBox,
  event: Record<string, TParallaxEvent>,
  cycles: number,
  strength: number,
}