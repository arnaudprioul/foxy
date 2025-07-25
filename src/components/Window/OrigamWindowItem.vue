<template>
	<origam-transition
			:disabled="!isBooted"
			:transition="transition"
	>
		<div
				v-show="isShown"
				v-touch
				:class="windowItemClasses"
				:style="windowItemStyles"
		>
			<slot
					v-if="hasContent"
					name="default"
			/>
		</div>
	</origam-transition>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, nextTick, shallowRef, StyleValue } from 'vue'
	import { OrigamTransition } from '../../components'

	import { useGroupItem, useLazy, useProps, useSsrBoot } from '../../composables'

	import { ORIGAM_WINDOW_GROUP_KEY, ORIGAM_WINDOW_KEY } from '../../consts'

	import { vTouch } from '../../directives'

	import type { IWindowItemProps } from '../../interfaces'

	import { convertToUnit } from '../../utils'

	const props = withDefaults(defineProps<IWindowItemProps>(), {
		transition: undefined,
		reverseTransition: undefined
	})

	defineEmits(['group:selected'])

	const {filterProps} = useProps<IWindowItemProps>(props)

	const window = inject(ORIGAM_WINDOW_KEY)
	const groupItem = useGroupItem(props, ORIGAM_WINDOW_GROUP_KEY)
	const {isBooted} = useSsrBoot()

	if (!window || !groupItem) throw new Error('[Origam] window-item must be used inside window')

	const isTransitioning = shallowRef(false)
	const hasTransition = computed(() => {
		return isBooted.value && (window.isReversed.value ? props.reverseTransition !== false : props.transition !== false)
	})

	const handleAfterTransition = () => {
		if (!isTransitioning.value || !window) {
			return
		}

		// Finalize transition state.
		isTransitioning.value = false
		if (window.transitionCount.value > 0) {
			window.transitionCount.value -= 1

			// Remove container height if we are out of transition.
			if (window.transitionCount.value === 0) {
				window.transitionHeight.value = undefined
			}
		}
	}

	const handleBeforeTransition = () => {
		if (isTransitioning.value || !window) {
			return
		}

		// Initialize transition state here.
		isTransitioning.value = true

		if (window.transitionCount.value === 0) {
			// Set initial height for height transition.
			window.transitionHeight.value = convertToUnit(window.rootRef.value?.clientHeight)
		}

		window.transitionCount.value += 1
	}

	const handleTransitionCancelled = () => {
		handleAfterTransition() // This should have the same path as normal transition end.
	}

	const handleEnterTransition = (el: Element) => {
		if (!isTransitioning.value) {
			return
		}

		nextTick(() => {
			// Do not set height if no transition or cancelled.
			if (!hasTransition.value || !isTransitioning.value || !window) {
				return
			}

			// Set transition target height.
			window.transitionHeight.value = convertToUnit(el.clientHeight)
		})
	}

	const transition = computed(() => {
		const name = window.isReversed.value
				? props.reverseTransition
				: props.transition

		const trans: false | { name: string | undefined, [key: string]: any } = !hasTransition.value ? false : {
			name: typeof name !== 'string' ? window.transition.value : name
		}

		if (hasTransition.value) {
			if (!isBooted.value && typeof trans !== 'boolean') {
				trans!.onBeforeEnter = handleBeforeTransition
				trans!.onAfterEnter = handleAfterTransition
				trans!.onEnterCancelled = handleTransitionCancelled
				trans!.onBeforeLeave = handleBeforeTransition
				trans!.onAfterLeave = handleAfterTransition
				trans!.onLeaveCancelled = handleTransitionCancelled
				trans!.onEnter = handleEnterTransition
			}
		}

		return trans
	})

	const isShown = computed(() => {
		return groupItem.isSelected.value
	})

	const {hasContent} = useLazy(props, groupItem.isSelected)

	// CLASS & STYLES

	const windowItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const windowItemClasses = computed(() => {
		return [
			'origam-window-item',
			groupItem.selectedClass.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss">
	.origam-window-item {
		&--x-transition-enter-active,
		&--x-transition-leave-active,
		&--x-reverse-transition-enter-active,
		&--x-reverse-transition-leave-active,
		&--y-transition-enter-active,
		&--y-transition-leave-active,
		&--y-reverse-transition-enter-active,
		&--y-reverse-transition-leave-active {
			transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		}

		&--x-transition-leave-from,
		&--x-transition-leave-to,
		&--x-reverse-transition-leave-from,
		&--x-reverse-transition-leave-to,
		&--y-transition-leave-from,
		&--y-transition-leave-to,
		&--y-reverse-transition-leave-from,
		&--y-reverse-transition-leave-to {
			position: absolute !important;
			top: 0;
			width: 100%;
		}

		&--x-transition-enter-from {
			transform: translateX(100%);
		}

		&--x-transition-leave-to {
			transform: translateX(-100%);
		}

		&--x-reverse-transition-enter-from {
			transform: translateX(-100%);
		}

		&--x-reverse-transition-leave-to {
			transform: translateX(100%);
		}

		&--y-transition-enter-from {
			transform: translateY(100%);
		}

		&--y-transition-leave-to {
			transform: translateY(-100%);
		}

		&--y-reverse-transition-enter-from {
			transform: translateY(-100%);
		}

		&--y-reverse-transition-leave-to {
			transform: translateY(100%);
		}
	}
</style>

<style>
	:root {

	}
</style>
