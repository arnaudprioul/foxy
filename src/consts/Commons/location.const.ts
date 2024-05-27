import { DIMENSIONS_PROPS } from '@foxy/consts'

import { ILocationProps, ILocationStrategyProps } from '@foxy/interfaces'

import { connectedLocationStrategy, staticLocationStrategy } from '@foxy/utils'

export const OPPOSITE_MAP = {
  center: 'center',
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
  start: 'right',
  end: 'left',
}

export const LOCATION_STRATEGIES = {
  static : staticLocationStrategy, // specific viewport position, usually centered
  connected : connectedLocationStrategy, // connected to a certain element
}

export const LOCATION_PROPS: ILocationProps = {
  location: undefined
}

export const LOCATION_STRATEGIES_PROPS: ILocationStrategyProps = {
  ...DIMENSIONS_PROPS,

  location: undefined,
  locationStrategy: undefined,
  offset: undefined,
  origin: undefined
}