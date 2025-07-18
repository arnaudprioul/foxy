<template>
  <Story
      auto-props-disabled
      group="components"
      title="Window"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="6">
				      <foxui-window v-bind="state">
					      <foxui-window-item
                    v-for="n in 3"
                    :key="n"
                >
						      <foxui-sheet height="200px">
							      <foxui-container fullscreen>
								      <foxui-row
                          :align="ALIGN.CENTER"
                          :justify="JUSTIFY.CENTER"
                      >
									      <foxui-col cols="12">
										      <foxui-title tag="h3">Card {{ n }}</foxui-title>
									      </foxui-col>
								      </foxui-row>
							      </foxui-container>
						      </foxui-sheet>
					      </foxui-window-item>
				      </foxui-window>
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
	import {
		FoxuiCol,
		FoxuiContainer,
		FoxuiRow,
		FoxuiSheet,
		FoxuiTitle,
		FoxuiWindow,
		FoxuiWindowItem
	} from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import type { IWindowProps } from '@foxui/interfaces'

	import { reactive } from 'vue'

	const state: IWindowProps = reactive({
    showArrows: true,
    modelValue: 0
  })

</script>

<docs lang="md">

</docs>
