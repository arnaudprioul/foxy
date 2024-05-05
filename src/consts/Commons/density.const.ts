import { DENSITY } from '@foxy/enums'

import { IDensityProps } from '@foxy/interfaces'

import { TDensity } from '@foxy/types'

export const PREDIFINED_DENSITY: Array<TDensity> = [
  DENSITY.DEFAULT,
  DENSITY.COMPACT
]

export const DENSITY_PROPS: IDensityProps = {
  density: undefined
}