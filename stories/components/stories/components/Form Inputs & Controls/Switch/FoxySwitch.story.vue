<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/Switch"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="auto">
              <foxy-switch v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox v-model="state.required" title="Required"/>

        <hst-checkbox v-model="state.indeterminate" title="Indeterminate"/>

        <hst-checkbox v-model="state.inset" title="Inset"/>

        <hst-checkbox v-model="state.loading" title="Loading"/>

        <hst-icon v-model="state.trueIcon" title="True Icon"/>
        <hst-icon v-model="state.falseIcon" title="False Icon"/>

        <hst-text v-model="state.label" title="Label"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxySwitch } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'
  import { HstIcon } from '@stories/components/controls'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    label: 'Switch'
  })
</script>

<docs lang="md">

</docs>
