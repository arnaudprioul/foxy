import { ADJACENT } from '@foxy/enums'

import { TEventProp, TIcon } from '@foxy/types'

export type TAdjacentLabels = `${ADJACENT}`

export type TAdjacentListeners<T extends {}, U = keyof T> = U extends `onClick:${infer V extends TAdjacentLabels}` ? V : never

export type TAdjacentProp<T extends TAdjacentLabels> = {
  label: string | undefined
} & {
  [K in `${T}Icon`]: TIcon | undefined
} & {
  [K in `${T}Avatar`]: string | undefined
} & {
  [K in `onClick:${T}`]: TEventProp | undefined
}