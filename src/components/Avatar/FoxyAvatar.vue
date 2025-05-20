<template>
	<component
			:is="tag"
			:id="id"
			:class="avatarClasses"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxy-avatar__wrapper">
			<slot name="default">
				<template v-if="hasImage">
					<div class="foxy-avatar__image">
						<slot name="avatar">
							<foxy-img
									key="image"
									cover
									v-bind="imageProps"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasIcon">
					<div class="foxy-avatar__icon">
						<slot name="icon">
							<foxy-icon
									key="icon"
									:icon="icon"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasText">
					<div class="foxy-avatar__text">
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
	import { FoxyIcon, FoxyImg } from '@foxy/components'

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
	} from '@foxy/composables'

	import type { IAvatarProps, ISrcObject } from '@foxy/interfaces'
	import { isEmpty } from "@foxy/utils"

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
			'foxy-avatar',
			{
				'foxy-avatar--start': props.start,
				'foxy-avatar--end': props.end
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
	.foxy-avatar {
		$this: &;

		line-height: var(--foxy-avatar---line-height);
		text-align: var(--foxy-avatar---text-align);
		font-size: var(--foxy-avatar---font-size);
		font-weight: var(--foxy-avatar---font-weight);
		letter-spacing: var(--foxy-avatar---letter-spacing);
		text-transform: var(--foxy-avatar---text-transform);

		height: calc(var(--foxy-avatar---height) - var(--foxy-avatar---density));
		width: calc(var(--foxy-avatar---width) - var(--foxy-avatar---density));

		overflow: var(--foxy-avatar---overflow);
		position: var(--foxy-avatar---position);

		transition: var(--foxy-avatar---transition);

		border-color: var(--foxy-avatar---border-color);
		border-style: var(--foxy-avatar---border-style);
		border-width: var(--foxy-avatar---border-width);
		border-radius: var(--foxy-avatar---border-radius);

		background: var(--foxy-avatar---background);
		box-shadow: var(--foxy-avatar---box-shadow);
		color: var(--foxy-avatar---color);

		padding-block-start: var(--foxy-avatar---padding-block-start);
		padding-block-end: var(--foxy-avatar---padding-block-end);
		padding-inline-start: var(--foxy-avatar---padding-inline-start);
		padding-inline-end: var(--foxy-avatar---padding-inline-end);
		margin-block-start: var(--foxy-avatar---margin-block-start);
		margin-block-end: var(--foxy-avatar---margin-block-end);
		margin-inline-start: var(--foxy-avatar---margin-inline-start);
		margin-inline-end: var(--foxy-avatar---margin-inline-end);

		&__wrapper {
			flex: var(--foxy-avatar__wrapper---flex);
			align-items: var(--foxy-avatar__wrapper---align-items);
			display: var(--foxy-avatar__wrapper---display);
			justify-content: var(--foxy-avatar__wrapper---justify-content);
			vertical-align: var(--foxy-avatar__wrapper---vertical-align);
			width: var(--foxy-avatar__wrapper---width);
			height: var(--foxy-avatar__wrapper---height);
			padding-block-start: var(--foxy-avatar__wrapper---padding-block-start);
			padding-block-end: var(--foxy-avatar__wrapper---padding-block-end);
			padding-inline-start: var(--foxy-avatar__wrapper---padding-inline-start);
			padding-inline-end: var(--foxy-avatar__wrapper---padding-inline-end);
			margin-block-start: var(--foxy-avatar__wrapper---margin-block-start);
			margin-block-end: var(--foxy-avatar__wrapper---margin-block-end);
			margin-inline-start: var(--foxy-avatar__wrapper---margin-inline-start);
			margin-inline-end: var(--foxy-avatar__wrapper---margin-inline-end);
		}

		&__image {
			width: var(--foxy-avatar__image---width);
			height: var(--foxy-avatar__image---height);

			&:deep(.foxy-img) {
				--foxy-img---height: 100%;
				--foxy-img---width: 100%;
			}
		}

		&--elevated {
			--foxy-avatar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxy-avatar---border-width: thin;
		}

		&--rounded {
			--foxy-avatar---border-radius: 50%;
		}

		&--density-default {
			--foxy-avatar---density: 0px;
		}

		&--density-compact {
			--foxy-avatar---density: 8px;
		}

		&--size-x-small {
			--foxy-avatar---height: 24px;
			--foxy-avatar---width: 24px;
			--foxy-avatar---font-size: 1rem;
		}

		&--size-small {
			--foxy-avatar---height: 32px;
			--foxy-avatar---width: 32px;
			--foxy-avatar---font-size: 1.25rem;
		}

		&--size-default {
			--foxy-avatar---height: 40px;
			--foxy-avatar---width: 40px;
			--foxy-avatar---font-size: 1.5rem;
		}

		&--size-large {
			--foxy-avatar---height: 48px;
			--foxy-avatar---width: 48px;
			--foxy-avatar---font-size: 1.75rem;
		}

		&--size-x-large {
			--foxy-avatar---height: 56px;
			--foxy-avatar---width: 56px;
			--foxy-avatar---font-size: 2rem;
		}

		&--warning {
			--foxy-avatar---background-color: var(--foxy-status--warning---background-color, rgb(251, 140, 0));
			--foxy-avatar---color: var(--foxy-status--warning---color, #ffffff);
		}

		&--success {
			--foxy-avatar---background-color: var(--foxy-status--success---background-color, rgb(76, 175, 80));
			--foxy-avatar---color: var(--foxy-status--success---color, #ffffff);
		}

		&--info {
			--foxy-avatar---background-color: var(--foxy-status--info---background-color, rgb(33, 150, 243));
			--foxy-avatar---color: var(--foxy-status--info---color, #ffffff);
		}

		&--error {
			--foxy-avatar---background-color: var(--foxy-status--error---background-color, rgb(207, 102, 121));
			--foxy-avatar---color: var(--foxy-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {

		--foxy-avatar---text-align: center;
		--foxy-avatar---font-size: 1.5rem;
		--foxy-avatar---font-weight: 400;
		--foxy-avatar---letter-spacing: 0;
		--foxy-avatar---line-height: 1;;
		--foxy-avatar---text-transform: uppercase;
		--foxy-avatar---overflow: hidden;
		--foxy-avatar---position: relative;
		--foxy-avatar---height: 40px;
		--foxy-avatar---width: 40px;
		--foxy-avatar---density: 0px;
		--foxy-avatar---transition-duration: 0.2s;
		--foxy-avatar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-avatar---transition-property: width, height, font-size;
		--foxy-avatar---transition: var(--foxy-avatar---transition-property) var(--foxy-avatar---transition-duration) var(--foxy-avatar---transition-timing-function);
		--foxy-avatar---border-top-width: 0;
		--foxy-avatar---border-left-width: 0;
		--foxy-avatar---border-bottom-width: 0;
		--foxy-avatar---border-right-width: 0;
		--foxy-avatar---border-width: var(--foxy-avatar---border-top-width) var(--foxy-avatar---border-left-width) var(--foxy-avatar---border-bottom-width) var(--foxy-avatar---border-right-width);
		--foxy-avatar---border-color: currentColor;
		--foxy-avatar---border-style: solid;
		--foxy-avatar---border-radius: 0px;
		--foxy-avatar---box-shadow: none;
		--foxy-avatar---color: rgba(30, 30, 30, 0.87);
		--foxy-avatar---background: rgb(230, 230, 230);
		--foxy-avatar---margin-inline-start: 0;
		--foxy-avatar---margin-inline-end: 0;
		--foxy-avatar---margin-block-start: 0;
		--foxy-avatar---margin-block-end: 0;
		--foxy-avatar---padding-block-start: 0;
		--foxy-avatar---padding-block-end: 0;
		--foxy-avatar---padding-inline-start: 0;
		--foxy-avatar---padding-inline-end: 0;

		--foxy-avatar__wrapper---width: 100%;
		--foxy-avatar__wrapper---height: 100%;
		--foxy-avatar__wrapper---flex: none;
		--foxy-avatar__wrapper---align-items: center;
		--foxy-avatar__wrapper---display: inline-flex;
		--foxy-avatar__wrapper---justify-content: center;
		--foxy-avatar__wrapper---vertical-align: middle;
		--foxy-avatar__wrapper---margin-inline-start: 0;
		--foxy-avatar__wrapper---margin-inline-end: 0;
		--foxy-avatar__wrapper---margin-block-start: 0;
		--foxy-avatar__wrapper---margin-block-end: 0;
		--foxy-avatar__padding---margin-block-start: 0;
		--foxy-avatar__padding---margin-block-end: 0;
		--foxy-avatar__padding---margin-inline-start: 0;
		--foxy-avatar__padding---margin-inline-end: 0;

		--foxy-avatar__image---width: 100%;
		--foxy-avatar__image---height: 100%;
	}
</style>
