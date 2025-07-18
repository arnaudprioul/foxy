<template>
  <Story
      auto-props-disabled
      group="components"
      title="ColorPickerField"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col>
				      <foxui-color-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
              />
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>

      <template #controls>

      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiCol, FoxuiColorPickerField, FoxuiContainer, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'ColorPickerField',
    menu: true,
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>
