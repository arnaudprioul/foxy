<template>
  <Story
      auto-props-disabled
      group="components"
      title="Picker/DatePicker"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fluid>
          <foxy-row>
            <foxy-col cols="12">
              <foxy-date-picker v-bind="state"/>
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

	import { FoxyCol, FoxyContainer, FoxyDatePicker, FoxyRow } from '@foxy/components'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({

  })
</script>
<docs lang="md">

</docs>
