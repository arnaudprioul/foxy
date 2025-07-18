import { FoxuiTransition } from "@foxui/components"
import { TRANSITION_MODE } from '@foxui/enums'

import { Component, TransitionProps } from 'vue'

export type TTransitionMode = `${TRANSITION_MODE}`

export type TTransitionProps = TransitionProps & {
    component?: Component
}

export type TFoxuiTransition = InstanceType<typeof FoxuiTransition>
