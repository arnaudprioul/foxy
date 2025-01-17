<template>
  <Story
      auto-props-disabled
      group="components"
      title="Form Inputs & Controls/TextareaField Toolbar"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row :align="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
            <foxy-col>
              <foxy-textarea-field-toolbar
		              v-bind="state"
              />
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
	import { FoxyCol, FoxyContainer, FoxyRow, FoxyTextareaFieldToolbar } from '@foxy/components'

  import { ALIGN, JUSTIFY } from '@foxy/enums'

  import { reactive } from 'vue'

  const state: { [key: string]: any } = reactive({

  })
</script>

<docs lang="md">

</docs>
