<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/Select"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-select v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-icon v-model="state.prependIcon" title="Prepend Icon"/>
        <hst-icon v-model="state.appendIcon" title="Append Icon"/>
        <hst-icon v-model="state.prependInnerIcon" title="Prepend Inner Icon"/>
        <hst-icon v-model="state.appendInnerIcon" title="Append Inner Icon"/>

        <hst-checkbox v-model="state.required" title="Required"/>

        <hst-checkbox v-model="state.counter" title="Counter"/>

        <hst-checkbox v-model="state.chips" title="Chips"/>

        <hst-checkbox v-model="state.multiple" title="Multiple"/>

        <hst-text v-model="state.label" title="Label"/>
        <hst-text v-model="state.prefix" title="Prefix"/>
        <hst-text v-model="state.suffix" title="Suffix"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxySelect } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { HstIcon } from '@stories/components/controls'
  import { logEvent } from 'histoire/client'

  import { reactive, ref } from 'vue'

  const state: { [key: string]: any } = reactive({
    label: 'Select',
    items: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
  })
</script>

<docs lang="md">

</docs>
