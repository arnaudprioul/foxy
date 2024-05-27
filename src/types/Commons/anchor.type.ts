import { BLOCK, INLINE } from '@foxy/enums'

export type TBlock = `${BLOCK}`

export type TInline = `${INLINE}`

export type TAnchor =
    | TBlock
    | TInline
    | 'center'
    | 'center center'
    | `${TBlock} ${TInline | 'center'}`
    | `${TInline} ${TBlock | 'center'}`

export type TParsedAnchor =
    | { side: 'center', align: 'center' }
    | { side: TBlock, align: 'left' | 'right' | 'center' }
    | { side: 'left' | 'right', align: TBlock | 'center' }