<template>
  <Story
      auto-props-disabled
      group="components"
      title="ColorPicker"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fluid>
		      <origam-row>
			      <origam-col cols="12">
				      <origam-color-picker
                  v-bind="state"
                  @update:model-value="logEvent('update model value', $event)"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
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

	import { OrigamCol, OrigamColorPicker, OrigamContainer, OrigamRow } from '@origam/components'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    showSwatches: true
  })
</script>
<docs lang="md">

</docs>
