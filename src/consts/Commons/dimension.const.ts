import { DIMENSIONS } from '@foxy/enums'

import { IDimensionProps } from '@foxy/interfaces'

import { TDimensions } from '@foxy/types'

export const DIMENSIONS_ARRAY: TDimensions[] = [
    DIMENSIONS.HEIGHT,
    DIMENSIONS.MAX_HEIGHT,
    DIMENSIONS.MAX_WIDTH,
    DIMENSIONS.MIN_HEIGHT,
    DIMENSIONS.MIN_WIDTH,
    DIMENSIONS.WIDTH
]

export const DIMENSIONS_PROPS: IDimensionProps ={
    height: undefined,
    width: undefined,
    maxHeight: undefined,
    maxWidth: undefined,
    minHeight: undefined,
    minWidth: undefined
}