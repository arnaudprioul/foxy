<template>
  <Story
      auto-props-disabled
      group="components"
      title="Tooltip"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="auto">
				      <foxui-tooltip v-bind="state">
                <template #activator="{ props }">
	                <foxui-btn v-bind="props">
                    Hover me
	                </foxui-btn>
                </template>
				      </foxui-tooltip>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
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
	import { FoxuiBtn, FoxuiCol, FoxuiContainer, FoxuiRow, FoxuiTooltip } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import type { ITooltipProps } from '@foxui/interfaces'

	import { reactive } from 'vue'

	const state: ITooltipProps = reactive({
    modelValue: true,
    text: 'this is a tooltip',
    location: 'right'
  })
</script>

<docs lang="md">

</docs>
