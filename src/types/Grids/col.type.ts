import { FoxuiCol } from "@foxui/components"
import { COLS } from '@foxui/enums'

export type TCols = `${COLS}` | true | 'auto'

export type TFoxuiCol = InstanceType<typeof FoxuiCol>
