import { FoxyProgress } from '@foxy/components'

import { PROGRESS_TYPE } from '@foxy/enums'

export type TProgressType = `${PROGRESS_TYPE}`

export type TFoxyProgress = InstanceType<typeof FoxyProgress>