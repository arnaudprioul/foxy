<template>
	<component
			:is="tag"
			ref="rootRef"
			v-touch="touchOptions"
			:class="windowClasses"
			:style="windowStyles"
	>
		<div
				:style="windowContainerStyles"
				class="origam-window__container"
		>
			<slot
					name="default"
					v-bind="group"
			/>

			<div
					v-if="showArrows !== false"
					class="origam-window__controls"
			>
				<slot
						name="arrows"
						v-bind="{prevProps, nextProps, canMoveBack, canMoveForward}"
				>
					<slot
							name="prev"
							v-bind="{ props: prevProps, canMove: canMoveBack }"
					>
						<origam-btn
								v-if="canMoveBack"
								v-bind="prevProps"
						/>
					</slot>

					<origam-spacer v-if="!canMoveBack"/>

					<slot
							name="next"
							v-bind="{ props: nextProps, canMove: canMoveForward }"
					>
						<origam-btn
								v-if="canMoveForward"
								v-bind="nextProps"
						/>
					</slot>
				</slot>
			</div>
		</div>

		<slot
				name="additional"
				v-bind="group"
		/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, provide, ref, shallowRef, StyleValue, watch } from 'vue'
	import { OrigamBtn, OrigamSpacer } from '../../components'

	import { useGroup, useLocale, useProps } from '../../composables'

	import { ORIGAM_WINDOW_GROUP_KEY, ORIGAM_WINDOW_KEY } from '../../consts'

	import { vTouch } from '../../directives'

	import { AXIS, DIRECTION, MDI_ICONS } from '../../enums'

	import type { ITouchHandlers, IWindowProps } from '../../interfaces'

	const props = withDefaults(defineProps<IWindowProps>(), {
		prevIcon: MDI_ICONS.CHEVRON_RIGHT,
		nextIcon: MDI_ICONS.CHEVRON_LEFT,
		touch: undefined,
		direction: DIRECTION.HORIZONTAL,
		selectedClass: 'origam-window-item--active',
		mandatory: true,
		tag: 'div'
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IWindowProps>(props)

	const {t} = useLocale()

	const group = useGroup(props, ORIGAM_WINDOW_GROUP_KEY)

	const rootRef = ref()
	const isReversed = shallowRef(false)
	const transition = computed(() => {
		const axis = props.direction === DIRECTION.VERTICAL ? AXIS.Y : AXIS.X
		const reverse = props.reverse ? !isReversed.value : isReversed.value
		const direction = reverse ? '-reverse' : ''

		return `origam-window-item--${axis}${direction}-transition`
	})
	const transitionCount = shallowRef(0)
	const transitionHeight = ref<undefined | string>(undefined)

	const activeIndex = computed(() => {
		return group.items.value.findIndex(item => group.selected.value.includes(item.id))
	})

	watch(activeIndex, (newVal, oldVal) => {
		const itemsLength = group.items.value.length
		const lastIndex = itemsLength - 1

		if (itemsLength <= 2) {
			isReversed.value = newVal < oldVal
		} else if (newVal === lastIndex && oldVal === 0) {
			isReversed.value = true
		} else if (newVal === 0 && oldVal === lastIndex) {
			isReversed.value = false
		} else {
			isReversed.value = newVal < oldVal
		}
	})

	provide(ORIGAM_WINDOW_KEY, {
		transition,
		isReversed,
		transitionCount,
		transitionHeight,
		rootRef
	})

	const canMoveBack = computed(() => props.continuous || activeIndex.value !== 0)
	const canMoveForward = computed(() => props.continuous || activeIndex.value !== group.items.value.length - 1)

	const prevProps = {
		icon: props.prevIcon,
		class: `origam-window__prev`,
		onClick: group.prev,
		'aria-label': t('origam.carousel.prev')
	}

	const prev = () => {
		if (canMoveBack.value) {
			isReversed.value = true
			group.prev()
		}
	}

	const nextProps = {
		icon: props.nextIcon,
		class: `origam-window__next`,
		onClick: group.next,
		'aria-label': t('origam.carousel.next')
	}

	const next = () => {
		if (canMoveForward.value) {
			isReversed.value = false
			group.next()
		}
	}

	const touchOptions = computed(() => {
		if (props.touch === false) return props.touch

		const options: ITouchHandlers = {
			left: () => {
				next()
			},
			right: () => {
				prev()
			},
			start: ({originalEvent}) => {
				originalEvent.stopPropagation()
			}
		}

		return {
			...options,
			...(props.touch === true ? {} : props.touch)
		}
	})

	// CLASS & STYLES

	const windowStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const windowClasses = computed(() => {
		return [
			'origam-window',
			{
				'origam-window--show-arrows-on-hover': props.showArrows === 'hover'
			},
			props.class
		]
	})
	const windowContainerStyles = computed(() => {
		return [
			{
				height: transitionHeight
			},
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps,
		group
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-window {
		$this: &;

		overflow: hidden;

		&__container {
			display: flex;
			flex-direction: column;
			height: inherit;
			position: relative;
			transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
		}

		&__controls {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 16px;
			pointer-events: none;

			> * {
				pointer-events: auto;
			}
		}

		&--show-arrows-on-hover {
			overflow: hidden;

			#{$this}__prev {
				transform: translateX(-200%);
			}

			#{$this}__next {
				transform: translateX(200%);
			}

			&:hover {
				#{$this}__prev,
				#{$this}__next {
					transform: translateX(0);
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
