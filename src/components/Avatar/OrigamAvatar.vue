<template>
	<component
			:is="tag"
			:id="id"
			:class="avatarClasses"
			@click="handleClick"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="origam-avatar__wrapper">
			<slot name="default">
				<template v-if="hasImage">
					<div class="origam-avatar__image">
						<slot name="avatar">
							<origam-img
									key="image"
									cover
									v-bind="imageProps"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasIcon">
					<div class="origam-avatar__icon">
						<slot name="icon">
							<origam-icon
									key="icon"
									:icon="icon"
							/>
						</slot>
					</div>
				</template>

				<template v-else-if="hasText">
					<div class="origam-avatar__text">
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
	import { OrigamIcon, OrigamImg } from '../../components'

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
	} from '../../composables'

	import type { IAvatarProps, ISrcObject } from '../../interfaces'
	import { isEmpty } from "../../utils"

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
			'origam-avatar',
			{
				'origam-avatar--start': props.start,
				'origam-avatar--end': props.end
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
	.origam-avatar {
		$this: &;

		line-height: var(--origam-avatar---line-height);
		text-align: var(--origam-avatar---text-align);
		font-size: var(--origam-avatar---font-size);
		font-weight: var(--origam-avatar---font-weight);
		letter-spacing: var(--origam-avatar---letter-spacing);
		text-transform: var(--origam-avatar---text-transform);

		height: calc(var(--origam-avatar---height) - var(--origam-avatar---density));
		width: calc(var(--origam-avatar---width) - var(--origam-avatar---density));

		overflow: var(--origam-avatar---overflow);
		position: var(--origam-avatar---position);

		transition: var(--origam-avatar---transition);

		border-color: var(--origam-avatar---border-color);
		border-style: var(--origam-avatar---border-style);
		border-width: var(--origam-avatar---border-width);
		border-radius: var(--origam-avatar---border-radius);

		background: var(--origam-avatar---background);
		box-shadow: var(--origam-avatar---box-shadow);
		color: var(--origam-avatar---color);

		padding-block-start: var(--origam-avatar---padding-block-start);
		padding-block-end: var(--origam-avatar---padding-block-end);
		padding-inline-start: var(--origam-avatar---padding-inline-start);
		padding-inline-end: var(--origam-avatar---padding-inline-end);
		margin-block-start: var(--origam-avatar---margin-block-start);
		margin-block-end: var(--origam-avatar---margin-block-end);
		margin-inline-start: var(--origam-avatar---margin-inline-start);
		margin-inline-end: var(--origam-avatar---margin-inline-end);

		&__wrapper {
			flex: var(--origam-avatar__wrapper---flex);
			align-items: var(--origam-avatar__wrapper---align-items);
			display: var(--origam-avatar__wrapper---display);
			justify-content: var(--origam-avatar__wrapper---justify-content);
			vertical-align: var(--origam-avatar__wrapper---vertical-align);
			width: var(--origam-avatar__wrapper---width);
			height: var(--origam-avatar__wrapper---height);
			padding-block-start: var(--origam-avatar__wrapper---padding-block-start);
			padding-block-end: var(--origam-avatar__wrapper---padding-block-end);
			padding-inline-start: var(--origam-avatar__wrapper---padding-inline-start);
			padding-inline-end: var(--origam-avatar__wrapper---padding-inline-end);
			margin-block-start: var(--origam-avatar__wrapper---margin-block-start);
			margin-block-end: var(--origam-avatar__wrapper---margin-block-end);
			margin-inline-start: var(--origam-avatar__wrapper---margin-inline-start);
			margin-inline-end: var(--origam-avatar__wrapper---margin-inline-end);
		}

		&__image {
			width: var(--origam-avatar__image---width);
			height: var(--origam-avatar__image---height);

			&:deep(.origam-img) {
				--origam-img---height: 100%;
				--origam-img---width: 100%;
			}
		}

		&--elevated {
			--origam-avatar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--origam-avatar---border-width: thin;
		}

		&--rounded {
			--origam-avatar---border-radius: 50%;
		}

		&--density-comfortable {
			--origam-avatar---density: 8px;
		}

		&--density-default {
			--origam-avatar---density: 0px;
		}

		&--density-compact {
			--origam-avatar---density: 8px;
		}

		&--size-x-small {
			--origam-avatar---height: 24px;
			--origam-avatar---width: 24px;
			--origam-avatar---font-size: 1rem;
		}

		&--size-small {
			--origam-avatar---height: 32px;
			--origam-avatar---width: 32px;
			--origam-avatar---font-size: 1.25rem;
		}

		&--size-default {
			--origam-avatar---height: 40px;
			--origam-avatar---width: 40px;
			--origam-avatar---font-size: 1.5rem;
		}

		&--size-large {
			--origam-avatar---height: 48px;
			--origam-avatar---width: 48px;
			--origam-avatar---font-size: 1.75rem;
		}

		&--size-x-large {
			--origam-avatar---height: 56px;
			--origam-avatar---width: 56px;
			--origam-avatar---font-size: 2rem;
		}

		&--warning {
			--origam-avatar---background-color: var(--origam-status--warning---background-color, rgb(251, 140, 0));
			--origam-avatar---color: var(--origam-status--warning---color, #ffffff);
		}

		&--success {
			--origam-avatar---background-color: var(--origam-status--success---background-color, rgb(76, 175, 80));
			--origam-avatar---color: var(--origam-status--success---color, #ffffff);
		}

		&--info {
			--origam-avatar---background-color: var(--origam-status--info---background-color, rgb(33, 150, 243));
			--origam-avatar---color: var(--origam-status--info---color, #ffffff);
		}

		&--error {
			--origam-avatar---background-color: var(--origam-status--error---background-color, rgb(207, 102, 121));
			--origam-avatar---color: var(--origam-status--error---color, #ffffff);
		}
	}
</style>

<style>
	:root {

		--origam-avatar---text-align: center;
		--origam-avatar---font-size: 1.5rem;
		--origam-avatar---font-weight: 400;
		--origam-avatar---letter-spacing: 0;
		--origam-avatar---line-height: 1;;
		--origam-avatar---text-transform: uppercase;
		--origam-avatar---overflow: hidden;
		--origam-avatar---position: relative;
		--origam-avatar---height: 40px;
		--origam-avatar---width: 40px;
		--origam-avatar---density: 0px;
		--origam-avatar---transition-duration: 0.2s;
		--origam-avatar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-avatar---transition-property: width, height, font-size;
		--origam-avatar---transition: var(--origam-avatar---transition-property) var(--origam-avatar---transition-duration) var(--origam-avatar---transition-timing-function);
		--origam-avatar---border-top-width: 0;
		--origam-avatar---border-left-width: 0;
		--origam-avatar---border-bottom-width: 0;
		--origam-avatar---border-right-width: 0;
		--origam-avatar---border-width: var(--origam-avatar---border-top-width) var(--origam-avatar---border-left-width) var(--origam-avatar---border-bottom-width) var(--origam-avatar---border-right-width);
		--origam-avatar---border-color: currentColor;
		--origam-avatar---border-style: solid;
		--origam-avatar---border-radius: 0px;
		--origam-avatar---box-shadow: none;
		--origam-avatar---color: rgba(30, 30, 30, 0.87);
		--origam-avatar---background: rgb(230, 230, 230);
		--origam-avatar---margin-inline-start: 0;
		--origam-avatar---margin-inline-end: 0;
		--origam-avatar---margin-block-start: 0;
		--origam-avatar---margin-block-end: 0;
		--origam-avatar---padding-block-start: 0;
		--origam-avatar---padding-block-end: 0;
		--origam-avatar---padding-inline-start: 0;
		--origam-avatar---padding-inline-end: 0;

		--origam-avatar__wrapper---width: 100%;
		--origam-avatar__wrapper---height: 100%;
		--origam-avatar__wrapper---flex: none;
		--origam-avatar__wrapper---align-items: center;
		--origam-avatar__wrapper---display: inline-flex;
		--origam-avatar__wrapper---justify-content: center;
		--origam-avatar__wrapper---vertical-align: middle;
		--origam-avatar__wrapper---margin-inline-start: 0;
		--origam-avatar__wrapper---margin-inline-end: 0;
		--origam-avatar__wrapper---margin-block-start: 0;
		--origam-avatar__wrapper---margin-block-end: 0;
		--origam-avatar__padding---margin-block-start: 0;
		--origam-avatar__padding---margin-block-end: 0;
		--origam-avatar__padding---margin-inline-start: 0;
		--origam-avatar__padding---margin-inline-end: 0;

		--origam-avatar__image---width: 100%;
		--origam-avatar__image---height: 100%;
	}
</style>
