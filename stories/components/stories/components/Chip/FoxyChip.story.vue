<template>
  <Story
      auto-props-disabled
      group="components"
      title="Chip"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-chip v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
      <template #controls>
        <hst-text
            v-model="state.text"
            title="Text"
        />

        <hst-icon
            v-model="state.prependIcon"
            title="Prepend Icon"
        />
        <hst-icon
            v-model="state.appendIcon"
            title="Append Icon"
        />

        <hst-checkbox
            v-model="state.closable"
            title="Closable"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxyChip, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'
	import { ALIGN, JUSTIFY } from '@foxy/enums'

	import { HstIcon } from '@stories/components/controls'
	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    text: 'Chip',
    color: "#ffc529",
    bgColor: "#7d6fa1"
  })
</script>

<docs lang="md">

</docs>
