<template>
  <Story
      auto-props-disabled
      group="components"
      title="Btn"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container fullscreen>
          <foxy-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
            <foxy-col cols="auto">
              <foxy-btn v-bind="state"/>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>

      <template #controls>
        <hst-rounded v-model:rounded="state.rounded"/>

        <hst-elevation
            v-model="state.elevation"
            title="Elevated"
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
            v-model="state.disabled"
            title="Disabled"
        />

        <hst-checkbox
            v-model="state.loading"
            title="Loading"
        />

        <hst-text
            v-model="state.text"
            title="Text"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>

	import { FoxyBtn, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

	import { ALIGN, JUSTIFY } from '@foxy/enums'

	import { HstElevation, HstIcon, HstRounded } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    text: 'My Button'
  })
</script>
<docs lang="md">
</docs>
