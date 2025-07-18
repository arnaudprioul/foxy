import { LOCATION_STRATEGIES } from '@foxy/enums'

import type { ILocationStrategyData, ILocationStrategyProps } from '@foxy/interfaces'

import { Ref } from 'vue'

export type TLocationStrategyFn = (
    data: ILocationStrategyData,
    props: ILocationStrategyProps,
    contentStyles: Ref<Record<string, string>>
) => undefined | { updateLocation: (e: Event) => void }

export type TLocationStrategy = `${LOCATION_STRATEGIES}`
