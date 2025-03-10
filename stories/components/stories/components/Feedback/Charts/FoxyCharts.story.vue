<template>
  <Story
      auto-props-disabled
      group="components"
      title="Feedback/Charts"
  >
	  <Variant title="Grid Axis" :meta="{centering: true}">
		  <template #default>
			  <foxy-container>
				  <foxy-row :align-content="ALIGN.CENTER" :justify="JUSTIFY.CENTER">
					  <foxy-col>
						  <foxy-chart v-bind="state"/>
					  </foxy-col>
				  </foxy-row>
			  </foxy-container>
		  </template>
	  </Variant>
<!--    <Variant title="Line" :meta="{centering: true}">-->
<!--      <template #default>-->
<!--        <foxy-container>-->
<!--          <foxy-row :align-content="ALIGN.CENTER" :justify="JUSTIFY.CENTER">-->
<!--            <foxy-col>-->
<!--              <foxy-chart :type="CHART_TYPE.LINE" v-bind="stateLine"/>-->
<!--            </foxy-col>-->
<!--          </foxy-row>-->
<!--        </foxy-container>-->
<!--      </template>-->
<!--    </Variant>-->

<!--	  <Variant title="Bar" :meta="{centering: true}">-->
<!--		  <template #default>-->
<!--			  <foxy-container>-->
<!--				  <foxy-row :align-content="ALIGN.CENTER" :justify="JUSTIFY.CENTER">-->
<!--					  <foxy-col>-->
<!--						  <foxy-chart :type="CHART_TYPE.BAR" v-bind="stateBar"/>-->
<!--					  </foxy-col>-->
<!--				  </foxy-row>-->
<!--			  </foxy-container>-->
<!--		  </template>-->
<!--	  </Variant>-->

    <template #controls>

    </template>
  </Story>
</template>

<script lang="ts" setup>
	import { FoxyChart, FoxyCol, FoxyContainer, FoxyRow } from '@foxy/components'

  import { ALIGN, CHART_TYPE, JUSTIFY } from '@foxy/enums'

	import {
		IChartBarProps,
		IChartLineProps, IChartProps
	} from '@foxy/interfaces'

  import { reactive } from 'vue'

	const gradients = [
		['#222'],
		['#42b3f4'],
		['red', 'orange', 'yellow'],
		['purple', 'violet'],
		['#00c6ff', '#F0F', '#FF0'],
		['#f72047', '#ffd200', '#1feaea'],
	]

	const state: Partial<IChartProps> = reactive ({
		title: 'Chart Grid Axis',
		items: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]
	})

  const stateLine: Partial<IChartLineProps> = reactive({
	  lineWidth: 2,
	  smooth: 10,
	  padding: 8,
	  gradient: gradients[5],
	  items: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
	  gradientDirection: 'top',
	  fill: false,
	  autoDraw: true
  })

	const stateBar: Partial<IChartBarProps> = reactive({
		lineWidth: 2,
		smooth: false,
		padding: 8,
		gradient: gradients[5],
		modelValue: [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0],
		gradientDirection: 'top',
		autoLineWidth: false,
		autoDraw: true
	})

</script>
<docs lang="md">

</docs>
