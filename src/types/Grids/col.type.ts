import { FoxyCol } from "@foxy/components"
import { COLS } from '@foxy/enums'

export type TCols = `${COLS}` | true | 'auto'

export type TFoxyCol = InstanceType<typeof FoxyCol>
