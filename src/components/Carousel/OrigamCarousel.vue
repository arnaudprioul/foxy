<template>
	<origam-window
			ref="origamWindowRef"
			v-model="model"
			:class="carouselClasses"
			:style="carouselStyles"
			v-bind="windowProps"
	>
		<template #default="group">
			<slot
					name="default"
					v-bind="group"
			/>
		</template>

		<template #additional="group">
			<slot
					name="additional"
					v-bind="group"
			>
				<div
						v-if="!hideDelimiters"
						:style="carouselControlsStyles"
						class="origam-carousel__controls"
				>
					<template
							v-for="(item, index) in group.items.value"
							:key="index"
					>
						<slot
								:name="`item.${index}`"
								v-bind="{props: controlProps(item, index, group), item}"
						>
							<slot
									name="item"
									v-bind="{props: controlProps(item, index, group), item, index}"
							>
								<origam-btn v-bind="controlProps(item, index, group)"/>
							</slot>
						</slot>
					</template>
				</div>

				<template v-if="props.progress">
					<slot
							name="progress"
							v-bind="{percent: (group.getItemIndex(model.value) + 1) / group.items.value.length * 100}"
					>
						<origam-progress-linear
								:model-value="(group.getItemIndex(model.value) + 1) / group.items.value.length * 100"
								class="origam-carousel__progress"
						/>
					</slot>
				</template>
			</slot>
		</template>

		<template
				v-if="slots.prev"
				#prev="{props, canMove}"
		>
			<slot
					name="prev"
					v-bind="{props, canMove}"
			/>
		</template>

		<template
				v-if="slots.next"
				#next="{canMove, props}"
		>
			<slot
					name="next"
					v-bind="{props, canMove}"
			/>
		</template>

		<template
				v-if="slots.arrows"
				#arrows="{canMoveBack, canMoveForward, nextProps, prevProps}"
		>
			<slot
					name="arrows"
					v-bind="{canMoveBack, canMoveForward, nextProps, prevProps}"
			/>
		</template>
	</origam-window>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn, OrigamProgressLinear, OrigamWindow } from '../../components'

	import { useLocale, useProps, useVModel } from '../../composables'

	import { DENSITY, MDI_ICONS, SIZES } from '../../enums'

	import type { ICarouselProps, IGroupProvide } from '../../interfaces'

	import type { TOrigamWindow } from "../../types"

	import { convertToUnit } from '../../utils'

	import { computed, onMounted, ref, StyleValue, useSlots, watch } from 'vue'

	const props = withDefaults(defineProps<ICarouselProps>(), {
		delimiterIcon: MDI_ICONS.CIRCLE,
		height: 500,
		interval: 6000,
		continuous: true,
		mandatory: true,
		showArrows: true
	})

	defineEmits(['update:modelValue'])

	const {filterProps} = useProps<ICarouselProps>(props)
	const {t} = useLocale()

	const model = useVModel(props, 'modelValue')
	const origamWindowRef = ref<TOrigamWindow>()

	let slideTimeout = -1

	const startTimeout = () => {
		if (!props.cycle || !origamWindowRef.value) return

		slideTimeout = window.setTimeout(origamWindowRef.value.group.next, +props.interval > 0 ? +props.interval : 6000)
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
		return origamWindowRef.value?.filterProps(props, ['modelValue'])
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
					'aria-label': t('origam.carousel.ariaLabel.delimiter', index + 1, group.items.value.length),
					active: group.isSelected(item.id),
					class: [
						'origam-carousel__controls-item'
					],
					onClick: () => group.select(item.id, true),
					icon: props.delimiterIcon,
					size: SIZES.SMALL,
					density: DENSITY.COMPACT
				})
	}

	const slots = useSlots()

	// CLASS & STYLES

	const carouselStyles = computed(() => {
		return [
			{height: convertToUnit(props.height)},
			props.style
		] as StyleValue
	})
	const carouselClasses = computed(() => {
		return [
			'origam-carousel',
			{
				'origam-carousel--hide-delimiter-background': props.hideDelimiterBackground,
				'origam-carousel--vertical-delimiters': props.verticalDelimiters
			},
			props.class
		]
	})
	const carouselControlsStyles = computed(() => {
		return [
			{
				left: (props.verticalDelimiters === 'left') && props.verticalDelimiters ? 0 : 'auto',
				right: (props.verticalDelimiters === 'right') ? 0 : 'auto'
			},
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
	.origam-carousel {
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

			> .origam-item-group {
				flex: 0 1 auto;
			}
		}

		&__controls-item {
			margin: 0 8px;

			.origam-icon {
				opacity: 0.5;
			}

			&--active {
				.origam-icon {
					opacity: 1;
					vertical-align: middle;
				}
			}

			&:hover {
				background: none;

				.origam-icon {
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
