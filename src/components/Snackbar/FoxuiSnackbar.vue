<template>
	<foxui-overlay
			ref="foxuiOverlayRef"
			v-model="isActive"
			:class="snackbarClasses"
			:content-props="contentProps"
			:scrim="false"
			:scroll-strategy="SCROLL_STRATEGIES.NONE"
			:style="snackbarStyles"
			disable-global-stack
			no-click-animation
			persistent
			v-bind="{ ...overlayProps, ...scopeId }"
			@touchend="handleTouchend"
			@touchstart-passive="handleTouchstart"
	>
		<template #default>
      <span
		      key="underlay"
		      class="foxui-snackbar__underlay"
      />

			<div
					v-if="props.timer && !isHovering"
					key="timer"
					class="foxui-snackbar__timer"
			>
				<foxui-progress
						ref="foxuiProgressRef"
						:max="props.timeout"
						:model-value="countdown.time.value"
						:type="PROGRESS_TYPE.LINEAR"
				/>
			</div>

			<div
					v-if="hasContent"
					key="content"
					aria-live="polite"
					class="foxui-snackbar__content"
					role="status"
			>
				<template v-if="hasPrepend">
					<div class="foxui-snackbar__prepend">
						<slot name="prepend">
							<foxui-icon
									v-if="hasIcon"
									key="prepend-icon"
									:icon="icon as TIcon"
									:size="28"
							/>
						</slot>
					</div>
				</template>

				<slot name="text">
					<span>{{ text }}</span>
				</slot>

				<slot name="default"/>
			</div>

			<div
					v-if="slots.action"
					class="foxui-snackbar__actions"
			>
				<slot
						name="action"
						v-bind="{ isActive }"
				/>
			</div>

		</template>
	</foxui-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiIcon, FoxuiOverlay, FoxuiProgress, FoxuiSnack } from '@foxui/components'

	import {
		useBorder,
		useBothColor,
		useCountdown,
		useElevation,
		useLayout,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded,
		useScopeId,
		useStatus,
		useToggleScope,
		useVModel
	} from '@foxui/composables'

	import { FOXUI_LAYOUT_KEY } from '@foxui/consts'

	import { PROGRESS_TYPE, SCROLL_STRATEGIES } from '@foxui/enums'

	import type { ISnackbarProps } from "@foxui/interfaces"

	import type { TFoxuiOverlay, TFoxuiProgress, TIcon, TTransitionProps } from '@foxui/types'

	import { forwardRefs, refElement } from '@foxui/utils'

	import {
		computed,
		inject,
		mergeProps,
		onMounted,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		watch,
		watchEffect
	} from 'vue'

	const props = withDefaults(defineProps<ISnackbarProps>(), {
		timeout: 5000,
		location: 'bottom',
		border: true,
		rounded: true,
		elevation: 1,
		transition: () => ({
			component: FoxuiSnack
		}) as unknown as TTransitionProps
	})

	const {filterProps} = useProps<ISnackbarProps>(props)

	const slots = useSlots()

	const isActive = useVModel(props, 'modelValue')
	const {positionClasses} = usePosition(props)
	const {scopeId} = useScopeId()
	const countdown = useCountdown(Number(props.timeout))
	const {icon, statusClasses} = useStatus(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {elevationClasses} = useElevation(props)

	const foxuiOverlayRef = ref<TFoxuiOverlay>()
	const foxuiProgressRef = ref<TFoxuiProgress>()
	const isHovering = shallowRef(false)
	const startY = shallowRef(0)
	const mainStyles = ref()
	const hasLayout = inject(FOXUI_LAYOUT_KEY, undefined)

	useToggleScope(() => !!hasLayout, () => {
		const layout = useLayout()

		watchEffect(() => {
			mainStyles.value = layout.mainStyles.value
		})
	})

	let activeTimeout = -1
	const startTimeout = () => {
		countdown.reset()
		window.clearTimeout(activeTimeout)
		const timeout = Number(props.timeout)

		if (!isActive.value || timeout === -1) return

		const element = refElement(foxuiProgressRef.value)

		countdown.start(element)

		activeTimeout = window.setTimeout(() => {
			isActive.value = false
		}, timeout)
	}
	const clearTimeout = () => {
		countdown.reset()
		window.clearTimeout(activeTimeout)
	}

	watch(isActive, startTimeout)
	watch(() => props.timeout, startTimeout)

	onMounted(() => {
		if (isActive.value) startTimeout()
	})

	const handlePointerenter = () => {
		isHovering.value = true
		clearTimeout()
	}
	const handlePointerleave = () => {
		isHovering.value = false
		startTimeout()
	}
	const handleTouchstart = (event: TouchEvent) => {
		startY.value = event.touches[0].clientY
	}
	const handleTouchend = (event: TouchEvent) => {
		if (Math.abs(startY.value - event.changedTouches[0].clientY) > 50) {
			isActive.value = false
		}
	}

	const overlayProps = computed(() => {
		return foxuiOverlayRef.value?.filterProps(props, ['class', 'style', 'id', 'contentProps', 'modelValue', 'disableGlobalStack', 'noClickAnimation', 'persistent', 'scrim', 'scrollStrategy'])
	})
	const contentProps = computed(() => {
		return mergeProps({
			class: [
				'foxui-snackbar__wrapper'
			],
			style: [
				colorStyles.value,
				roundedStyles.value,
				borderStyles.value,
				paddingStyles.value,
				marginStyles.value
			],
			onPointerenter: handlePointerenter,
			onPointerleave: handlePointerleave
		}, props.contentProps)
	})

	const hasPrepend = computed(() => {
		return !!(slots['prepend'] || icon.value)
	})
	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})
	const hasContent = slots.default || slots.text || !!(props.text) || hasPrepend.value

	// CLASS & STYLES

	const locationClasses = computed(() => {
		return props.location.split(' ').reduce((acc, loc) => {
			acc[`foxui-snackbar--${loc}`] = true

			return acc
		}, {} as Record<string, any>)
	})
	const snackbarStyles = computed(() => {
		return [
			mainStyles.value,
			props.style
		] as StyleValue
	})
	const snackbarClasses = computed(() => {
		return [
			'foxui-snackbar',
			{
				'foxui-snackbar--active': isActive.value,
				'foxui-snackbar--multi-line': props.multiLine && !props.vertical,
				'foxui-snackbar--timer': !!props.timer,
				'foxui-snackbar--vertical': props.vertical
			},
			locationClasses.value,
			positionClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
			statusClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxuiOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.foxui-snackbar {
		$this: &;

		justify-content: center;
		z-index: 10000;
		margin: 8px;
		margin-inline-end: calc(8px + 0px);
		padding: var(--foxui-layout---position-top) var(--foxui-layout---position-right) var(--foxui-layout---position-bottom) var(--foxui-layout---position-left);

		&:not(#{$this}--center) {
			&:not(#{$this}--top) {
				align-items: flex-end;
			}
		}

		:deep(#{$this}__wrapper) {
			align-items: center;
			display: flex;
			max-width: 672px;
			min-height: 48px;
			min-width: 344px;
			overflow: hidden;
			padding: 0;
		}

		&__underlay {
			position: absolute;
		}

		&__content {
			flex-grow: 1;
			font-size: 0.875rem;
			font-weight: 400;
			letter-spacing: 0.0178571429em;
			line-height: 1.425;
			margin-right: auto;
			padding: 14px 16px;
			text-align: initial;
			align-items: center;
			display: flex;
		}

		&__prepend {
			margin-inline-end: 12px;
		}

		&__actions {
			align-items: center;
			align-self: center;
			display: flex;
			margin-inline-end: 8px;

			> .foxui-btn {
				padding: 0 8px;
				min-width: auto;
			}
		}

		&__timer {
			width: 100%;
			position: absolute;
			top: 0;

			:deep(.foxui-progress-linear) {
				transition: 0.2s linear;
			}
		}

		&--border {
			:deep(#{$this}__wrapper) {
				border-width: thin;
				border-style: solid;
				box-shadow: none;
			}
		}

		&--rounded {
			:deep(#{$this}__wrapper) {
				border-radius: 4px;
			}
		}

		&--absolute {
			position: absolute;
			z-index: 1;
		}

		&--multi-line {
			#{$this}__wrapper {
				min-height: 68px;
			}
		}

		&--vertical {
			#{$this}__wrapper {
				flex-direction: column;

				#{$this}__actions {
					align-self: flex-end;
					margin-bottom: 8px;
				}
			}
		}

		&--center {
			align-items: center;
			justify-content: center;
		}

		&--top {
			align-items: flex-start;
		}

		&--bottom {
			align-items: flex-end;
		}

		&--left,
		&--start {
			justify-content: flex-start;
		}

		&--right, &--end {
			justify-content: flex-end;
		}
	}
</style>

<style>
	:root {

	}
</style>
