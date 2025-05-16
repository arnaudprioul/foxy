<template>
  <Story
      auto-props-disabled
      group="components"
      title="Rating Field"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-rating-field
                  v-bind="state"
                  @update:model-value="logEvent('update modelValue', $event)"
              />
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-checkbox
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.hover"
            title="Hover"
        />

        <hst-checkbox
            v-model="state.clearable"
            title="Clearable"
        />

        <hst-checkbox
            v-model="state.halfIncrements"
            title="half increment"
        />

        <hst-text
            v-model="state.label"
            title="Label"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxyCol, FoxyContainer, FoxyRatingField, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY } from '@foxy/enums'

	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Rating Field'
  })
</script>
<docs lang="md">

</docs>
