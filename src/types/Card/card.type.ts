import { FoxuiCard } from '@foxui/components'

import { CARD_TYPE } from '@foxui/enums'

export type TCardType = `${CARD_TYPE}`

export type TFoxuiCard = InstanceType<typeof FoxuiCard>
