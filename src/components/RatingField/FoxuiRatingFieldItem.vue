<template>
	<component
			:is="tag"
			:class="ratingFieldItemClasses"
			:style="ratingFieldItemStyles"
	>
		<label :for="id">
			<span class="foxui-rating-field-item__hidden">{{ t(itemAriaLabel, value, length) }}</span>
			<slot
					v-if="showStar"
					name="item"
					v-bind="{props: ratingBtnProps, value}"
			>
				<foxui-btn
						ref="foxuiBtnRef"
						v-bind="{...ratingBtnProps}"
						@click="handleClick"
						@mouseenter="handleMouseEnter"
						@mouseleave="handleMouseLeave"
				/>
			</slot>
		</label>

		<input
				:id="id"
				:checked="checked"
				:disabled="disabled"
				:name="name"
				:readonly="readonly"
				:value="value"
				class="foxui-rating-field-item__hidden"
				tabindex="-1"
				type="radio"
		/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiBtn } from '@foxui/components'

	import { useLocale, useProps } from "@foxui/composables"

	import { MDI_ICONS } from "@foxui/enums"

	import type { IRatingFieldItemProps } from '@foxui/interfaces'

	import type { TFoxuiBtn } from "@foxui/types"

	import { computed, ref, StyleValue } from 'vue'

	const props = withDefaults(defineProps<IRatingFieldItemProps>(), {
		index: -1,
		showStar: true,
		emptyIcon: MDI_ICONS.STAR_OUTLINE,
		fullIcon: MDI_ICONS.STAR,
		tag: 'div',
		itemAriaLabel: 'foxui.rating.ariaLabel.item'
	})

	const emits = defineEmits(['mouseenter', 'mouseleave', 'click'])

	const {filterProps} = useProps<IRatingFieldItemProps>(props)

	const {t} = useLocale()

	const foxuiBtnRef = ref<TFoxuiBtn>()

	const id = computed(() => {
		return `${props.name}-${String(props.value).replace('.', '-')}`
	})

	const ratingBtnProps = computed(() => {
		const isFullIcon = props.isHovering ? props.isHovered : props.isFilled
		const icon = isFullIcon ? props.fullIcon : props.emptyIcon
		const btnProps = foxuiBtnRef.value?.filterProps(props, ['class', 'style', 'id', 'bgColor', 'activeBgColor', 'hoverBgColor'])

		return {...btnProps, icon}
	})

	const handleMouseEnter = (e: MouseEvent) => {
		emits('mouseenter', e)
	}
	const handleMouseLeave = (e: MouseEvent) => {
		emits('mouseleave', e)
	}
	const handleClick = (e: Event) => {
		emits('click', e)
	}

	// CLASS & STYLES

	const ratingFieldItemStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const ratingFieldItemClasses = computed(() => {
		return [
			'foxui-rating-field-item',
			{
				'foxui-rating-field-item--half': props.halfIncrements && props.value % 1 > 0,
				'foxui-rating-field-item--full': props.halfIncrements && props.value % 1 === 0
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
	.foxui-rating-field-item {
		&__label {
			cursor: pointer;

			.foxui-btn {
				opacity: 1;
				transition-property: transform;

				:deep(.foxui-icon) {
					transition: inherit;
					transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
				}
			}
		}

		&__hidden {
			height: 0;
			opacity: 0;
			position: absolute;
			width: 0;
		}

		&--full {

		}

		&--half {
			overflow: hidden;
			position: absolute;
			clip-path: polygon(0 0, 50% 0, 50% 100%, 0 100%);
			z-index: 1;

			&,
			&:hover {
				:deep(.foxui-btn__overlay) {
					opacity: 0;
				}
			}
		}
	}
</style>

<style>

</style>
