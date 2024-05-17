<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/Autocomplete"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-autocomplete
                  v-bind="state"
                  @click:control="logEvent('click control', $event)"
                  @mousedown:control="logEvent('mousedown control', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:search="logEvent('update search', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
                  @update:menu="logEvent('update menu', $event)"
                  @click:append="logEvent('click append', $event)"
                  @click:prepend="logEvent('click prepend', $event)"
                  @click:clear="logEvent('click clear', $event)"
                  @click:append-inner="logEvent('click append inner', $event)"
                  @click:prepend-inner="logEvent('click prepend inner', $event)"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox v-model="state.required" title="Required"/>

        <hst-checkbox v-model="state.multiple" title="Multiple"/>

        <hst-checkbox v-model="state.clearable" title="Clearable"/>

        <hst-checkbox v-model="state.chips" title="Chips"/>

        <hst-text v-model="state.label" title="Label"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyAutocomplete, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { IAutocompleteProps } from '@foxy/interfaces'

  import { logEvent } from 'histoire/client'
  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive<IAutocompleteProps>({
    items: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
    label: 'Autocomplete',
    chips: true,
    closableChips: true,
    chipProps: {
      border: true,
      rounded: true,
      color:"#ffc529",
      bgColor:"#7d6fa1"
    }
  })
</script>

<docs lang="md">

</docs>
