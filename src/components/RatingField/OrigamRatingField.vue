<template>
	<origam-input
			:id="id"
			ref="origamInputRef"
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
				<div class="origam-rating-field__label">
					<slot name="label">
						<origam-label
								:for="id"
								:required="required"
								:text="label"
						/>
					</slot>
				</div>

				<div class="origam-rating-field__empty">
					<origam-rating-field-item
							ref="origamRatingFieldItemRef"
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
					<div class="origam-rating-field__wrapper">
						<template v-if="hasLabels && labelOnTop && slots[`itemLabel.${index}`]">
							<slot :name="`itemLabel.${index}`">
								<slot name="itemLabel">
									<span>{{ itemLabels[index] ?? '&nbsp;' }}</span>
								</slot>
							</slot>
						</template>
						<div class="origam-rating-field__content">
							<template v-if="halfIncrements">
								<origam-rating-field-item
										:checked="isChecked(range - 0.5)"
										:index="index * 2"
										:value="range - 0.5"
										v-bind="{...itemState[index * 2], ...eventState[(index * 2) + 1]}"
								/>
								<origam-rating-field-item
										:checked="isChecked(range)"
										:index="(index * 2) + 1"
										:value="range"
										v-bind="{...itemState[(index * 2) + 1], ...eventState[(index * 2) + 2]}"
								/>
							</template>
							<template v-else>
								<origam-rating-field-item
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
	</origam-input>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, shallowRef, StyleValue, useAttrs, useSlots } from 'vue'
	import { OrigamInput, OrigamLabel, OrigamRatingFieldItem } from '../../components'

	import { useProps, useVModel } from '../../composables'

	import { BLOCK, DENSITY, SIZES } from '../../enums'

	import type { IRatingFieldProps } from '../../interfaces'

	import type { TOrigamInput, TOrigamRatingFieldItem } from "../../types"

	import { clamp, createRange, filterInputAttrs, getUid } from '../../utils'

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

	const origamInputRef = ref<TOrigamInput>()
	const origamRatingFieldItemRef = ref<TOrigamRatingFieldItem>()

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
		return props.name ?? `origam-rating-${getUid()}`
	})

	const hoverIndex = shallowRef(-1)

	const itemState = computed(() => {
		return increments.value.map((value) => {
			const isFilled = normalizedValue.value >= value
			const isHovered = hoverIndex.value >= value
			const isHovering = props.hover && hoverIndex.value > -1
			const ratingFieldItemProps = origamRatingFieldItemRef.value?.filterProps(props, ['class', 'style', 'id', 'name'])

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
		return origamInputRef.value?.filterProps(props, ['class', 'style', 'modelValue', 'id', 'focused'])
	})

	// CLASS & STYLES

	const ratingFieldStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const ratingFieldClasses = computed(() => {
		return [
			'origam-rating-field',
			{
				'origam-rating-field--hover': props.hover,
				'origam-rating-field--readonly': props.readonly
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
	.origam-rating-field {
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
