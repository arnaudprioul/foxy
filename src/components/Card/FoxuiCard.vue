<template>
	<component
			:is="link.tag"
			v-ripple="isClickable && props.ripple"
			:class="cardClasses"
			:href="link.href"
			:style="cardStyles"
			:tabindex="props.disabled ? -1 : undefined"
			@click="isClickable && link.navigate"
	>
    <span
		    v-if="isClickable"
		    key="overlay"
		    class="foxui-card__overlay"
    />
		<span
				key="underlay"
				class="foxui-card__underlay"
		/>

		<slot name="wrapper">
			<template v-if="hasLoading">
				<slot name="loader">
					<div class="foxui-card__loader">
						<foxui-progress
								:active="!!props.loading"
								:color="props.color"
								:indeterminate="typeof props.loading !== 'number'"
								:model-value="typeof props.loading === 'number' ? props.loading : undefined"
								:type="PROGRESS_TYPE.LINEAR"
								class="foxui-card__progress foxui-card__progress--linear"
								thickness="4"
						/>
					</div>
				</slot>
			</template>

			<template v-if="hasHeader">
				<slot name="header">
					<foxui-card-header
							key="item"
							:append-avatar="appendAvatar"
							:append-icon="appendIcon"
							:density="density"
							:prepend-avatar="prependAvatar"
							:prepend-icon="prependIcon"
							:subtitle="subtitle"
							:title="title"
							class="foxui-card__header"
							@click:prepend="handleClickPrepend"
							@click:append="handleClickAppend"
					>
						<template
								v-if="slots['header.append']"
								#append
						>
							<slot name="header.append"/>
						</template>

						<template
								v-if="slots['header.prepend']"
								#prepend
						>
							<slot name="header.prepend"/>
						</template>

						<template
								v-if="slots['header.title']"
								#title
						>
							<slot name="header.title"/>
						</template>

						<template
								v-if="slots['header.subtitle']"
								#subtitle
						>
							<slot name="header.subtitle"/>
						</template>

						<template
								v-if="slots['header.content']"
								#default
						>
							<slot name="header.content"/>
						</template>
					</foxui-card-header>
				</slot>
			</template>

			<template v-if="hasAsset">
				<div
						key="image"
						class="foxui-card__asset"
				>
					<slot name="asset">
						<foxui-img
								key="image-img"
								:src="props.image"
								class="foxui-card__image"
								cover
						/>
					</slot>
				</div>
			</template>

			<div class="foxui-card__content">
				<template v-if="hasText">
					<slot name="text">
						<foxui-card-text
								key="text"
								:text="props.text"
								class="foxui-card__text"
						/>
					</slot>
				</template>

				<slot name="default"/>
			</div>

			<template v-if="hasFooter">
				<div class="foxui-card__footer">
					<slot name="footer"/>
				</div>
			</template>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiCardHeader, FoxuiCardText, FoxuiImg, FoxuiProgress } from '@foxui/components'

	import {
		useAdjacent,
		useBorder,
		useDensity,
		useDimension,
		useElevation,
		useLink,
		useLoader,
		useLocation,
		useMargin,
		usePadding,
		usePosition,
		useProps,
		useRounded
	} from '@foxui/composables'

	import { vRipple } from '@foxui/directives'

	import { DENSITY, PROGRESS_TYPE } from '@foxui/enums'

	import type { ICardProps } from '@foxui/interfaces'

	import { computed, StyleValue, toRef, useAttrs, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICardProps>(), {ripple: true, density: DENSITY.DEFAULT, tag: 'div'})

	defineEmits(['click:append', 'click:prepend'])

	const {filterProps} = useProps<ICardProps>(props)

	const attrs = useAttrs()

	const link = useLink(props, attrs)

	const {borderClasses, borderStyles} = useBorder(props)
	const {densityClasses} = useDensity(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props, toRef(props, 'flat'))
	const {loaderClasses} = useLoader(props)
	const {locationStyles} = useLocation(props)
	const {positionClasses} = usePosition(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {paddingStyles, paddingClasses} = usePadding(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasAppend,
		hasPrepend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const isClickable = computed(() => {
		return !props.disabled && props.link && (props.link || link.isClickable.value)
	})

	const slots = useSlots()

	// SLOTS

	const hasTitle = computed(() => {
		return slots['header.title'] || props.title != null
	})
	const hasSubtitle = computed(() => {
		return slots['header.subtitle'] || props.subtitle != null
	})
	const hasAsset = computed(() => {
		return !!(slots.asset || props.image)
	})
	const hasFooter = computed(() => {
		return slots.footer
	})
	const hasHeader = computed(() => {
		return slots.header || hasTitle.value || hasSubtitle.value || hasPrepend.value || hasAppend.value
	})
	const hasText = computed(() => {
		return slots.text || props.text != null
	})
	const hasLoading = computed(() => {
		return slots.loader || !!props.loading
	})

	// CLASS & STYLES

	const cardStyles = computed(() => {
		return [
			borderStyles.value,
			dimensionStyles.value,
			locationStyles.value,
			roundedStyles.value,
			marginStyles.value,
			paddingStyles.value,
			props.style
		] as StyleValue
	})
	const cardClasses = computed(() => {
		return [
			'foxui-card',
			{
				'foxui-card--disabled': props.disabled,
				'foxui-card--flat': props.flat,
				'foxui-card--hover': props.hover && !(props.disabled || props.flat),
				'foxui-card--link': isClickable.value
			},
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			loaderClasses.value,
			positionClasses.value,
			roundedClasses.value,
			marginClasses.value,
			paddingClasses.value,
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
	.foxui-card {
		$this: &;

		display: var(--foxui-card---display);
		overflow: var(--foxui-card---overflow);
		overflow-wrap: var(--foxui-card---overflow-wrap);
		position: var(--foxui-card---position);
		z-index: var(--foxui-card---z-index);

		text-decoration: var(--foxui-card---text-decoration);
		transition-duration: var(--foxui-card---transition-duration);
		transition-property: var(--foxui-card---transition-property);
		transition-timing-function: var(--foxui-card---transition-timing-function);

		pointer-events: var(--foxui-card---pointer-events);
		user-select: var(--foxui-card---user-select);
		cursor: var(--foxui-card---cursor);

		background: var(--foxui-card---background);
		box-shadow: var(--foxui-card---box-shadow);
		color: var(--foxui-card---color);

		padding-block-start: calc(var(--foxui-card---padding-block-start) + var(--foxui-card---density));
		padding-block-end: calc(var(--foxui-card---padding-block-end) + var(--foxui-card---density));
		padding-inline-start: calc(var(--foxui-card---padding-inline-start) + var(--foxui-card---density));
		padding-inline-end: calc(var(--foxui-card---padding-inline-end) + var(--foxui-card---density));

		margin-block-start: var(--foxui-card---margin-block-start);
		margin-block-end: var(--foxui-card---margin-block-end);
		margin-inline-start: var(--foxui-card---margin-inline-start);
		margin-inline-end: var(--foxui-card---margin-inline-end);

		border-color: var(--foxui-card---border-color);
		border-style: var(--foxui-card---border-style);
		border-width: var(--foxui-card---border-width);
		border-radius: var(--foxui-card---border-radius);

		&__overlay {
			background-color: var(--foxui-card__overlay---background-color);
			border-radius: var(--foxui-card__overlay---border-radius);
			opacity: var(--foxui-card__overlay---opacity);
			pointer-events: var(--foxui-card__overlay---pointer-events);
			position: var(--foxui-card__overlay---position);
			bottom: var(--foxui-card__overlay---position-bottom);
			left: var(--foxui-card__overlay---position-left);
			right: var(--foxui-card__overlay---position-right);
			top: var(--foxui-card__overlay---position-top);
			transition-property: var(--foxui-card__overlay---transition-property);
			transition-duration: var(--foxui-card__overlay---transition-duration);
			transition-timing-function: var(--foxui-card__overlay---transition-timing-function);
		}

		&__underlay {
			position: var(--foxui-card__underlay---position);
		}

		> * {
			opacity: var(--foxui-card---opacity);
		}

		&--border {
			--foxui-card---border-width: thin;
			--foxui-card---box-shadow: none;
		}

		&--rounded {
			--foxui-card---border-radius: 4px;
		}

		&--absolute {
			--foxui-card---position: absolute;
		}

		&--fixed {
			--foxui-card---position: fixed;
		}

		&--density-default {
			--foxui-card---density: 0px;
		}

		&--density-compact {
			--foxui-card---density: -8px;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--foxui-card__overlay---opacity: calc(0.12 * 1);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--foxui-card__overlay---opacity: calc(0.12 * 1);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--foxui-card__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&--disabled {
			--foxui-card---pointer-events: none;
			--foxui-card---user-select: none;

			> * {
				--foxui-card---opacity: 0.6;
			}
		}

		&--flated {
			--foxui-card---box-shadow: none;
		}

		&--link {
			--foxui-card---cursor: pointer;
		}

		&--hover {
			--foxui-card---cursor: pointer;

			&:before {
				border-radius: var(--foxui-card__before---border-radius);
				bottom: var(--foxui-card__before---bottom);
				content: var(--foxui-card__before---content);
				display: var(--foxui-card__before---display);
				left: var(--foxui-card__before---left);
				pointer-events: var(--foxui-card__before---pointer-events);
				position: var(--foxui-card__before---position);
				right: var(--foxui-card__before---right);
				top: var(--foxui-card__before---top);
				transition: var(--foxui-card__before---transition);
				opacity: var(--foxui-card__before---opacity);
				z-index: var(--foxui-card__before---z-index);
				box-shadow: var(--foxui-card__before---box-shadow);
			}

			&:after {
				border-radius: var(--foxui-card__after---border-radius);
				bottom: var(--foxui-card__after---bottom);
				content: var(--foxui-card__after---content);
				display: var(--foxui-card__after---display);
				left: var(--foxui-card__after---left);
				pointer-events: var(--foxui-card__after---pointer-events);
				position: var(--foxui-card__after---position);
				right: var(--foxui-card__after---right);
				top: var(--foxui-card__after---top);
				transition: var(--foxui-card__after---transition);
				z-index: var(--foxui-card__after---z-index);
				opacity: var(--foxui-card__after---opacity);
				box-shadow: var(--foxui-card__after---box-shadow);
			}

			&:hover {
				--foxui-card---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

				&:after {
					--foxui-card__after---opacity: 1;
				}

				&:before {
					--foxui-card__after---opacity: 0;
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-card---overflow: hidden;
		--foxui-card---overflow-wrap: break-word;
		--foxui-card---position: relative;
		--foxui-card---z-index: 0;

		--foxui-card---transition-duration: 0.28s;
		--foxui-card---transition-property: box-shadow, opacity, background;
		--foxui-card---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--foxui-card---color: rgba(0, 0, 0, 0.87);
		--foxui-card---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxui-card---background: rgb(255, 255, 255);

		--foxui-card---display: block;

		--foxui-card---pointer-events: auto;
		--foxui-card---user-select: auto;
		--foxui-card---cursor: auto;

		--foxui-card---text-decoration: none;

		--foxui-card---border-top-width: 0;
		--foxui-card---border-left-width: 0;
		--foxui-card---border-bottom-width: 0;
		--foxui-card---border-right-width: 0;
		--foxui-card---border-width: var(--foxui-card---border-top-width) var(--foxui-card---border-left-width) var(--foxui-card---border-bottom-width) var(--foxui-card---border-right-width);
		--foxui-card---border-color: rgba(0, 0, 0, 0.87);
		--foxui-card---border-style: solid;
		--foxui-card---border-start-start-radius: 0;
		--foxui-card---border-start-end-radius: 0;
		--foxui-card---border-end-start-radius: 0;
		--foxui-card---border-end-end-radius: 0;
		--foxui-card---border-radius: var(--foxui-card---border-start-start-radius) var(--foxui-card---border-start-end-radius) var(--foxui-card---border-end-start-radius) var(--foxui-card---border-end-end-radius);

		--foxui-card---padding-block-start: 0;
		--foxui-card---padding-block-end: 0;
		--foxui-card---padding-inline-start: 0;
		--foxui-card---padding-inline-end: 0;

		--foxui-card---margin-block-start: 0;
		--foxui-card---margin-block-end: 0;
		--foxui-card---margin-inline-start: 0;
		--foxui-card---margin-inline-end: 0;

		--foxui-card---opacity: 1;

		--foxui-card__overlay---background-color: #000;
		--foxui-card__overlay---border-radius: inherit;
		--foxui-card__overlay---opacity: 0;
		--foxui-card__overlay---pointer-events: none;
		--foxui-card__overlay---position: absolute;
		--foxui-card__overlay---position-bottom: 0;
		--foxui-card__overlay---position-left: 0;
		--foxui-card__overlay---position-right: 0;
		--foxui-card__overlay---position-top: 0;
		--foxui-card__overlay---transition-property: opacity;
		--foxui-card__overlay---transition-duration: 0.2s;
		--foxui-card__overlay---transition-timing-function: ease-in-out;

		--foxui-card__underlay---position: absolute;

		--foxui-card__before---border-radius: inherit;
		--foxui-card__before---bottom: 0;
		--foxui-card__before---content: "";
		--foxui-card__before---display: block;
		--foxui-card__before---left: 0;
		--foxui-card__before---pointer-events: none;
		--foxui-card__before---position: absolute;
		--foxui-card__before---right: 0;
		--foxui-card__before---top: 0;
		--foxui-card__before---transition: inherit;
		--foxui-card__before---opacity: 1;
		--foxui-card__before---z-index: -1;
		--foxui-card__before---box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

		--foxui-card__after---border-radius: inherit;
		--foxui-card__after---bottom: 0;
		--foxui-card__after---content: "";
		--foxui-card__after---display: block;
		--foxui-card__after---left: 0;
		--foxui-card__after---pointer-events: none;
		--foxui-card__after---position: absolute;
		--foxui-card__after---right: 0;
		--foxui-card__after---top: 0;
		--foxui-card__after---transition: inherit;
		--foxui-card__after---z-index: 1;
		--foxui-card__after---opacity: 0;
		--foxui-card__after---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
	}
</style>
