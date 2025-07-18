<template>
	<foxui-input
			:id="id"
			ref="foxuiInputRef"
			v-model="model"
			:class="ratingFieldClasses"
			:style="ratingFieldStyles"
			v-bind="{...rootAttrs, ...inputProps}"
	>
		<template
				v-if="slots.prepend"
				#prepend
		>
			<slot name="prepend"/>
		</template>

		<template #default="{id,messagesId,isDisabled,isReadonly,isValid}">
			<slot
					name="default"
					v-bind="{id,messagesId,isDisabled,isReadonly,isValid}"
			>
				<div class="foxui-rating-field__label">
					<slot name="label">
						<foxui-label
								:for="id"
								:required="required"
								:text="label"
						/>
					</slot>
				</div>

				<div class="foxui-rating-field__empty">
					<foxui-rating-field-item
							ref="foxuiRatingFieldItemRef"
							:index="-1"
							:show-star="false"
							:value="0"
							v-bind="{...itemState[0], ...eventState[0]}"
					/>
				</div>

				<template
						v-for="(range, index) in ranges"
						:key="index"
				>
					<div class="foxui-rating-field__wrapper">
						<template v-if="hasLabels && labelOnTop && slots[`itemLabel.${index}`]">
							<slot :name="`itemLabel.${index}`">
								<slot name="itemLabel">
									<span>{{ itemLabels[index] ?? '&nbsp;' }}</span>
								</slot>
							</slot>
						</template>
						<div class="foxui-rating-field__content">
							<template v-if="halfIncrements">
								<foxui-rating-field-item
										:checked="isChecked(range - 0.5)"
										:index="index * 2"
										:value="range - 0.5"
										v-bind="{...itemState[index * 2], ...eventState[(index * 2) + 1]}"
								/>
								<foxui-rating-field-item
										:checked="isChecked(range)"
										:index="(index * 2) + 1"
										:value="range"
										v-bind="{...itemState[(index * 2) + 1], ...eventState[(index * 2) + 2]}"
								/>
							</template>
							<template v-else>
								<foxui-rating-field-item
										:checked="isChecked(range)"
										:index="index"
										:value="range"
										v-bind="{...itemState[index], ...eventState[index + 1]}"
								/>
							</template>
						</div>
						<template v-if="hasLabels && labelOnBottom && slots[`itemLabel.${index}`]">
							<slot :name="`itemLabel.${index}`">
								<slot name="itemLabel">
									<span>{{ itemLabels[index] ?? '&nbsp;' }}</span>
								</slot>
							</slot>
						</template>
					</div>
				</template>
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
	import { FoxuiInput, FoxuiLabel, FoxuiRatingFieldItem } from '@foxui/components'

	import { useProps, useVModel } from '@foxui/composables'

	import { BLOCK, DENSITY, SIZES } from '@foxui/enums'

	import type { IRatingFieldProps } from '@foxui/interfaces'

	import type { TFoxuiInput, TFoxuiRatingFieldItem } from "@foxui/types"

	import { clamp, createRange, filterInputAttrs, getUid } from '@foxui/utils'

	import { computed, ref, shallowRef, StyleValue, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<IRatingFieldProps>(), {
		length: 5,
		modelValue: 0,
		itemLabelPosition: BLOCK.TOP,
		tag: 'div',
		density: DENSITY.DEFAULT,
		size: SIZES.DEFAULT
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<IRatingFieldProps>(props)

	const foxuiInputRef = ref<TFoxuiInput>()
	const foxuiRatingFieldItemRef = ref<TFoxuiRatingFieldItem>()

	const slots = useSlots()

	const model = useVModel(props, 'modelValue')
	const attrs = useAttrs()

	const normalizedValue = computed(() => {
		return clamp(parseFloat(model.value), 0, +props.length)
	})
	const ranges = computed(() => {
		return createRange(Number(props.length), 1)
	})
	const increments = computed(() => {
		return ranges.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v])
	})
	const name = computed(() => {
		return props.name ?? `foxui-rating-${getUid()}`
	})

	const hoverIndex = shallowRef(-1)

	const itemState = computed(() => {
		return increments.value.map((value) => {
			const isFilled = normalizedValue.value >= value
			const isHovered = hoverIndex.value >= value
			const isHovering = props.hover && hoverIndex.value > -1
			const ratingFieldItemProps = foxuiRatingFieldItemRef.value?.filterProps(props, ['class', 'style', 'id', 'name'])

			return {isFilled, isHovered, isHovering, name: name.value, ...ratingFieldItemProps}
		})
	})
	const eventState = computed(() => {
		return [0, ...increments.value].map((value) => {
			const onMouseenter = () => {
				hoverIndex.value = value
			}

			const onMouseleave = () => {
				hoverIndex.value = -1
			}

			const onClick = () => {
				if (props.disabled || props.readonly) return
				model.value = normalizedValue.value === value && props.clearable ? 0 : value
			}

			return {
				onMouseenter: props.hover ? onMouseenter : undefined,
				onMouseleave: props.hover ? onMouseleave : undefined,
				onClick
			}
		})
	})
	const isChecked = (value: number) => {
		return normalizedValue.value === value
	}

	const hasLabels = computed(() => {
		return !!props.itemLabels?.length || slots.itemLabel
	})
	const labelOnTop = computed(() => {
		return props.itemLabelPosition === BLOCK.TOP
	})
	const labelOnBottom = computed(() => {
		return props.itemLabelPosition === BLOCK.BOTTOM
	})

	const [rootAttrs, _controlAttrs] = filterInputAttrs(attrs)

	const inputProps = computed(() => {
		return foxuiInputRef.value?.filterProps(props, ['class', 'style', 'modelValue', 'id', 'focused'])
	})

	// CLASS & STYLES

	const ratingFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const ratingFieldClasses = computed(() => {
		return [
			'foxui-rating-field',
			{
				'foxui-rating-field--hover': props.hover,
				'foxui-rating-field--readonly': props.readonly
			},
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
	.foxui-rating-field {
		max-width: 100%;
		display: inline-flex;
		white-space: nowrap;

		&__wrapper {
			align-items: center;
			display: inline-flex;
			flex-direction: column;
		}

		&__content {
			display: inline-flex;
			position: relative;
		}

		&--readonly {
			pointer-events: none;
		}

		&--hover {

		}
	}
</style>
<style>
	:root {

	}
</style>
