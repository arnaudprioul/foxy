<template>
	<foxy-window
			ref="windowRef"
			v-model="model"
			:class="carouselClasses"
			:style="carouselStyles"
			v-bind="windowProps">
		<template #default="group">
			<slot name="default" v-bind="group"/>
		</template>

		<template #additional="group">
			<slot name="additional" v-bind="group">
				<div v-if="!hideDelimiters" :style="carouselControlsStyles" class="foxy-carousel__controls">
					<template v-for="(item, index) in group.items.value" :key="index">
						<slot :name="`item.${index}`" v-bind="{props: controlProps(item, index, group), item}">
							<slot name="item" v-bind="{props: controlProps(item, index, group), item, index}">
								<foxy-btn v-bind="controlProps(item, index, group)"/>
							</slot>
						</slot>
					</template>
				</div>

				<template v-if="props.progress">
					<slot name="progress"
					      v-bind="{percent: (group.getItemIndex(model.value) + 1) / group.items.value.length * 100}">
						<foxy-progress-linear
								:modelValue="(group.getItemIndex(model.value) + 1) / group.items.value.length * 100"
								class="foxy-carousel__progress"
						/>
					</slot>
				</template>
			</slot>
		</template>

		<template v-if="hasSlot('prev')" #prev="{props, canMove}">
			<slot name="prev" v-bind="{props, canMove}"/>
		</template>

		<template v-if="hasSlot('next')" #next="{canMove, props}">
			<slot name="next" v-bind="{props, canMove}"/>
		</template>

		<template v-if="hasSlot('arrows')" #arrows="{canMoveBack, canMoveForward, nextProps, prevProps}">
			<slot name="arrows" v-bind="{canMoveBack, canMoveForward, nextProps, prevProps}"/>
		</template>
	</foxy-window>
</template>

<script lang="ts" setup>
	import { FoxyBtn, FoxyProgressLinear, FoxyWindow } from '@foxy/components'

	import { useProps, useSlots, useVModel } from '@foxy/composables'

	import { DENSITY, SIZES } from '@foxy/enums'

	import { ICarouselProps, IGroupProvide } from '@foxy/interfaces'

	import { TFoxyWindow } from "@foxy/types"

	import { convertToUnit } from '@foxy/utils'

	import { computed, onMounted, ref, StyleValue, watch } from 'vue'

	const props = withDefaults(defineProps<ICarouselProps>(), {
		delimiterIcon: '$delimiter',
		height: 500,
		interval: 6000,
		continuous: true,
		mandatory: true,
		showArrows: true
	})

	const emits = defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ICarouselProps>(props)

	const model = useVModel(props, 'modelValue')
	const windowRef = ref<TFoxyWindow>()

	let slideTimeout = -1

	const startTimeout = () => {
		if (!props.cycle || !windowRef.value) return

		slideTimeout = window.setTimeout(windowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000)
	}

	const restartTimeout = () => {
		window.clearTimeout(slideTimeout)
		window.requestAnimationFrame(startTimeout)
	}

	watch(model, restartTimeout)
	watch(() => props.interval, restartTimeout)
	watch(() => props.cycle, (val) => {
		if (val) restartTimeout()
		else window.clearTimeout(slideTimeout)
	})

	onMounted(startTimeout)

	const windowProps = computed(() => {
		return windowRef.value?.filterProps(props, ['modelValue'])
	})

	const controlProps = (item: {
		id: number
		value: unknown
		disabled: boolean | undefined
	}, index: number, group: IGroupProvide) => {
		return Object.assign({},
				item,
				{
					id: `carousel-item-${item.id}`,
					'aria-label': `Carousel slide ${index + 1} of ${group.items.value.length}`,
					active: group.isSelected(item.id),
					class: [
						'foxy-carousel__controls-item'
					],
					onClick: () => group.select(item.id, true),
					icon: props.delimiterIcon,
					size: SIZES.SMALL,
					density: DENSITY.COMPACT
				})
	}

	const {hasSlot} = useSlots()

	// CLASS & STYLES

	const carouselStyles = computed(() => {
		return [
			{height: convertToUnit(props.height)},
			props.style
		] as StyleValue
	})
	const carouselClasses = computed(() => {
		return [
			'foxy-carousel',
			{
				'foxy-carousel--hide-delimiter-background': props.hideDelimiterBackground,
				'foxy-carousel--vertical-delimiters': props.verticalDelimiters
			},
			props.class
		]
	})
	const carouselControlsStyles = computed(() => {
		return [
			{
				left: (props.verticalDelimiters === 'left' || props.verticalDelimiters === 'start') && props.verticalDelimiters ? 0 : 'auto',
				right: (props.verticalDelimiters === 'right' || props.verticalDelimiters === 'end') ? 0 : 'auto'
			},
			props.style
		] as StyleValue
	})

	// EXPOSE

	defineExpose({
		filterProps
	})

</script>

<style lang="scss" scoped>
	.foxy-carousel {
		$this: &;

		overflow: hidden;
		position: relative;
		width: 100%;

		&__controls {
			align-items: center;
			bottom: 0;
			display: flex;
			height: 50px;
			justify-content: center;
			list-style-type: none;
			position: absolute;
			width: 100%;
			z-index: 1;

			> .foxy-item-group {
				flex: 0 1 auto;
			}
		}

		&__controls-item {
			margin: 0 8px;

			.foxy-icon {
				opacity: 0.5;
			}

			&--active {
				.foxy-icon {
					opacity: 1;
					vertical-align: middle;
				}
			}

			&:hover {
				background: none;

				.foxy-icon {
					opacity: 0.8;
				}
			}
		}

		&__progress {
			margin: 0;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
		}

		&--hide-delimiter-background {
			#{$this}__controls {
				background: transparent;
			}
		}

		&--vertical-delimiters {
			#{$this}__controls {
				flex-direction: column;
				height: 100% !important;
				width: 50px;
			}
		}
	}
</style>

<style>
	:root {

	}
</style>
