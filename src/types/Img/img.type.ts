import { FoxuiImg } from '@foxui/components'

import { CROSS_ORIGIN, IMG_STATE, REFERRER_POLICY } from '@foxui/enums'

export type TCrossOrigin = `${CROSS_ORIGIN}` | ''

export type TReferrerPolicy = `${REFERRER_POLICY}`

export type TImgState = `${IMG_STATE}`

export type TFoxuiImg = InstanceType<typeof FoxuiImg>
