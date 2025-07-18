<template>
  <Story
      auto-props-disabled
      group="components"
      title="Switch"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-switch v-bind="state"/>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
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
	import { FoxuiCol, FoxuiContainer, FoxuiRow, FoxuiSwitch } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'
	import { HstIcon } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Switch'
  })
</script>

<docs lang="md">

</docs>
