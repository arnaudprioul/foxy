import { OrigamCard } from '@origam/components'

import { CARD_TYPE } from '@origam/enums'

export type TCardType = `${CARD_TYPE}`

export type TOrigamCard = InstanceType<typeof OrigamCard>
