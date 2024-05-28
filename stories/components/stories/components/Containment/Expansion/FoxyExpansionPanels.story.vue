<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/Expansion Panels"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col cols="9">
              <foxy-expansion-panels v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox v-model="state.accordion" title="Accordion"/>
        <hst-checkbox v-model="state.inset" title="Inset"/>
        <hst-checkbox v-model="state.popout" title="Popout"/>

        <hst-checkbox v-model="state.multiple" title="Multiple"/>

        <hst-icon v-model="state.collapseIcon" title="Collapse Icon"/>
        <hst-icon v-model="state.expandIcon" title="Expand Icon"/>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyCol, FoxyContainer, FoxyExpansionPanels, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY, MDI_ICONS } from '@foxy/enums'

  import { HstIcon } from '@stories/components/controls'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({
    items: [
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Account',
        prependIcon: MDI_ICONS.ACCOUNT
      },
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Settings',
        prependIcon: MDI_ICONS.COGS
      },
      {
        content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima',
        title: 'Random Title',
        collapseIcon: MDI_ICONS.CLOSE,
        expandIcon: MDI_ICONS.OPEN_IN_NEW,
      }
    ]
  })
</script>

<docs lang="md">

</docs>
