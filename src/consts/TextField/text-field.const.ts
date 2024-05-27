import {
    BORDER_PROPS,
    COLOR_PROPS,
    COMMONS_COMPONENT_PROPS,
    DENSITY_PROPS, ELEVATION_PROPS,
    FIELD_PROPS,
    INPUT_PROPS,
    MARGIN_PROPS, PADDING_PROPS, ROUNDED_PROPS
} from '@foxy/consts'
import { TEXT_FIELD_TYPE } from "@foxy/enums"
import { ITextFieldProps } from '@foxy/interfaces'

import { TTextFieldType } from "@foxy/types"

export const ACTIVE_TEXT_FIELD_TYPE: Partial<Array<TTextFieldType>> = [
    TEXT_FIELD_TYPE.COLOR,
    TEXT_FIELD_TYPE.FILE,
    TEXT_FIELD_TYPE.TIME,
    TEXT_FIELD_TYPE.DATE,
    TEXT_FIELD_TYPE.DATETIME,
    TEXT_FIELD_TYPE.WEEK,
    TEXT_FIELD_TYPE.MONTH
]

export const INPUT_TEXT_FIELD_TYPE: Partial<Array<TTextFieldType>> = [
    TEXT_FIELD_TYPE.TEXT,
    TEXT_FIELD_TYPE.SEARCH,
    TEXT_FIELD_TYPE.PASSWORD,
    TEXT_FIELD_TYPE.TEL,
    TEXT_FIELD_TYPE.URL
]

export const TEXT_FIELD_PROPS: ITextFieldProps = {
    ...COMMONS_COMPONENT_PROPS,
    ...COLOR_PROPS,
    ...FIELD_PROPS,
    ...DENSITY_PROPS,
    ...INPUT_PROPS,
    ...MARGIN_PROPS,
    ...PADDING_PROPS,
    ...ELEVATION_PROPS,
    ...BORDER_PROPS,
    ...ROUNDED_PROPS,

    autofocus: undefined,
    counter: undefined,
    counterValue: undefined,
    placeholder: undefined,
    persistentPlaceholder: undefined,
    persistentCounter: undefined,
    role: undefined,
    type: undefined,
    modelModifiers: undefined,
}
