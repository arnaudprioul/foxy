import { FoxyParallax } from "@foxy/components"
import { PARALLAX_EVENT } from '@foxy/enums'

export type TParallaxEvent = `${PARALLAX_EVENT}`

export type TFoxyParallax = InstanceType<typeof FoxyParallax>
