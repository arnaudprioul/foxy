<template>
	<foxy-btn-group
			ref="btnGroupRef"
			:class="btnToggleClasses"
			:styles="btnToggleStyles"
			v-bind="btnGroupProps">
		<template v-if="hasSlot('default')" #default>
			<slot name="default" v-bind="{items, isSelected, next, prev, select, selected }"/>
		</template>

		<template v-if="hasSlot('item')" #item="{item, index}">
			<slot name="item" v-bind="{item, index}"/>
		</template>
	</foxy-btn-group>
</template>

<script lang="ts" setup>
	import { FoxyBtnGroup } from '@foxy/components'

	import { useGroup, useProps, useSlots } from '@foxy/composables'

	import { FOXY_BTN_TOGGLE_KEY } from '@foxy/consts'

	import { DENSITY } from '@foxy/enums'

	import { IBtnToggleProps } from '@foxy/interfaces'

	import { TFoxyBtnGroup } from "@foxy/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IBtnToggleProps>(), {tag: 'div', items: [], density: DENSITY.DEFAULT})

	const emits = defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IBtnToggleProps>(props)

	const {isSelected, next, prev, select, selected} = useGroup(props, FOXY_BTN_TOGGLE_KEY)

	const {hasSlot} = useSlots()

	const btnGroupRef = ref<TFoxyBtnGroup>()

	const btnGroupProps = computed(() => {
		return btnGroupRef.value?.filterProps(props)
	})

	// CLASS & STYLES

	const btnToggleStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const btnToggleClasses = computed(() => {
		return [
			'foxy-btn-toggle',
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

<style lang="scss" scoped>

</style>

<style>
	:root {

	}
</style>
