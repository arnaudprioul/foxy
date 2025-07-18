<template>
  <Story
      auto-props-disabled
      group="components"
      title="DatePickerField"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-date-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.range"
            title="Range"
        />
        <hst-checkbox
            v-model="state.multiple"
            title="Multiple"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamCol, OrigamContainer, OrigamDatePickerField, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'DatePickerField',
    menu: true,
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>
