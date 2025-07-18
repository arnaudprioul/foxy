<template>
  <Story
      auto-props-disabled
      group="components"
      title="Pagination"
  >
    <Variant title="Default">
      <template #default>
	      <origam-container fullscreen>
		      <origam-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <origam-col>
				      <origam-pagination v-bind="state"/>
			      </origam-col>
		      </origam-row>
	      </origam-container>
      </template>
      <template #controls>
        <hst-text
            v-model="state.ellipsis"
            title="ellipsis"
        />

        <hst-text
            v-model="state.ariaLabel"
            title="ariaLabel"
        />
        <hst-text
            v-model="state.pageAriaLabel"
            title="pageAriaLabel"
        />
        <hst-text
            v-model="state.currentPageAriaLabel"
            title="currentPageAriaLabel"
        />
        <hst-text
            v-model="state.firstAriaLabel"
            title="firstAriaLabel"
        />
        <hst-text
            v-model="state.previousAriaLabel"
            title="previousAriaLabel"
        />
        <hst-text
            v-model="state.nextAriaLabel"
            title="nextAriaLabel"
        />
        <hst-text
            v-model="state.lastAriaLabel"
            title="lastAriaLabel"
        />

        <hst-icon
            v-model="state.prevIcon"
            title="prevIcon"
        />
        <hst-icon
            v-model="state.nextIcon"
            title="nextIcon"
        />
        <hst-icon
            v-model="state.firstIcon"
            title="firstIcon"
        />
        <hst-icon
            v-model="state.lastIcon"
            title="lastIcon"
        />

        <hst-checkbox
            v-model="state.showFirstLastPage"
            title="showFirstLastPage"
        />

        <hst-slider
            v-model="state.length"
            :max="20"
            :min="1"
            title="length"
        />
        <hst-number
            v-model="state.start"
            title="start"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { OrigamCol, OrigamContainer, OrigamPagination, OrigamRow } from '@origam/components'

	import { ALIGN, JUSTIFY } from '@origam/enums'
	import { HstIcon } from "@stories/components/controls"

	import { reactive } from 'vue'

	const state: { [key: string]: any } = reactive({})
</script>
<docs lang="md">

</docs>
