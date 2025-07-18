<template>
  <Story
      auto-props-disabled
      group="components"
      title="Checkbox"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-checkbox
                  v-bind="state"
                  @update:model-value="logEvent('update:model-value', $event)"
                  @click:label="logEvent('click:label', $event)"
              />
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

        <hst-icon
            v-model="state.trueIcon"
            title="True Icon"
        />
        <hst-icon
            v-model="state.falseIcon"
            title="False Icon"
        />
        <hst-icon
            v-model="state.indeterminateIcon"
            title="Indeterminate Icon"
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
	import { FoxuiCheckbox, FoxuiCol, FoxuiContainer, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import { HstIcon } from '@stories/components/controls'
	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Checkbox',
    value: 1
  })
</script>
<docs lang="md">

</docs>
