<template>
  <Story
      auto-props-disabled
      group="components"
      title="Switch"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-switch v-bind="state"/>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>
        <hst-checkbox
            v-model="state.required"
            title="Required"
        />

        <hst-checkbox
            v-model="state.indeterminate"
            title="Indeterminate"
        />

        <hst-checkbox
            v-model="state.inset"
            title="Inset"
        />

        <hst-checkbox
            v-model="state.loading"
            title="Loading"
        />

        <hst-icon
            v-model="state.trueIcon"
            title="True Icon"
        />
        <hst-icon
            v-model="state.falseIcon"
            title="False Icon"
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
	import { OrigamCol, OrigamContainer, OrigamRow, OrigamSwitch } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'
	import { HstIcon } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Switch'
  })
</script>

<docs lang="md">

</docs>
