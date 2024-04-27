import { TRANSITION_MODE } from '@foxy/enums'

import { Component, TransitionProps } from 'vue'

export type TTransitionMode = `${TRANSITION_MODE}`

export type TTransitionProps = TransitionProps & {
  component: Component
}