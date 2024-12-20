<template>
  <Story
      auto-props-disabled
      group="components"
      title="Containment/DataList">
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER">
            <foxy-col cols="auto">
              <foxy-data-list v-bind="state"/>
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
import {FoxyCol, FoxyContainer, FoxyDataList, FoxyRow} from '@foxy/components'

import {ALIGN, JUSTIFY} from '@foxy/enums'

import {reactive} from 'vue'

const state: { [key: string]: any } = reactive({
  items: [
    {
      title: {text: 'Admin'},
      text: [
        {text: 'Management', prependIcon: 'mdi-account-multiple-outline'},
        {text: 'settings', prependIcon: 'mdi-cog-outline'}
      ]
    },
    {
      title: {text: 'User'},
      text: [
        {text: 'Create', prependIcon: 'mdi-plus-outline'},
        {text: 'Read', prependIcon: 'mdi-file-outline'},
        {text: 'Update', prependIcon: 'mdi-update'},
        {text: 'Delete', prependIcon: 'mdi-delete'}
      ]
    }
  ]
})
</script>
<docs lang="md">
List Documentation
</docs>
