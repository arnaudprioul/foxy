<template>
	<component
			:is="tag"
			:class="avatarClasses"
			:style="avatarStyles"
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

				<template v-if="hasIcon">
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
		useBorder,
		useBothColor,
		useDensity,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSize
	} from '@foxy/composables'

	import { IAvatarProps, ISrcObject } from '@foxy/interfaces'

	import { computed, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<IAvatarProps>(), {tag: 'div', size: 'default'})

	const {filterProps} = useProps<IAvatarProps>(props)

	const {densityClasses} = useDensity(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {sizeClasses, sizeStyles} = useSize(props)
	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const slots = useSlots()

	const hasImage = computed(() => {
		return !!props.image || slots.image
	})
	const hasIcon = computed(() => {
		return !!props.icon || slots.icon
	})
	const hasText = computed(() => {
		return !!props.text || slots.text
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
	.foxy-avatar {
		$this: &;

		line-height: var(--foxy-avatar---line-height);
		text-align: var(--foxy-avatar---text-align);
		font-size: var(--foxy-avatar---font-size);
		font-weight: var(--foxy-avatar---font-weight);
		letter-spacing: var(--foxy-avatar---letter-spacing);
		text-transform: var(--foxy-avatar---text-transform);

		height: calc(var(--foxy-avatar---height) + var(--foxy-avatar---density));
		width: calc(var(--foxy-avatar---width) + var(--foxy-avatar---density));

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


		&--bordered {
			border-width: var(--foxy-avatar--bordered---border-width);
			box-shadow: var(--foxy-avatar--bordered---box-shadow);
		}

		&--rounded {
			border-radius: var(--foxy-avatar--rounded---border-radius);
		}

		&--size-x-small {
			height: var(--foxy-avatar--size-x-small---height);
			width: var(--foxy-avatar--size-x-small---width);
			font-size: var(--foxy-avatar--size-x-small---font-size);
		}

		&--size-small {
			height: var(--foxy-avatar--size-small---height);
			width: var(--foxy-avatar--size-small---width);
			font-size: var(--foxy-avatar--size-small---font-size);
		}

		&--size-default {
			height: var(--foxy-avatar--size-default---height);
			width: var(--foxy-avatar--size-default---width);
			font-size: var(--foxy-avatar--size-default---font-size);
		}

		&--size-large {
			height: var(--foxy-avatar--size-large---height);
			width: var(--foxy-avatar--size-large---width);
			font-size: var(--foxy-avatar--size-large---font-size);
		}

		&--size-x-large {
			height: var(--foxy-avatar--size-x-large---height);
			width: var(--foxy-avatar--size-x-large---width);
			font-size: var(--foxy-avatar--size-x-large---font-size);
		}

		&--density-default {
			--foxy-avatar---density: 0;
		}

		&--density-compact {
			--foxy-avatar---density: -8px;
		}

		&__wrapper {
			flex: var(--foxy-avatar__wrapper---flex);
			align-items: var(--foxy-avatar__wrapper---align-items);
			display: var(--foxy-avatar__wrapper---display);
			justify-content: var(--foxy-avatar__wrapper---justify-content);
			vertical-align: var(--foxy-avatar__wrapper---vertical-align);
			width: var(--foxy-avatar__wrapper---width);
			height: var(--foxy-avatar__wrapper---height);
		}

		&__image {
			width: var(--foxy-avatar__image---width);
			height: var(--foxy-avatar__image---height);
		}

		&:deep(.foxy-img) {
			--foxy-img---height: 100%;
			--foxy-img---width: 100%;
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
		--foxy-avatar---density: 0;
		--foxy-avatar---transition-duration: 0.2s;
		--foxy-avatar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxy-avatar---transition-property: width, height, font-size;
		--foxy-avatar---transition: var(--foxy-avatar---transition-property) var(--foxy-avatar---transition-duration) var(--foxy-avatar---transition-timing-function);
		--foxy-avatar---border-top-width: 0;
		--foxy-avatar---border-left-width: 0;
		--foxy-avatar---border-bottom-width: 0;
		--foxy-avatar---border-right-width: 0;
		--foxy-avatar---border-width: var(--foxy-avatar---border-top-width) var(--foxy-avatar---border-left-width) var(--foxy-avatar---border-bottom-width) var(--foxy-avatar---border-right-width);
		--foxy-avatar---border-color: rgba(0, 0, 0, 0.87);
		--foxy-avatar---border-style: solid;
		--foxy-avatar---border-start-start-radius: 50%;
		--foxy-avatar---border-start-end-radius: 50%;
		--foxy-avatar---border-end-start-radius: 50%;
		--foxy-avatar---border-end-end-radius: 50%;
		--foxy-avatar---border-radius: var(--foxy-avatar---border-start-start-radius) var(--foxy-avatar---border-start-end-radius) var(--foxy-avatar---border-end-start-radius) var(--foxy-avatar---border-end-end-radius);
		--foxy-avatar---color: rgba(0, 0, 0, 0.87);
		--foxy-avatar---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxy-avatar---background: rgb(255, 255, 255);

		--foxy-avatar--bordered---border-top-width: thin;
		--foxy-avatar--bordered---border-left-width: thin;
		--foxy-avatar--bordered---border-bottom-width: thin;
		--foxy-avatar--bordered---border-right-width: thin;
		--foxy-avatar--bordered---border-width: var(--foxy-avatar---border-top-width) var(--foxy-avatar---border-left-width) var(--foxy-avatar---border-bottom-width) var(--foxy-avatar---border-right-width);
		--foxy-avatar--bordered---box-shadow: none;

		--foxy-avatar--rounded---border-radius: 4px;

		--foxy-avatar--size-x-small---height: 24px;
		--foxy-avatar--size-x-small---width: 24px;
		--foxy-avatar--size-x-small---font-size: 1rem;

		--foxy-avatar--size-small---height: 32px;
		--foxy-avatar--size-small---width: 32px;
		--foxy-avatar--size-small---font-size: 1.25rem;

		--foxy-avatar--size-default---height: 40px;
		--foxy-avatar--size-default---width: 40px;
		--foxy-avatar--size-default---font-size: 1.5rem;

		--foxy-avatar--size-large---height: 48px;
		--foxy-avatar--size-large---width: 48px;
		--foxy-avatar--size-large---font-size: 1.75rem;

		--foxy-avatar--size-x-large---height: 56px;
		--foxy-avatar--size-x-large---width: 56px;
		--foxy-avatar--size-x-large---font-size: 2rem;

		--foxy-avatar__wrapper---width: 100%;
		--foxy-avatar__wrapper---height: 100%;
		--foxy-avatar__wrapper---flex: none;
		--foxy-avatar__wrapper---align-items: center;
		--foxy-avatar__wrapper---display: inline-flex;
		--foxy-avatar__wrapper---justify-content: center;
		--foxy-avatar__wrapper---vertical-align: middle;

		--foxy-avatar__image---width: 100%;
		--foxy-avatar__image---height: 100%;
	}
</style>
