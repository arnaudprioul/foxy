<template>
	<component
			:is="tag"
			:id="id"
			:class="avatarClasses"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxui-avatar__wrapper">
			<slot name="default">
				<template v-if="hasImage">
					<div class="foxui-avatar__image">
						<slot name="avatar">
							<foxui-img
									key="image"
									cover
									v-bind="imageProps"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasIcon">
					<div class="foxui-avatar__icon">
						<slot name="icon">
							<foxui-icon
									key="icon"
									:icon="icon"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasText">
					<div class="foxui-avatar__text">
						<slot name="text">
							<span>{{ text }}</span>
						</slot>
					</div>
				</template>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiIcon, FoxuiImg } from '@foxui/components'

	import {
		useActive,
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useHover,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSize,
		useStatus,
		useStyle
	} from '@foxui/composables'

	import type { IAvatarProps, ISrcObject } from '@foxui/interfaces'
	import { isEmpty } from "@foxui/utils"

	import type { ComputedRef, StyleValue } from 'vue'
	import { computed, ref, useSlots } from 'vue'

	const props = withDefaults(defineProps<IAvatarProps>(), {tag: 'div', size: 'default'})

	defineEmits(['update:active', 'update:hover'])

	const {filterProps} = useProps<IAvatarProps>(props)

	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {hoverClasses, isHover, onMouseleave: handleMouseleave, onMouseenter: handleMouseenter} = useHover(props)
	const {activeClasses, isActive, onActive: handleClick} = useActive(props)
	const {colorStyles, bgColor} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {elevationClasses, elevationStyles} = useElevation(props, ref(false), bgColor)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {statusClasses} = useStatus(props)
	const slots = useSlots()

	const hasImage = computed(() => {
		return !isEmpty(props.image) || slots.image
	})
	const hasIcon = computed(() => {
		return !isEmpty(props.icon) || slots.icon
	})
	const hasText = computed(() => {
		return !isEmpty(props.text) || slots.text
	})

	const imageProps = computed(() => {
		const imgSrc: ISrcObject = {
			alt: 'avatar',
			aspectRatio: 1
		}

		if (typeof props.image === 'string') {
			imgSrc.src = props.image
		} else {
			Object.assign(imgSrc, props.image)
		}

		return imgSrc
	})

	// CLASS & STYLES

	const avatarStyles = computed(() => {
		return [
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			sizeStyles.value,
			colorStyles.value,
			elevationStyles.value,
			props.style
		] as StyleValue
	})
	const avatarClasses = computed(() => {
		return [
			'foxui-avatar',
			{
				'foxui-avatar--start': props.start,
				'foxui-avatar--end': props.end
			},
			densityClasses.value,
			roundedClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			sizeClasses.value,
			statusClasses.value,
			elevationClasses.value,
			hoverClasses.value,
			activeClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(avatarStyles)

	// EXPOSE

	defineExpose({
		filterProps,
		css,
		id,
		load,
		unload,
		isLoaded
	})
</script>

<style
		lang="scss"
		scoped
>
	.foxui-avatar {
		$this: &;

		line-height: var(--foxui-avatar---line-height);
		text-align: var(--foxui-avatar---text-align);
		font-size: var(--foxui-avatar---font-size);
		font-weight: var(--foxui-avatar---font-weight);
		letter-spacing: var(--foxui-avatar---letter-spacing);
		text-transform: var(--foxui-avatar---text-transform);

		height: calc(var(--foxui-avatar---height) - var(--foxui-avatar---density));
		width: calc(var(--foxui-avatar---width) - var(--foxui-avatar---density));

		overflow: var(--foxui-avatar---overflow);
		position: var(--foxui-avatar---position);

		transition: var(--foxui-avatar---transition);

		border-color: var(--foxui-avatar---border-color);
		border-style: var(--foxui-avatar---border-style);
		border-width: var(--foxui-avatar---border-width);
		border-radius: var(--foxui-avatar---border-radius);

		background: var(--foxui-avatar---background);
		box-shadow: var(--foxui-avatar---box-shadow);
		color: var(--foxui-avatar---color);

		padding-block-start: var(--foxui-avatar---padding-block-start);
		padding-block-end: var(--foxui-avatar---padding-block-end);
		padding-inline-start: var(--foxui-avatar---padding-inline-start);
		padding-inline-end: var(--foxui-avatar---padding-inline-end);
		margin-block-start: var(--foxui-avatar---margin-block-start);
		margin-block-end: var(--foxui-avatar---margin-block-end);
		margin-inline-start: var(--foxui-avatar---margin-inline-start);
		margin-inline-end: var(--foxui-avatar---margin-inline-end);

		&__wrapper {
			flex: var(--foxui-avatar__wrapper---flex);
			align-items: var(--foxui-avatar__wrapper---align-items);
			display: var(--foxui-avatar__wrapper---display);
			justify-content: var(--foxui-avatar__wrapper---justify-content);
			vertical-align: var(--foxui-avatar__wrapper---vertical-align);
			width: var(--foxui-avatar__wrapper---width);
			height: var(--foxui-avatar__wrapper---height);
			padding-block-start: var(--foxui-avatar__wrapper---padding-block-start);
			padding-block-end: var(--foxui-avatar__wrapper---padding-block-end);
			padding-inline-start: var(--foxui-avatar__wrapper---padding-inline-start);
			padding-inline-end: var(--foxui-avatar__wrapper---padding-inline-end);
			margin-block-start: var(--foxui-avatar__wrapper---margin-block-start);
			margin-block-end: var(--foxui-avatar__wrapper---margin-block-end);
			margin-inline-start: var(--foxui-avatar__wrapper---margin-inline-start);
			margin-inline-end: var(--foxui-avatar__wrapper---margin-inline-end);
		}

		&__image {
			width: var(--foxui-avatar__image---width);
			height: var(--foxui-avatar__image---height);

			&:deep(.foxui-img) {
				--foxui-img---height: 100%;
				--foxui-img---width: 100%;
			}
		}

		&--elevated {
			--foxui-avatar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxui-avatar---border-width: thin;
		}

		&--rounded {
			--foxui-avatar---border-radius: 50%;
		}

		&--density-comfortable {
			--foxui-avatar---density: 8px;
		}

		&--density-default {
			--foxui-avatar---density: 0px;
		}

		&--density-compact {
			--foxui-avatar---density: 8px;
		}

		&--size-x-small {
			--foxui-avatar---height: 24px;
			--foxui-avatar---width: 24px;
			--foxui-avatar---font-size: 1rem;
		}

		&--size-small {
			--foxui-avatar---height: 32px;
			--foxui-avatar---width: 32px;
			--foxui-avatar---font-size: 1.25rem;
		}

		&--size-default {
			--foxui-avatar---height: 40px;
			--foxui-avatar---width: 40px;
			--foxui-avatar---font-size: 1.5rem;
		}

		&--size-large {
			--foxui-avatar---height: 48px;
			--foxui-avatar---width: 48px;
			--foxui-avatar---font-size: 1.75rem;
		}

		&--size-x-large {
			--foxui-avatar---height: 56px;
			--foxui-avatar---width: 56px;
			--foxui-avatar---font-size: 2rem;
		}

		&--warning {
			--foxui-avatar---background-color: var(--foxui-status--warning---background-color, rgb(251, 140, 0));
			--foxui-avatar---color: var(--foxui-status--warning---color, #ffffff);
		}

		&--success {
			--foxui-avatar---background-color: var(--foxui-status--success---background-color, rgb(76, 175, 80));
			--foxui-avatar---color: var(--foxui-status--success---color, #ffffff);
		}

		&--info {
			--foxui-avatar---background-color: var(--foxui-status--info---background-color, rgb(33, 150, 243));
			--foxui-avatar---color: var(--foxui-status--info---color, #ffffff);
		}

		&--error {
			--foxui-avatar---background-color: var(--foxui-status--error---background-color, rgb(207, 102, 121));
			--foxui-avatar---color: var(--foxui-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {

		--foxui-avatar---text-align: center;
		--foxui-avatar---font-size: 1.5rem;
		--foxui-avatar---font-weight: 400;
		--foxui-avatar---letter-spacing: 0;
		--foxui-avatar---line-height: 1;;
		--foxui-avatar---text-transform: uppercase;
		--foxui-avatar---overflow: hidden;
		--foxui-avatar---position: relative;
		--foxui-avatar---height: 40px;
		--foxui-avatar---width: 40px;
		--foxui-avatar---density: 0px;
		--foxui-avatar---transition-duration: 0.2s;
		--foxui-avatar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-avatar---transition-property: width, height, font-size;
		--foxui-avatar---transition: var(--foxui-avatar---transition-property) var(--foxui-avatar---transition-duration) var(--foxui-avatar---transition-timing-function);
		--foxui-avatar---border-top-width: 0;
		--foxui-avatar---border-left-width: 0;
		--foxui-avatar---border-bottom-width: 0;
		--foxui-avatar---border-right-width: 0;
		--foxui-avatar---border-width: var(--foxui-avatar---border-top-width) var(--foxui-avatar---border-left-width) var(--foxui-avatar---border-bottom-width) var(--foxui-avatar---border-right-width);
		--foxui-avatar---border-color: currentColor;
		--foxui-avatar---border-style: solid;
		--foxui-avatar---border-radius: 0px;
		--foxui-avatar---box-shadow: none;
		--foxui-avatar---color: rgba(30, 30, 30, 0.87);
		--foxui-avatar---background: rgb(230, 230, 230);
		--foxui-avatar---margin-inline-start: 0;
		--foxui-avatar---margin-inline-end: 0;
		--foxui-avatar---margin-block-start: 0;
		--foxui-avatar---margin-block-end: 0;
		--foxui-avatar---padding-block-start: 0;
		--foxui-avatar---padding-block-end: 0;
		--foxui-avatar---padding-inline-start: 0;
		--foxui-avatar---padding-inline-end: 0;

		--foxui-avatar__wrapper---width: 100%;
		--foxui-avatar__wrapper---height: 100%;
		--foxui-avatar__wrapper---flex: none;
		--foxui-avatar__wrapper---align-items: center;
		--foxui-avatar__wrapper---display: inline-flex;
		--foxui-avatar__wrapper---justify-content: center;
		--foxui-avatar__wrapper---vertical-align: middle;
		--foxui-avatar__wrapper---margin-inline-start: 0;
		--foxui-avatar__wrapper---margin-inline-end: 0;
		--foxui-avatar__wrapper---margin-block-start: 0;
		--foxui-avatar__wrapper---margin-block-end: 0;
		--foxui-avatar__padding---margin-block-start: 0;
		--foxui-avatar__padding---margin-block-end: 0;
		--foxui-avatar__padding---margin-inline-start: 0;
		--foxui-avatar__padding---margin-inline-end: 0;

		--foxui-avatar__image---width: 100%;
		--foxui-avatar__image---height: 100%;
	}
</style>
