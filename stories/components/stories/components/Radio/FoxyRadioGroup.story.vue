<template>
  <Story
      auto-props-disabled
      group="components"
      title="Radio Group"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align-content="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-radio-group
                  v-bind="state"
                  @update:model-value="logEvent('update:model-value', $event)"
                  @click:label="logEvent('click:label', $event)"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
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
	import { OrigamCol, OrigamContainer, OrigamRadioGroup, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import { HstIcon } from '@stories/components/controls'
	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({
    label: 'Radios',
    items: [
      {
        label: 'Radio 1',
        value: 1
      },
      {
        label: 'Radio 2',
        value: 2
      }
    ]
  })
</script>
<docs lang="md">

</docs>
