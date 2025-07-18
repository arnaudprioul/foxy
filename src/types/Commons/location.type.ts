import { LOCATION_STRATEGIES } from '@foxui/enums'

import type { ILocationStrategyData, ILocationStrategyProps } from '@foxui/interfaces'

import { Ref } from 'vue'

export type TLocationStrategyFn = (
    data: ILocationStrategyData,
    props: ILocationStrategyProps,
    contentStyles: Ref<Record<string, string>>
) => undefined | { updateLocation: (e: Event) => void }

export type TLocationStrategy = `${LOCATION_STRATEGIES}`
