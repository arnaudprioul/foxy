<template>
  <Story
      auto-props-disabled
      group="components"
      title="Tooltip"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="auto">
				      <origam-tooltip v-bind="state">
                <template #activator="{ props }">
	                <origam-btn v-bind="props">
                    Hover me
	                </origam-btn>
                </template>
				      </origam-tooltip>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>

      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamBtn, OrigamCol, OrigamContainer, OrigamRow, OrigamTooltip } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import type { ITooltipProps } from '@origam/interfaces'

	import { reactive } from 'vue'

	const state: ITooltipProps = reactive({
    modelValue: true,
    text: 'this is a tooltip',
    location: 'right'
  })
</script>

<docs lang="md">

</docs>
