<template>
	<div
			:aria-orientation="direction"
			:aria-readonly="!!readonly"
			:aria-valuemax="max"
			:aria-valuemin="min"
			:aria-valuenow="modelValue"
			:class="sliderFieldThumbClasses"
			:style="sliderFieldThumbStyles"
			:tabindex="isDisabled ? -1 : 0"
			role="slider"
			@keydown="!isReadonly ? handleKeydown : undefined"
	>
		<div
				:class="sliderFieldThumbSurfaceClasses"
				:style="sliderFieldThumbSurfaceStyles"
		/>

		<div
				v-ripple="rippleProps"
				:style="sliderFieldThumbRippleStyles"
				class="origam-slider-field-thumb__ripple"
		/>

		<origam-translate-scale origin="bottom center">
			<div
					v-show="showLabel"
					class="origam-slider-field-thumb__label-container"
			>
				<div class="origam-slider-field-thumb__label">
					<slot
							name="default"
							v-bind="{ modelValue: props.modelValue }"
					>
						<span>{{ label }}</span>
					</slot>
				</div>
			</div>
		</origam-translate-scale>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue } from 'vue'
	import { OrigamTranslateScale } from '../../components'

	import { useBorder, useElevation, useProps, useRounded, useTextColor } from '../../composables'

	import { ORIGAM_SLIDER_FIELD_KEY } from '../../consts'

	import { vRipple } from '../../directives'

	import { KEYBOARD_VALUES } from '../../enums'

	import type { ISliderFieldThumbProps } from "../../interfaces"

	import { clamp, convertToUnit, int } from '../../utils'

	const props = withDefaults(defineProps<ISliderFieldThumbProps>(), {
		ripple: true,
		size: 20,
		min: 0,
		max: 100,
		modelValue: 0,
		position: 0
	})

	const emits = defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ISliderFieldThumbProps>(props)

	const slider = inject(ORIGAM_SLIDER_FIELD_KEY)

	if (!slider) throw new Error('[Origam] -slider-thumb must be used inside -slider')

	const {
		step,
		error,
		color: sliderColor,
		elevation: sliderElevation,
		rounded: sliderRounded,
		border: sliderBorder,
		ripple: sliderRipple,
		disabled,
		readonly,
		isReversed,
		isVertical,
		mousePressed,
		decimals,
		indexFromEnd
	} = slider

	const isDisabled = computed(() => {
		return props.disabled ?? disabled.value
	})
	const isReadonly = computed(() => {
		return props.readonly ?? readonly.value
	})
	const color = computed(() => {
		return error || isDisabled.value ? undefined : sliderColor.value ?? props.color
	})
	const size = computed(() => {
		if (typeof props?.size === 'number') {
			return int(props.size)
		}

		return 20
	})
	const positionPercentage = computed(() => {
		return convertToUnit(indexFromEnd.value ? 100 - props.position : props.position, '%')
	})

	const elevationProps = computed(() => {
		return !isDisabled.value ? props.elevation ?? sliderElevation.value : undefined
	})
	const roundedProps = computed(() => {
		return props.rounded ?? sliderRounded.value
	})
	const borderProps = computed(() => {
		return props.border ?? sliderBorder.value
	})
	const rippleProps = computed(() => {
		return !isDisabled.value && !isReadonly.value ? [(props.ripple || sliderRipple), null, [
			'circle', 'center']] : undefined
	})

	const {elevationClasses} = useElevation(elevationProps)
	const {borderClasses, borderStyles} = useBorder(borderProps)
	const {roundedClasses, roundedStyles} = useRounded(roundedProps)

	const {textColorStyles} = useTextColor(color)

	const relevantKeys = [KEYBOARD_VALUES.PAGEUP, KEYBOARD_VALUES.PAGEDOWN, KEYBOARD_VALUES.END, KEYBOARD_VALUES.HOME, KEYBOARD_VALUES.LEFT, KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP]

	const multipliers = computed(() => {
		if (step.value) return [1, 2, 3]
		else return [1, 5, 10]
	})

	const parseKeydown = (e: KeyboardEvent, value: number) => {
		if (!relevantKeys.includes(e.key as typeof relevantKeys[number])) return

		e.preventDefault()

		const _step = step.value || 0.1
		const steps = (props.max - props.min) / _step
		const keyValue = [KEYBOARD_VALUES.LEFT, KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP]
		if (keyValue.includes(e.key as typeof keyValue[number])) {
			const increase = isVertical.value
					? [KEYBOARD_VALUES.RIGHT, isReversed.value ? KEYBOARD_VALUES.DOWN : KEYBOARD_VALUES.UP]
					: [KEYBOARD_VALUES.RIGHT, KEYBOARD_VALUES.UP]
			const direction = increase.includes(e.key as typeof increase[number]) ? 1 : -1
			const multiplier = e.shiftKey ? 2 : (e.ctrlKey ? 1 : 0)

			value = value + (direction * _step * multipliers.value[multiplier])
		} else if (e.key === KEYBOARD_VALUES.HOME) {
			value = props.min
		} else if (e.key === KEYBOARD_VALUES.END) {
			value = props.max
		} else {
			const direction = e.key === KEYBOARD_VALUES.PAGEDOWN ? 1 : -1
			value = value - (direction * _step * (steps > 100 ? steps / 10 : 10))
		}

		return clamp(value, props.min, props.max)
	}
	const handleKeydown = (e: KeyboardEvent) => {
		const newValue = parseKeydown(e, props.modelValue)

		if (newValue !== null && newValue !== undefined) {
			emits('update:modelValue', newValue)
		}
	}

	const showLabel = computed(() => {
		return (props.label && props.focused) || props.label === 'always'
	})
	const label = computed(() => {
		return props.modelValue.toFixed(step.value ? decimals.value : 1)
	})

	// CLASS & STYLES

	const sliderFieldThumbStyles = computed(() => {
		return [
			{
				'--origam-slider-field-thumb---position': positionPercentage.value,
				'--origam-slider-field-thumb---size': convertToUnit(size.value)
			},
			props.style
		] as StyleValue
	})
	const sliderFieldThumbClasses = computed(() => {
		return [
			'origam-slider-field-thumb',
			{
				'origam-slider-field-thumb--focused': props.focused,
				'origam-slider-field-thumb--pressed': props.focused && mousePressed.value
			},
			props.class
		]
	})
	const sliderFieldThumbSurfaceStyles = computed(() => {
		return [
			borderStyles.value,
			roundedStyles.value,
			textColorStyles.value,
			props.style
		] as StyleValue
	})
	const sliderFieldThumbSurfaceClasses = computed(() => {
		return [
			'origam-slider-field-thumb__surface',
			elevationClasses.value,
			borderClasses.value,
			roundedClasses.value
		]
	})
	const sliderFieldThumbRippleStyles = computed(() => {
		return [
			textColorStyles.value,
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style
		lang="scss"
		scoped
>
	.origam-slider-field-thumb {
		$this: &;

		touch-action: none;
		color: rgba(66, 66, 66, 1);
		outline: none;
		position: absolute;
		transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);

		&__label {
			background: rgba(66, 66, 66, 0.7);
			color: rgba(66, 66, 66, 1);

			&:before {
				color: rgba(66, 66, 66, 0.7);
			}
		}

		&__surface {
			cursor: pointer;
			width: var(--origam-slider-field-thumb---size, 20);
			height: var(--origam-slider-field-thumb---size, 20);
			border-radius: 50%;
			user-select: none;
			background-color: currentColor;

			@media (forced-colors: active) {
				background-color: highlight;
			}

			&:before {
				transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
				content: "";
				color: inherit;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border-radius: 50%;
				background: currentColor;
				position: absolute;
				pointer-events: none;
				opacity: 0;
			}

			&:after {
				content: "";
				width: 42px;
				height: 42px;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		&__label-container {
			position: absolute;
			transition: 0.2s cubic-bezier(0.4, 0, 1, 1);
		}

		&__label {
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 0.75rem;
			min-width: 35px;
			height: 25px;
			border-radius: 4px;
			padding: 6px;
			position: absolute;
			user-select: none;
			transition: 0.2s cubic-bezier(0.4, 0, 1, 1);

			&:before {
				content: "";
				width: 0;
				height: 0;
				position: absolute;
			}
		}

		&__ripple {
			position: absolute;
			left: calc(var(--origam-slider-field-thumb---size, 20) / -2);
			top: calc(var(--origam-range-slider-thumb---size, 20) / -2);
			width: calc(var(--origam-range-slider-thumb---size, 20) * 2);
			height: calc(var(--origam-range-slider-thumb---size, 20) * 2);
			background: inherit;
		}

		&--focused {
			#{$this}__surface {
				&:before {
					transform: scale(2);
					opacity: 0.12;
				}
			}
		}

		&--pressed {
			transition: none;

			#{$this}__surface {
				&:before {
					opacity: 0.12;
				}
			}
		}

		@media (hover: hover) {
			&:hover {
				#{$this}__surface {
					&:before {
						transform: scale(2);
					}
				}

				&:not(#{$this}--focused) {
					#{$this}__surface {
						&:before {
							opacity: 0.04;
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
