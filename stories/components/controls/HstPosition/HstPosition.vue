<template>
	<hst-select
			v-model="position"
			:options="positionList"
			title="Position"
	/>

	<template v-if="isPositionable">
		<hst-text
				v-model="top"
				title="Top"
		/>
		<hst-text
				v-model="bottom"
				title="Bottom"
		/>
		<hst-text
				v-model="left"
				title="Left"
		/>
		<hst-text
				v-model="right"
				title="Right"
		/>
	</template>
</template>

<script
		lang="ts"
		setup
>
	import { useVModel } from "@foxy/composables"
	import { POSITION } from "@foxy/enums"
	import type { IPositionProps } from "@foxy/interfaces"
	import type { TPosition } from "@foxy/types"

	import { positionList } from "@stories/const/position.const"
	import { computed, shallowRef, ShallowRef, watchEffect } from "vue"

	const props = defineProps<IPositionProps>()

	const position = useVModel(props, 'position', POSITION.STATIC)

	// POSITIONABLE (RELATIVE, ABSOLUTE, FIXED)
	const top = useVModel(props, 'top', '')
	const bottom = useVModel(props, 'bottom', '')
	const left = useVModel(props, 'left', '')
	const right = useVModel(props, 'right', '')

	const positionable: ShallowRef<Partial<Array<TPosition>>> = shallowRef([POSITION.RELATIVE, POSITION.FIXED, POSITION.ABSOLUTE])

	const isPositionable = computed(() => {
		return positionable.value.includes(position.value)
	})

	watchEffect(() => {
		if (!isPositionable.value) {
			top.value = ''
			bottom.value = ''
			left.value = ''
			right.value = ''
		}
	})

	// STICKABLE (STICKY)
	// TODO - Make code to manage sticky offset
</script>
