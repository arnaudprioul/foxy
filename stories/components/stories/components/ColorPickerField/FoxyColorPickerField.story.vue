<template>
  <Story
      auto-props-disabled
      group="components"
      title="ColorPickerField"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-color-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
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
	import { OrigamCol, OrigamColorPickerField, OrigamContainer, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'
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
