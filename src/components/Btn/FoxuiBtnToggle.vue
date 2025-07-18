<template>
	<foxui-btn-group
			ref="foxuiBtnGroupRef"
			:class="btnToggleClasses"
			:styles="btnToggleStyles"
			v-bind="btnGroupProps"
	>
		<template
				v-if="slots.default"
				#default
		>
			<slot
					name="default"
					v-bind="{items, isSelected, next, prev, select, selected }"
			/>
		</template>

		<template
				v-if="slots.item"
				#item="{item, index}"
		>
			<slot
					name="item"
					v-bind="{item, index}"
			/>
		</template>
	</foxui-btn-group>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiBtnGroup } from '@foxui/components'

	import { useGroup, useProps } from '@foxui/composables'

	import { FOXUI_BTN_TOGGLE_KEY } from '@foxui/consts'

	import { DENSITY } from '@foxui/enums'

	import type { IBtnToggleProps } from '@foxui/interfaces'

	import type { TFoxuiBtnGroup } from "@foxui/types"

	import { computed, ref, StyleValue, useSlots } from 'vue'

	const props = withDefaults(defineProps<IBtnToggleProps>(), {tag: 'div', items: () => [], density: DENSITY.DEFAULT})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IBtnToggleProps>(props)

	const {isSelected, next, prev, select, selected} = useGroup(props, FOXUI_BTN_TOGGLE_KEY)

	const slots = useSlots()

	const foxuiBtnGroupRef = ref<TFoxuiBtnGroup>()

	const btnGroupProps = computed(() => {
		return foxuiBtnGroupRef.value?.filterProps(props)
	})

	// CLASS & STYLES

	const btnToggleStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const btnToggleClasses = computed(() => {
		return [
			'foxui-btn-toggle',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		next,
		prev,
		select,
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>

</style>

<style>
	:root {

	}
</style>
