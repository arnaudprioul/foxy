<template>
  <Story auto-props-disabled group="components" title="Containment/Card">
    <template #default>
      <foxy-container fullscreen>
        <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
          <foxy-col>
            <foxy-card v-bind="state.props"/>
          </foxy-col>
        </foxy-row>
      </foxy-container>
    </template>
  </Story>
</template>

<script lang="ts" setup>

  import { FoxyCard, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'
  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    loading: true,
    title: 'Card title',
    subtitle: 'Subtitle',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!'
  })
</script>
<docs lang="md">
Avatar Documentation
</docs>
