<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/DatePickerField"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-date-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
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
  import { FoxyCol, FoxyContainer, FoxyDatePickerField, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'
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
