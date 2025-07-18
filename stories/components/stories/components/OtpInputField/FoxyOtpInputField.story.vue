<template>
  <Story
      auto-props-disabled
      group="components"
      title="OtpInputField"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-otp-input-field
                  v-bind="state"
                  @finish="logEvent('finish', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.focusAll"
            title="Focus All"
        />

        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.required"
            title="Required"
        />

        <hst-slider
            v-model="state.length"
            :max="10"
            :min="2"
            title="Length"
        />

        <hst-rounded v-model:rounded="state.rounded"/>

        <hst-checkbox
            v-model="state.border"
            title="Border"
        />

        <hst-text
            v-model="state.label"
            title="Label"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamCol, OrigamContainer, OrigamOtpInputField, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import type { IOtpInputFieldProps } from "@origam/interfaces"
	import { HstRounded } from "@stories/components/controls"

	import { logEvent } from 'histoire/client'
	import { reactive } from 'vue'

	const state: Partial<IOtpInputFieldProps> = reactive({
    label: 'Otp Input Field',
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>
