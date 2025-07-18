import { OrigamTransition } from "@origam/components"
import { TRANSITION_MODE } from '@origam/enums'

import { Component, TransitionProps } from 'vue'

export type TTransitionMode = `${TRANSITION_MODE}`

export type TTransitionProps = TransitionProps & {
    component?: Component
}

export type TOrigamTransition = InstanceType<typeof OrigamTransition>
