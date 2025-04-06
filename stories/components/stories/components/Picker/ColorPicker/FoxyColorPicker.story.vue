<template>
  <Story
      auto-props-disabled
      group="components"
      title="Picker/ColorPicker"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-color-picker
                  v-bind="state"
                  @update:model-value="logEvent('update model value', $event)"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
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

  import { FoxyCol, FoxyColorPicker, FoxyContainer, FoxyRow } from '@foxy/components'
  import { logEvent } from "histoire/client"

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    showSwatches: true
  })
</script>
<docs lang="md">

</docs>
