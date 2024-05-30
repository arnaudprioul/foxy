<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/Radio Group"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align-content="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="auto">
              <foxy-radio-group
                  v-bind="state"
                  @update:model-value="logEvent('update:model-value', $event)"
                  @click:label="logEvent('click:label', $event)"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox v-model="state.required" title="Required"/>

        <hst-icon v-model="state.trueIcon" title="True Icon"/>
        <hst-icon v-model="state.falseIcon" title="False Icon"/>

        <hst-text v-model="state.label" title="Label"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyRadioGroup, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { HstIcon } from '@stories/components/controls'
  import { logEvent } from 'histoire/client'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    label: 'Radios',
    items: [
      {
        label: 'Radio 1',
        value: 1
      },
      {
        label: 'Radio 2',
        value: 2
      }
    ]
  })
</script>
<docs lang="md">

</docs>
