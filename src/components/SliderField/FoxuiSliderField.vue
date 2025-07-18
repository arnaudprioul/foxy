<template>
	<foxui-input
			ref="foxuiInputRef"
			:class="sliderFieldClasses"
			:focused="isFocused"
			:style="sliderFieldStyles"
			v-bind="{ ...inputProps}"
	>
		<template
				v-if="hasPrepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<div class="foxui-slider-field__label">
					<slot name="label">
						<foxui-label
								:for="id"
								:required="required"
								:text="label"
						/>
					</slot>
				</div>

				<div
						class="foxui-slider-field__container"
						@mousedown="handleSliderMousedown"
						@touchstartPassive="handleSliderTouchstart"
				>

					<foxui-slider-field-track
							ref="foxuiSliderFieldTrackRef"
							:start="0"
							:stop="trackStop"
							class="foxui-slider-field__track"
							v-bind="{...trackProps}"
					/>

					<template v-if="!isRange">
						<input
								:id="id"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model"
								tabindex="-1"
						/>

						<foxui-slider-field-thumb
								ref="foxuiSliderFieldThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused"
								:max="max"
								:min="min"
								:model-value="model"
								:position="trackStop"
								class="foxui-slider-field__thumb"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleFocus"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.label']"
									#default
							>
								<slot name="thumb.label"/>
							</template>
						</foxui-slider-field-thumb>
					</template>
					<template v-else>
						<input
								:id="`${id}__start`"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model[0]"
								tabindex="-1"
						/>

						<foxui-slider-field-thumb
								ref="foxuiSliderFieldStartThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused && activeThumbRef === foxuiSliderFieldStartThumbRef?.$el"
								:max="model[1]"
								:min="min"
								:model-value="model[0]"
								:position="trackRangeStart"
								class="foxui-slider-field__thumb foxui-slider-field__thumb--start"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleRangeFocusStart"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.labelStart']"
									#default
							>
								<slot name="thumb.labelStart"/>
							</template>
						</foxui-slider-field-thumb>

						<input
								:id="`${id}__stop`"
								:disabled="isDisabled"
								:name="name || id"
								:readonly="isReadonly"
								:value="model[1]"
								tabindex="-1"
						/>

						<foxui-slider-field-thumb
								ref="foxuiSliderFieldStopThumbRef"
								:aria-describedby="messagesId"
								:focused="isFocused && activeThumbRef === foxuiSliderFieldStopThumbRef?.$el"
								:max="max"
								:min="model[0]"
								:model-value="model[1]"
								:position="trackRangeStop"
								class="foxui-slider-field__thumb foxui-slider-field__thumb--stop"
								v-bind="{...thumbProps}"
								@blur="handleBlur"
								@focus="handleRangeFocusStop"
								@update:model-value="handleUpdateModelValue"
						>
							<template
									v-if="slots['thumb.labelStop']"
									#default
							>
								<slot name="thumb.labelStop"/>
							</template>
						</foxui-slider-field-thumb>
					</template>
				</div>
			</slot>
		</template>

		<template
				v-if="slots.append"
				#append
		>
			<slot name="append"/>
		</template>

		<template
				v-if="slots.details"
				#details="detailsSlotProps"
		>
			<slot
					name="details"
					v-bind="detailsSlotProps"
			/>
		</template>

		<template
				v-if="slots.messages"
				#messages="{hasMessages, messages}"
		>
			<slot
					name="messages"
					v-bind="{hasMessages, messages}"
			/>
		</template>

		<template
				v-if="slots.message"
				#message="{message}"
		>
			<slot
					name="message"
					v-bind="{message}"
			/>
		</template>
	</foxui-input>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiInput, FoxuiLabel, FoxuiSliderFieldThumb, FoxuiSliderFieldTrack } from '@foxui/components'

	import { useFocus, useProps, useRtl, useSlider, useSteps, useVModel } from '@foxui/composables'

	import { DENSITY, DIRECTION } from '@foxui/enums'

	import type { ISliderFieldProps } from "@foxui/interfaces"

	import type { TFoxuiInput, TFoxuiSliderFieldThumb, TFoxuiSliderFieldTrack } from '@foxui/types'

	import { getSliderFieldOffset, omit } from '@foxui/utils'

	import { computed, ref, StyleValue, useSlots, WritableComputedRef } from 'vue'

	const props = withDefaults(defineProps<ISliderFieldProps>(), {
		min: 0,
		max: 100,
		modelValue: 0,
		step: 0,
		direction: DIRECTION.HORIZONTAL,
		density: DENSITY.DEFAULT
	})

	const emits = defineEmits(['update:focused', 'update:modelValue', 'start', 'end'])

	const {filterProps} = useProps<ISliderFieldProps>(props)

	const foxuiInputRef = ref<TFoxuiInput>()
	const foxuiSliderFieldThumbRef = ref<TFoxuiSliderFieldThumb>()
	const foxuiSliderFieldTrackRef = ref<TFoxuiSliderFieldTrack>()
	const foxuiSliderFieldStartThumbRef = ref<TFoxuiSliderFieldThumb>()
	const foxuiSliderFieldStopThumbRef = ref<TFoxuiSliderFieldThumb>()

	const slots = useSlots()

	const isRange = computed(() => {
		return props.range
	})

	const steps = useSteps(props)
	const {
		activeThumbRef,
		min,
		max,
		mousePressed,
		roundValue,
		onSliderMousedown: handleSliderMousedown,
		onSliderTouchstart: handleSliderTouchstart,
		position,
		hasLabels
	} = useSlider({
		foxuiSliderFieldTrackRef,
		foxuiSliderFieldThumbRef,
		foxuiSliderFieldStartThumbRef,
		foxuiSliderFieldStopThumbRef,
		props,
		steps,
		onSliderStart: ({value}) => {
			if (!isRange.value) {
				model.value = roundValue(value)
			}

			emits('start', model.value)
		},
		onSliderEnd: ({value}) => {
			if (isRange.value) {
				const modelVal = model.value as [number, number]

				const newValue: [number, number] = activeThumbRef.value === foxuiSliderFieldStartThumbRef.value?.$el
						? [value, modelVal[1]]
						: [modelVal[0], value]

				if (newValue[0] < newValue[1]) {
					model.value = newValue
				}
			} else {
				model.value = roundValue(value)
			}

			emits('end', model.value)
		},
		onSliderMove: ({value}) => {
			if (isRange.value) {
				const [start, stop] = model.value as [number, number]

				if (start === stop && start !== min.value) {
					activeThumbRef.value = value > start ? foxuiSliderFieldStopThumbRef.value?.$el : foxuiSliderFieldStartThumbRef.value?.$el
					activeThumbRef.value?.focus()
				}

				if (activeThumbRef.value === foxuiSliderFieldStartThumbRef.value?.$el) {
					model.value = [Math.min(value, stop), stop]
				} else {
					model.value = [start, Math.max(start, value)]
				}
			} else {
				model.value = roundValue(value)
			}
		},
		getActiveThumb: (e: MouseEvent | TouchEvent) => {
			if (isRange.value) {
				if (!foxuiSliderFieldStartThumbRef.value || !foxuiSliderFieldStartThumbRef.value) return

				const startOffset = getSliderFieldOffset(e, foxuiSliderFieldStartThumbRef.value.$el, props.direction)
				const stopOffset = getSliderFieldOffset(e, foxuiSliderFieldStartThumbRef.value.$el, props.direction)

				const a = Math.abs(startOffset)
				const b = Math.abs(stopOffset)

				return (a < b || (a === b && startOffset < 0)) ? foxuiSliderFieldStartThumbRef.value.$el : foxuiSliderFieldStartThumbRef.value.$el
			} else {
				return foxuiSliderFieldThumbRef.value?.$el
			}
		}
	})
	const model = useVModel(
			props,
			'modelValue',
			isRange.value ? [min.value, max.value] : min.value,
			(value: number | string | Array<number> | Array<string> | undefined) => {
				if (isRange.value) {
					const array = value as Array<number> | Array<string>
					if (!array?.length) return [min.value, max.value]

					return array.map((val) => steps.roundValue(val))
				}

				return steps.roundValue(value == null ? steps.min.value : value as number | string)
			}
	) as WritableComputedRef<[number, number] | number> & { readonly externalValue: Array<number> | number }

	const {isFocused, onFocus, onBlur} = useFocus(props)
	const {rtlClasses} = useRtl()

	const handleFocus = () => {
		onFocus()
	}
	const handleRangeFocusStart = (e: FocusEvent) => {
		onFocus()

		const modelVal = model.value as [number, number]

		activeThumbRef.value = foxuiSliderFieldStartThumbRef.value?.$el

		// Make sure second thumb is focused if
		// the thumbs are on top of each other
		// and they are both at minimum value
		// but only if focused from outside.
		if (modelVal[0] === modelVal[1] && modelVal[1] === min.value && e.relatedTarget !== foxuiSliderFieldStopThumbRef.value?.$el) {
			foxuiSliderFieldStartThumbRef.value?.$el.blur()
			foxuiSliderFieldStopThumbRef.value?.$el.focus()
		}
	}
	const handleRangeFocusStop = (e: FocusEvent) => {
		onFocus()

		const modelVal = model.value as [number, number]

		activeThumbRef.value = foxuiSliderFieldStopThumbRef.value?.$el

		// Make sure second thumb is focused if
		// the thumbs are on top of each other
		// and they are both at minimum value
		// but only if focused from outside.
		if (modelVal[0] === modelVal[1] && modelVal[0] === max.value && e.relatedTarget !== foxuiSliderFieldStartThumbRef.value?.$el) {
			foxuiSliderFieldStopThumbRef.value?.$el.blur()
			foxuiSliderFieldStartThumbRef.value?.$el.focus()
		}
	}
	const handleBlur = () => {
		onBlur()

		if (isRange.value) {
			activeThumbRef.value = undefined
		}
	}

	const trackStop = computed(() => {
		if (isRange.value) return

		return position(model.value as number)
	})
	const trackRangeStart = computed(() => {
		if (!isRange.value) return

		const modelVal = model.value as [number, number]

		return position(modelVal[0] as number)
	})
	const trackRangeStop = computed(() => {
		if (!isRange.value) return

		const modelVal = model.value as [number, number]

		return position(modelVal[1] as number)
	})

	const handleUpdateModelValue = (v: number | [number, number]) => {
		model.value = v
	}

	const inputProps = computed(() => {
		return foxuiInputRef.value?.filterProps(props, ['modelValue', 'class', 'style', 'id', 'focused', 'centerAffix'])
	})
	const thumbProps = computed(() => {
		return omit(props.thumbProps ?? {}, ['modelValue', 'class', 'focused', 'min', 'max', 'position'])
	})
	const trackProps = computed(() => {
		return omit(props.trackProps ?? {}, ['class', 'start', 'stop'])
	})

	const hasPrepend = computed(() => {
		return !!(props.label) || slots.label || slots.prepend
	})

	// CLASS & STYLES

	const sliderFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const sliderFieldClasses = computed(() => {
		return [
			'foxui-slider-field',
			{
				'foxui-slider-field--has-labels': slots.tickLabel || hasLabels.value,
				'foxui-slider-field--focused': isFocused.value,
				'foxui-slider-field--pressed': mousePressed.value,
				'foxui-slider-field--disabled': props.disabled,
				'foxui-slider-field--range': isRange.value
			},
			rtlClasses.value,
			props.class
		]
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
	.foxui-slider-field {
		$this: &;

		&__container {
			position: relative;
			min-height: inherit;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;

			input {
				cursor: default;
				padding: 0;
				width: 100%;
				display: none;
			}
		}

		&__label {
			margin-inline-end: 12px;
		}

		&.foxui-input {
			:deep(.foxui-input__append),
			:deep(.foxui-input__prepend) {
				padding: 0;
			}

			&--disabled {
				pointer-events: none;

				#{$this}__container {
					opacity: 0.38;
				}
			}

			&--error {
				--foxui-slider-field__track---color: var(--foxui-slider-field--error__track---color, inherit);

				:not(.foxui-input--disabled) {
					--foxui-slider-field__track---background-color: var(--foxui-slider-field--error__track---background-color, currentColor);

					#{$this}__container {
						color: rgba(255, 0, 0, 1);
					}
				}
			}

			&--horizontal {
				align-items: center;
				margin-inline: 8px 8px;

				:deep(.foxui-input__control) {
					min-height: 32px;
					display: flex;
					align-items: center;
				}

				:deep(.foxui-slider-field-track) {
					display: flex;
					align-items: center;
					width: 100%;
					touch-action: pan-y;
					font-size: 0.5rem;
					padding: 0 5px;
					background-color: rgb(148, 148, 148);
					height: 14px;
					cursor: pointer;
					transition: 0.2s background-color cubic-bezier(0.4, 0, 0.2, 1);

					.foxui-slider-field-track__background {
						height: 14px;
					}

					.foxui-slider-field-track__fill {
						height: inherit;
					}

					.foxui-slider-field-track__tick {
						margin-top: calc(calc(14px + 2px) / 2);
					}

					.foxui-slider-field-track__tick-label {
						margin-top: calc(14px / 2 + 8px);
						transform: translateX(-50%);
					}

					.foxui-slider-field-track__tick--first {
						margin-inline-start: calc(14px + 1px);
						transform: translateX(0%);
					}

					.foxui-slider-field-track__tick--last {
						margin-inline-start: calc(100% - 14px - 1px);
						transform: translateX(-100%);
					}
				}

				:deep(.foxui-slider-field-thumb) {
					top: 50%;
					transform: translateY(-50%);
					inset-inline-start: calc(var(--foxui-slider-field-thumb---position) - var(--foxui-slider-field-thumb---size, 20) / 2);

					.foxui-slider-field-thumb__label-container {
						left: calc(var(--foxui-slider-field-thumb---size, 4) / 2);
						top: 0;
					}

					.foxui-slider-field-thumb__label {
						bottom: calc(var(--foxui-slider-field-thumb---size, 4) / 2);
						transform: translateX(-50%);

						&:before {
							border-left: 6px solid transparent;
							border-right: 6px solid transparent;
							border-top: 6px solid currentColor;
							bottom: -6px;
						}
					}
				}
			}

			&--vertical {
				justify-content: center;
				margin-top: 12px;
				margin-bottom: 12px;

				:deep(.foxui-input__control) {
					min-height: 300px;
				}

				:deep(.foxui-slider-field-track) {
					height: 100%;
					display: flex;
					justify-content: center;
					width: calc(var(--foxui-slider-field-track---size, 2) + 2px);
					touch-action: pan-x;

					.foxui-slider-field-track__background {
						width: var(--foxui-slider-field-track---size, 2);
					}

					.foxui-slider-field-track__fill {
						width: inherit;
					}

					.foxui-slider-field-track__ticks {
						height: 100%;
					}

					.foxui-slider-field-track__tick {
						margin-inline-start: calc(calc(var(--foxui-slider-field-track---size) + 2px) / 2);
						transform: translate(calc(var(--foxui-slider-field-track---size, 2) / -2), calc(var(--foxui-slider-field-track---size, 2) / 2));
					}

					.foxui-slider-field-track__tick--first {
						bottom: calc(0% + var(--foxui-slider-field-track---size, 2) + 1px);
					}

					.foxui-slider-field-track__tick--last {
						bottom: calc(100% - var(--foxui-slider-field-track---size, 2) - 1px);
					}

					.foxui-slider-field-track__tick-label {
						margin-inline-start: calc(var(--foxui-slider-field-track---size, 2) / 2 + 12px);
						transform: translateY(-50%);
					}
				}

				:deep(.foxui-slider-field-thumb) {
					top: calc(var(--foxui-slider-field-thumb---position) - var(--foxui-slider-field-thumb---size, 4) / 2);

					.foxui-slider-field-thumb__label-container {
						top: calc(var(--foxui-slider-field-thumb---size, 4) / 2);
						right: 0;
					}

					.foxui-slider-field-thumb__label {
						top: -12.5px;
						left: calc(var(--foxui-slider-field-thumb---size, 4) / 2);

						&:before {
							border-right: 6px solid currentColor;
							border-top: 6px solid transparent;
							border-bottom: 6px solid transparent;
							left: -6px;
						}
					}
				}
			}
		}

		&--has-labels {
			> :deep(.foxui-input__control) {
				margin-bottom: 4px;
			}
		}

		&--pressed {
			--foxui-slider-field---transition: var(--foxui-slider-field--pressed---transition, none);
		}

		&--focused {
			:deep(.foxui-slider-field-track) {
				.foxui-slider-field-track__tick {
					opacity: 1;
				}
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
