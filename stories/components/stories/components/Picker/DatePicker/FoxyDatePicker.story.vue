<template>
  <Story
      auto-props-disabled
      group="components"
      title="DatePicker"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fluid>
		      <origam-row>
			      <origam-col cols="12">
				      <origam-date-picker
                  v-bind="state"
                  @update:model-value="logEvent('update model value', $event)"
                  @update:month="logEvent('update month', $event)"
                  @update:year="logEvent('update year', $event)"
                  @update:view-mode="logEvent('update view mode', $event)"
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

	import { OrigamCol, OrigamContainer, OrigamDatePicker, OrigamRow } from '@origam/components'
	import { logEvent } from "histoire/client"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({})
</script>
<docs lang="md">

</docs>
