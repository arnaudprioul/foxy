<template>
  <Story
      auto-props-disabled
      group="components"
      title="Select"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-select
                  v-bind="state"
                  @click:control="logEvent('click control', $event)"
                  @mousedown:control="logEvent('mousedown control', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
                  @update:menu="logEvent('update menu', $event)"
                  @click:append="logEvent('click append', $event)"
                  @click:prepend="logEvent('click prepend', $event)"
                  @click:clear="logEvent('click clear', $event)"
                  @click:append-inner="logEvent('click append inner', $event)"
                  @click:prepend-inner="logEvent('click prepend inner', $event)"
              />
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>
        <hst-icon
            v-model="state.prependIcon as string"
            title="Prepend Icon"
        />
        <hst-icon
            v-model="state.appendIcon as string"
            title="Append Icon"
        />
        <hst-icon
            v-model="state.prependInnerIcon as string"
            title="Prepend Inner Icon"
        />
        <hst-icon
            v-model="state.appendInnerIcon as string"
            title="Append Inner Icon"
        />

        <hst-checkbox
            v-model="state.required"
            title="Required"
        />

        <hst-checkbox
            v-model="state.counter"
            title="Counter"
        />

        <hst-checkbox
            v-model="state.chips"
            title="Chips"
        />

        <hst-checkbox
            v-model="state.multiple"
            title="Multiple"
        />

        <hst-checkbox
            v-model="state.autocomplete"
            title="Autocomplete"
        />

        <hst-text
            v-model="state.label"
            title="Label"
        />
        <hst-text
            v-model="state.prefix"
            title="Prefix"
        />
        <hst-text
            v-model="state.suffix"
            title="Suffix"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamCol, OrigamContainer, OrigamRow, OrigamSelect } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import { HstIcon } from '@stories/components/controls'
	import { logEvent } from 'histoire/client'

	import { reactive } from 'vue'

	const state: Partial<ISelectProps> = reactive({
    label: 'Select',
    items: ['California', 'Colorado', 'Florida', 'Georgia', 'Texas', 'Wyoming'],
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>
