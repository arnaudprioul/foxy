<template>
  <Story
      auto-props-disabled
      group="components"
      title="DatePickerField"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col>
				      <foxui-date-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
              />
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
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
	import { FoxuiCol, FoxuiContainer, FoxuiDatePickerField, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'
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
