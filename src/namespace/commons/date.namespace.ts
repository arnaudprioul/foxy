import { IDateAdapter } from "@foxy/interfaces"

export namespace NDateModule {
    interface Adapter {}

    export type InternalAdapter = {} extends Adapter ? IDateAdapter : Adapter
}
