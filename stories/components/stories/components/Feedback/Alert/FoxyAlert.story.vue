<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Alert"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-alert
                  v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-checkbox v-model="state.closable" title="Closable"/>

        <hst-checkbox v-model="state.icon" title="Hide/Show Icon"/>

        <hst-checkbox v-model="state.prominent" title="Prominent"/>

        <hst-text v-model="state.title" title="Title"/>

        <hst-text v-model="state.text" title="Text"/>

        <hst-icon v-model="state.closeIcon" title="Close Icon"/>

        <hst-icon v-model="state.icon" title="Icon"/>

        <hst-select
            v-model="state.status"
            :options="[
                {value: '', label: 'Default'},
                {value: 'success', label: 'Success'},
                {value: 'info', label: 'Info'},
                {value: 'warning', label: 'Warning'},
                {value: 'error', label: 'Error'},
            ]"
            title="Status"
        />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyAlert, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { HstIcon } from '@stories/components/controls'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!',
    closable: false
  })
</script>
<docs lang="md">

</docs>
