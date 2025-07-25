<template>
	<div
			:id="name"
			:class="selectionControlGroupClasses"
			:style="selectionControlGroupStyles"
	>
		<slot
				name="default"
				v-bind="{items}"
		>
			<template
					v-for="(item, index) in items"
					:key="index"
			>
				<slot
						:name="`item.${index}`"
						v-bind="{item}"
				>
					<slot
							name="item"
							v-bind="{item}"
					/>
				</slot>
			</template>
		</slot>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, onScopeDispose, provide, StyleValue } from 'vue'
	import { useProps, useVModel } from '../../composables'

	import { ORIGAM_SELECTION_CONTROL_GROUP_KEY } from '../../consts'

	import { DENSITY } from '../../enums'

	import type { ISelectionControlGroupProps } from "../../interfaces"

	import { getUid } from '../../utils'

	const props = withDefaults(defineProps<ISelectionControlGroupProps>(), {
		tag: 'div',
		density: DENSITY.DEFAULT,
		items: () => []
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ISelectionControlGroupProps>(props)

	const modelValue = useVModel(props, 'modelValue')
	const uid = getUid()
	const id = computed(() => {
		return props.id || `origam-selection-control-group-${uid}`
	})
	const name = computed(() => {
		return props.name || id.value
	})

	const updateHandlers = new Set<() => void>()

	provide(ORIGAM_SELECTION_CONTROL_GROUP_KEY, {
		modelValue,
		forceUpdate: () => {
			updateHandlers.forEach(fn => fn())
		},
		onForceUpdate: (cb) => {
			updateHandlers.add(cb)

			onScopeDispose(() => {
				updateHandlers.delete(cb)
			})
		}
	})

	// CLASS & STYLES

	const selectionControlGroupStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const selectionControlGroupClasses = computed(() => {
		return [
			'origam-selection-control-group',
			{'origam-selection-control-group--inline': props.inline},
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
