<template>
  <Story
      auto-props-disabled
      group="components"
      title="Window"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col cols="6">
				      <origam-window v-bind="state">
					      <origam-window-item
                    v-for="n in 3"
                    :key="n"
                >
						      <origam-sheet height="200px">
							      <origam-container fullscreen>
								      <origam-row
                          :align="ALIGN.CENTER"
                          :justify="JUSTIFY.CENTER"
                      >
									      <origam-col cols="12">
										      <origam-title tag="h3">Card {{ n }}</origam-title>
									      </origam-col>
								      </origam-row>
							      </origam-container>
						      </origam-sheet>
					      </origam-window-item>
				      </origam-window>
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
	import {
		OrigamCol,
		OrigamContainer,
		OrigamRow,
		OrigamSheet,
		OrigamTitle,
		OrigamWindow,
		OrigamWindowItem
	} from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'

	import type { IWindowProps } from '@origam/interfaces'

	import { reactive } from 'vue'

	const state: IWindowProps = reactive({
    showArrows: true,
    modelValue: 0
  })

</script>

<docs lang="md">

</docs>
