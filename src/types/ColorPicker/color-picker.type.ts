import { FoxyColorPicker } from "@foxy/components"

import { COLOR_MODES_NAMES } from "@foxy/enums"

export type TColorModes = `${COLOR_MODES_NAMES}`

export type TFoxyColorPicker = InstanceType<typeof FoxyColorPicker>
