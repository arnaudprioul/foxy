<template>
  <Story
      auto-props-disabled
      group="components"
      title="Navigation/Breadcrumbs"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-breadcrumb v-bind="state" />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-text v-model="state.divider" title="divider" />
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyBreadcrumb, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

import { reactive } from 'vue'

const state: { [key: string]: any } = reactive({
  items: ['Foo', 'Bar', 'Fizz']
})
</script>
<docs lang="md">

</docs>
