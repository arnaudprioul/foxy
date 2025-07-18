<template>
  <Story
      auto-props-disabled
      group="components"
      title="DatePicker"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fluid>
		      <foxui-row>
			      <foxui-col cols="12">
				      <foxui-date-picker
                  v-bind="state"
                  @update:model-value="logEvent('update model value', $event)"
                  @update:month="logEvent('update month', $event)"
                  @update:year="logEvent('update year', $event)"
                  @update:view-mode="logEvent('update view mode', $event)"
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

	import { FoxuiCol, FoxuiContainer, FoxuiDatePicker, FoxuiRow } from '@foxui/components'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({})
</script>
<docs lang="md">

</docs>
