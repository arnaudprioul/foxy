<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/ColorPickerField"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-color-picker-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', {$event})"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>

      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxyColorPickerField } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'
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
