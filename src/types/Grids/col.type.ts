import { FoxyCol } from "@foxy/components"
import { COLS } from '@foxy/enums'

export type TCols = `${COLS}`

export type TFoxyCol = InstanceType<typeof FoxyCol>
