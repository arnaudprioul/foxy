import { FoxyOtpInputField } from '@foxy/components'

import { OTP_INPUT_FIELD_TYPE } from "@foxy/enums"

export type TOtpInputFieldType = `${OTP_INPUT_FIELD_TYPE}`

export type TFoxyOtpInputField = InstanceType<typeof FoxyOtpInputField>
