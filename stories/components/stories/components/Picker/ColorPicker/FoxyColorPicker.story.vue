<template>
  <Story
      auto-props-disabled
      group="components"
      title="ColorPicker"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fluid>
		      <foxui-row>
			      <foxui-col cols="12">
				      <foxui-color-picker
                  v-bind="state"
                  @update:model-value="logEvent('update model value', $event)"
              />
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.showSwatches"
            title="Show Swatches"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>

	import { FoxuiCol, FoxuiColorPicker, FoxuiContainer, FoxuiRow } from '@foxui/components'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    showSwatches: true
  })
</script>
<docs lang="md">

</docs>
