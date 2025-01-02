import { FoxyParallaxElement } from "@foxy/components"
import { PARALLAX_ELEMENT_TYPE } from '@foxy/enums'

export type TParallaxElementType = `${PARALLAX_ELEMENT_TYPE}`

export type TFoxyParallaxElement = InstanceType<typeof FoxyParallaxElement>
