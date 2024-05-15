<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/TextField"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-text-field
                  v-bind="state"
                  @click:control="logEvent('click control', $event)"
                  @mousedown:control="logEvent('mousedown control', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
                  @click:append="logEvent('click append', $event)"
                  @click:prepend="logEvent('click prepend', $event)"
                  @click:clear="logEvent('click clear', $event)"
                  @click:append-inner="logEvent('click append inner', $event)"
                  @click:prepend-inner="logEvent('click prepend inner', $event)" />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-icon v-model="state.prependIcon" title="Prepend Icon" />
        <hst-icon v-model="state.appendIcon" title="Append Icon" />
        <hst-icon v-model="state.prependInnerIcon" title="Prepend Inner Icon" />
        <hst-icon v-model="state.appendInnerIcon" title="Append Inner Icon" />

        <hst-checkbox v-model="state.clearable" title="Clearable" />

        <hst-checkbox v-model="state.counter" title="Counter" />

        <hst-text v-model="state.label" title="Label" />
        <hst-text v-model="state.prefix" title="Prefix" />
        <hst-text v-model="state.suffix" title="Suffix" />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxyTextField } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

import { logEvent } from 'histoire/client'
import { reactive } from 'vue'

import { HstIcon } from '@stories/components/controls'

const state: { [key: string]: any } = reactive({
  label: 'Textfield',
})
</script>

<docs lang="md">

</docs>
