import { OrigamCol } from "@origam/components"
import { COLS } from '@origam/enums'

export type TCols = `${COLS}` | true | 'auto'

export type TOrigamCol = InstanceType<typeof OrigamCol>
