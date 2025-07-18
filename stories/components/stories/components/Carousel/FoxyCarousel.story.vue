<template>
  <Story
      auto-props-disabled
      group="components"
      title="Carousel"
  >
    <Variant title="Default">
      <template #default>
	      <foxui-container>
		      <foxui-row
              :align="ALIGN.CENTER"
              :justify="JUSTIFY.CENTER"
          >
			      <foxui-col cols="12">
				      <foxui-carousel v-bind="state">
					      <foxui-carousel-item
                    cover
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                />
					      <foxui-carousel-item
                    cover
                    src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
                />
					      <foxui-carousel-item
                    cover
                    src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
                />
				      </foxui-carousel>
			      </foxui-col>
		      </foxui-row>
	      </foxui-container>
      </template>

      <template #controls>
        <hst-checkbox
            v-model="state.continuous"
            title="Continuous"
        />

        <hst-checkbox
            v-model="state.cycle"
            title="Cycle"
        />

        <hst-icon
            v-model="state.delimiterIcon as string"
            title="Delimiter Icon"
        />

        <hst-checkbox
            v-model="state.hideDelimiterBackground"
            title="Hide Delimiter Background"
        />

        <hst-checkbox
            v-model="state.hideDelimiters"
            title="Hide Delimiters"
        />

        <hst-icon
            v-model="state.nextIcon as string"
            title="Next Icon"
        />
        <hst-icon
            v-model="state.prevIcon as string"
            title="Prev Icon"
        />

        <hst-checkbox
            v-model="state.showArrows"
            title="Show Arrows"
        />

        <hst-checkbox
            v-model="state.reverse"
            title="Reverse"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxuiCarousel, FoxuiCarouselItem, FoxuiCol, FoxuiContainer, FoxuiRow } from '@foxui/components'

	import { ALIGN, JUSTIFY } from '@foxui/enums'

	import type { ICarouselProps } from '@foxui/interfaces'

	import { HstIcon } from '@stories/components/controls'

	import { reactive } from 'vue'

	const state: Partial<ICarouselProps> = reactive({
    continuous: true,
    showArrows: true,
    color: "#ffc529",
    bgColor: "#7d6fa1"
  })
</script>

<docs lang="md">

</docs>
