<template>
  <Story
      auto-props-disabled
      group="components"
      title="Picker/DatePicker"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-date-picker
		              v-bind="state"
		              @update:model-value="logEvent('update model value', $event)"
		              @update:month="logEvent('update month', $event)"
		              @update:year="logEvent('update year', $event)"
		              @update:view-mode="logEvent('update view mode', $event)"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
	      <hst-checkbox v-model="state.range" title="Range"/>
	      <hst-checkbox v-model="state.multiple" title="Multiple"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>

	import { FoxyCol, FoxyContainer, FoxyDatePicker, FoxyRow } from '@foxy/components'
	import { logEvent } from "histoire/client"

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({

  })
</script>
<docs lang="md">

</docs>
