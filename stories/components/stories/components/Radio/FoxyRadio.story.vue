<template>
  <Story
      auto-props-disabled
      group="components"
      title="Radio"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container fullscreen>
		      <foxui-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-radio
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
	import { FoxuiCol, FoxuiContainer, FoxuiRadio, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import { HstIcon } from '@stories/components/controls'
	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Radio',
    value: 1
  })
</script>
<docs lang="md">

</docs>
