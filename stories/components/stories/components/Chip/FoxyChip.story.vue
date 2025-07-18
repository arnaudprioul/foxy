<template>
  <Story
      auto-props-disabled
      group="components"
      title="Chip"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-chip v-bind="state"/>
			      </origam-col>
		      </origam-row>
	      </origam-container>
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
	import { OrigamChip, OrigamCol, OrigamContainer, OrigamRow } from '@origam/components'
	import { ALIGN, JUSTIFY } from '@origam/enums'

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
