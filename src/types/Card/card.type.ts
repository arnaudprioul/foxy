import { FoxyCard } from '@foxy/components'

import { CARD_TYPE } from '@foxy/enums'

export type TCardType = `${CARD_TYPE}`

export type TFoxyCard = InstanceType<typeof FoxyCard>