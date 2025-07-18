<template>
  <Story
      auto-props-disabled
      group="components"
      title="NumberField"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-number-field
                  v-bind="state"
                  @click:control="logEvent('click control', $event)"
                  @mousedown:control="logEvent('mousedown control', $event)"
                  @update:focused="logEvent('update focused', $event)"
                  @update:model-value="logEvent('update modelValue', $event)"
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
            v-model="state.prependIcon"
            title="Prepend Icon"
        />
        <hst-icon
            v-model="state.appendIcon"
            title="Append Icon"
        />
        <hst-icon
            v-model="state.prependInnerIcon"
            title="Prepend Inner Icon"
        />
        <hst-icon
            v-model="state.appendInnerIcon"
            title="Append Inner Icon"
        />

        <hst-icon
            v-model="state.incrementIcon"
            title="Increment Icon"
        />
        <hst-icon
            v-model="state.decrementIcon"
            title="Decrement Icon"
        />

        <hst-checkbox
            v-model="state.clearable"
            title="Clearable"
        />

        <hst-checkbox
            v-model="state.required"
            title="Required"
        />

        <hst-checkbox
            v-model="state.split"
            title="Split"
        />

        <hst-checkbox
            v-model="state.inset"
            title="Inset"
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
	import { OrigamCol, OrigamContainer, OrigamNumberField, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import type { INumberFieldProps } from '@origam/interfaces'

	import { HstIcon } from '@stories/components/controls'

	import { logEvent } from 'histoire/client'
	import { reactive } from 'vue'

	const state: Partial<INumberFieldProps> = reactive({
    label: 'Numberfield',
    bgColor: '#fff'
  })
</script>

<docs lang="md">

</docs>
