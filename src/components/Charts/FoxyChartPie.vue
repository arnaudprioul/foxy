<template>
	<svg display="block">

		<defs>
			<linearGradient
					:id="id"
					:x1="gradientDirection === INLINE.LEFT ? '100%' : '0'"
					:x2="gradientDirection === INLINE.RIGHT ? '100%' : '0'"
					:y1="gradientDirection === BLOCK.TOP ? '100%' : '0'"
					:y2="gradientDirection === BLOCK.BOTTOM ? '100%' : '0'"
					gradientUnits="userSpaceOnUse"
			>
				<template v-for="(color, index) in gradientData">
					<stop
							:offset="index / (Math.max(gradientData.length - 1, 1))"
							:stop-color="color || 'currentColor'"
					/>
				</template>
			</linearGradient>
		</defs>

		<g
				aria-hidden="false"
				class="highcharts-series-group"
				data-z-index="3"
		>
				<path
						class="highcharts-halo highcharts-color-0"
						d="M 314.97669978549726 36.100002372814686 A 114.4 114.4 0 0 1 369.5243665114174 251.07063913751682 L 369.04775491603783 250.19152515904202 A 113.4 113.4 0 0 0 314.976903458701 37.100002352073304 Z"
						data-z-index="-1"
						fill="#94d13d"
						fill-opacity="0.25"
						visibility="hidden"
				></path>
				<path
						aria-label="Item 1, 80."
						class="highcharts-point highcharts-color-0"
						d="M 314.97669978549726 36.100002372814686 A 114.4 114.4 0 0 1 369.5243665114174 251.07063913751682 L 315 150.5 A 0 0 0 0 0 315 150.5 Z"
						fill="rgb(148,209,61)"
						opacity="1"
						role="img"
						stroke="#ffffff"
						stroke-linejoin="round"
						stroke-width="1"
						style="outline: none;"
						tabindex="-1"
						transform="translate(0,0)"
				></path>
				<path
						aria-label="Item 2, 60."
						class="highcharts-point highcharts-color-1"
						d="M 369.42376862686064 251.12511320962545 A 114.4 114.4 0 0 1 200.99946556071953 160.05186618197865 L 315 150.5 A 0 0 0 0 0 315 150.5 Z"
						fill="rgb(111,88,233)"
						opacity="1"
						role="img"
						stroke="#ffffff"
						stroke-linejoin="round"
						stroke-width="1"
						style="outline: none;"
						tabindex="-1"
						transform="translate(0,0)"
				></path>
				<path
						aria-label="Item 3, 30."
						class="highcharts-point highcharts-color-2"
						d="M 200.989970696392 159.93786089060677 A 114.4 114.4 0 0 1 244.6437281254743 60.29271089364329 L 315 150.5 A 0 0 0 0 0 315 150.5 Z"
						fill="rgb(45,153,254)"
						opacity="1"
						role="img"
						stroke="#ffffff"
						stroke-linejoin="round"
						stroke-width="1"
						style="outline: none;"
						tabindex="-1"
						transform="translate(0,0)"
				></path>
				<path
						aria-label="Item 4, 20."
						class="highcharts-point highcharts-color-3"
						d="M 244.73397057767912 60.222399737135575 A 114.4 114.4 0 0 1 314.8411006950846 36.10011035402657 L 315 150.5 A 0 0 0 0 0 315 150.5 Z"
						fill="rgb(45,218,193)"
						opacity="1"
						role="img"
						stroke="#ffffff"
						stroke-linejoin="round"
						stroke-width="1"
						style="outline: none;"
						tabindex="-1"
						transform="translate(0,0)"
				></path>
		</g>
	</svg>
</template>

<script
		lang="ts"
		setup
>

</script>

<style
		lang="scss"
		scoped
>

</style>
