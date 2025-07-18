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
		    class="origam-card__overlay"
    />
		<span
				key="underlay"
				class="origam-card__underlay"
		/>

		<slot name="wrapper">
			<template v-if="hasLoading">
				<slot name="loader">
					<div class="origam-card__loader">
						<origam-progress
								:active="!!props.loading"
								:color="props.color"
								:indeterminate="typeof props.loading !== 'number'"
								:model-value="typeof props.loading === 'number' ? props.loading : undefined"
								:type="PROGRESS_TYPE.LINEAR"
								class="origam-card__progress origam-card__progress--linear"
								thickness="4"
						/>
					</div>
				</slot>
			</template>

			<template v-if="hasHeader">
				<slot name="header">
					<origam-card-header
							key="item"
							:append-avatar="appendAvatar"
							:append-icon="appendIcon"
							:density="density"
							:prepend-avatar="prependAvatar"
							:prepend-icon="prependIcon"
							:subtitle="subtitle"
							:title="title"
							class="origam-card__header"
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
					</origam-card-header>
				</slot>
			</template>

			<template v-if="hasAsset">
				<div
						key="image"
						class="origam-card__asset"
				>
					<slot name="asset">
						<origam-img
								key="image-img"
								:src="props.image"
								class="origam-card__image"
								cover
						/>
					</slot>
				</div>
			</template>

			<div class="origam-card__content">
				<template v-if="hasText">
					<slot name="text">
						<origam-card-text
								key="text"
								:text="props.text"
								class="origam-card__text"
						/>
					</slot>
				</template>

				<slot name="default"/>
			</div>

			<template v-if="hasFooter">
				<div class="origam-card__footer">
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
	import { OrigamCardHeader, OrigamCardText, OrigamImg, OrigamProgress } from '@origam/components'

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
	} from '@origam/composables'

	import { vRipple } from '@origam/directives'

	import { DENSITY, PROGRESS_TYPE } from '@origam/enums'

	import type { ICardProps } from '@origam/interfaces'

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
			'origam-card',
			{
				'origam-card--disabled': props.disabled,
				'origam-card--flat': props.flat,
				'origam-card--hover': props.hover && !(props.disabled || props.flat),
				'origam-card--link': isClickable.value
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
	.origam-card {
		$this: &;

		display: var(--origam-card---display);
		overflow: var(--origam-card---overflow);
		overflow-wrap: var(--origam-card---overflow-wrap);
		position: var(--origam-card---position);
		z-index: var(--origam-card---z-index);

		text-decoration: var(--origam-card---text-decoration);
		transition-duration: var(--origam-card---transition-duration);
		transition-property: var(--origam-card---transition-property);
		transition-timing-function: var(--origam-card---transition-timing-function);

		pointer-events: var(--origam-card---pointer-events);
		user-select: var(--origam-card---user-select);
		cursor: var(--origam-card---cursor);

		background: var(--origam-card---background);
		box-shadow: var(--origam-card---box-shadow);
		color: var(--origam-card---color);

		padding-block-start: calc(var(--origam-card---padding-block-start) + var(--origam-card---density));
		padding-block-end: calc(var(--origam-card---padding-block-end) + var(--origam-card---density));
		padding-inline-start: calc(var(--origam-card---padding-inline-start) + var(--origam-card---density));
		padding-inline-end: calc(var(--origam-card---padding-inline-end) + var(--origam-card---density));

		margin-block-start: var(--origam-card---margin-block-start);
		margin-block-end: var(--origam-card---margin-block-end);
		margin-inline-start: var(--origam-card---margin-inline-start);
		margin-inline-end: var(--origam-card---margin-inline-end);

		border-color: var(--origam-card---border-color);
		border-style: var(--origam-card---border-style);
		border-width: var(--origam-card---border-width);
		border-radius: var(--origam-card---border-radius);

		&__overlay {
			background-color: var(--origam-card__overlay---background-color);
			border-radius: var(--origam-card__overlay---border-radius);
			opacity: var(--origam-card__overlay---opacity);
			pointer-events: var(--origam-card__overlay---pointer-events);
			position: var(--origam-card__overlay---position);
			bottom: var(--origam-card__overlay---position-bottom);
			left: var(--origam-card__overlay---position-left);
			right: var(--origam-card__overlay---position-right);
			top: var(--origam-card__overlay---position-top);
			transition-property: var(--origam-card__overlay---transition-property);
			transition-duration: var(--origam-card__overlay---transition-duration);
			transition-timing-function: var(--origam-card__overlay---transition-timing-function);
		}

		&__underlay {
			position: var(--origam-card__underlay---position);
		}

		> * {
			opacity: var(--origam-card---opacity);
		}

		&--border {
			--origam-card---border-width: thin;
			--origam-card---box-shadow: none;
		}

		&--rounded {
			--origam-card---border-radius: 4px;
		}

		&--absolute {
			--origam-card---position: absolute;
		}

		&--fixed {
			--origam-card---position: fixed;
		}

		&--density-default {
			--origam-card---density: 0px;
		}

		&--density-compact {
			--origam-card---density: -8px;
		}

		&:hover,
		&:focus-visible,
		&:focus {
			> #{$this}__overlay {
				--origam-card__overlay---opacity: calc(0.12 * 1);
			}
		}

		&--active,
		[aria-haspopup=menu][aria-expanded=true] {
			> #{$this}__overlay {
				--origam-card__overlay---opacity: calc(0.12 * 1);
			}

			&:hover,
			&:focus-visible,
			&:focus {
				> #{$this}__overlay {
					--origam-card__overlay---opacity: calc(0.12 * 1);
				}
			}
		}

		&--disabled {
			--origam-card---pointer-events: none;
			--origam-card---user-select: none;

			> * {
				--origam-card---opacity: 0.6;
			}
		}

		&--flated {
			--origam-card---box-shadow: none;
		}

		&--link {
			--origam-card---cursor: pointer;
		}

		&--hover {
			--origam-card---cursor: pointer;

			&:before {
				border-radius: var(--origam-card__before---border-radius);
				bottom: var(--origam-card__before---bottom);
				content: var(--origam-card__before---content);
				display: var(--origam-card__before---display);
				left: var(--origam-card__before---left);
				pointer-events: var(--origam-card__before---pointer-events);
				position: var(--origam-card__before---position);
				right: var(--origam-card__before---right);
				top: var(--origam-card__before---top);
				transition: var(--origam-card__before---transition);
				opacity: var(--origam-card__before---opacity);
				z-index: var(--origam-card__before---z-index);
				box-shadow: var(--origam-card__before---box-shadow);
			}

			&:after {
				border-radius: var(--origam-card__after---border-radius);
				bottom: var(--origam-card__after---bottom);
				content: var(--origam-card__after---content);
				display: var(--origam-card__after---display);
				left: var(--origam-card__after---left);
				pointer-events: var(--origam-card__after---pointer-events);
				position: var(--origam-card__after---position);
				right: var(--origam-card__after---right);
				top: var(--origam-card__after---top);
				transition: var(--origam-card__after---transition);
				z-index: var(--origam-card__after---z-index);
				opacity: var(--origam-card__after---opacity);
				box-shadow: var(--origam-card__after---box-shadow);
			}

			&:hover {
				--origam-card---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);

				&:after {
					--origam-card__after---opacity: 1;
				}

				&:before {
					--origam-card__after---opacity: 0;
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-card---overflow: hidden;
		--origam-card---overflow-wrap: break-word;
		--origam-card---position: relative;
		--origam-card---z-index: 0;

		--origam-card---transition-duration: 0.28s;
		--origam-card---transition-property: box-shadow, opacity, background;
		--origam-card---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--origam-card---color: rgba(0, 0, 0, 0.87);
		--origam-card---box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--origam-card---background: rgb(255, 255, 255);

		--origam-card---display: block;

		--origam-card---pointer-events: auto;
		--origam-card---user-select: auto;
		--origam-card---cursor: auto;

		--origam-card---text-decoration: none;

		--origam-card---border-top-width: 0;
		--origam-card---border-left-width: 0;
		--origam-card---border-bottom-width: 0;
		--origam-card---border-right-width: 0;
		--origam-card---border-width: var(--origam-card---border-top-width) var(--origam-card---border-left-width) var(--origam-card---border-bottom-width) var(--origam-card---border-right-width);
		--origam-card---border-color: rgba(0, 0, 0, 0.87);
		--origam-card---border-style: solid;
		--origam-card---border-start-start-radius: 0;
		--origam-card---border-start-end-radius: 0;
		--origam-card---border-end-start-radius: 0;
		--origam-card---border-end-end-radius: 0;
		--origam-card---border-radius: var(--origam-card---border-start-start-radius) var(--origam-card---border-start-end-radius) var(--origam-card---border-end-start-radius) var(--origam-card---border-end-end-radius);

		--origam-card---padding-block-start: 0;
		--origam-card---padding-block-end: 0;
		--origam-card---padding-inline-start: 0;
		--origam-card---padding-inline-end: 0;

		--origam-card---margin-block-start: 0;
		--origam-card---margin-block-end: 0;
		--origam-card---margin-inline-start: 0;
		--origam-card---margin-inline-end: 0;

		--origam-card---opacity: 1;

		--origam-card__overlay---background-color: #000;
		--origam-card__overlay---border-radius: inherit;
		--origam-card__overlay---opacity: 0;
		--origam-card__overlay---pointer-events: none;
		--origam-card__overlay---position: absolute;
		--origam-card__overlay---position-bottom: 0;
		--origam-card__overlay---position-left: 0;
		--origam-card__overlay---position-right: 0;
		--origam-card__overlay---position-top: 0;
		--origam-card__overlay---transition-property: opacity;
		--origam-card__overlay---transition-duration: 0.2s;
		--origam-card__overlay---transition-timing-function: ease-in-out;

		--origam-card__underlay---position: absolute;

		--origam-card__before---border-radius: inherit;
		--origam-card__before---bottom: 0;
		--origam-card__before---content: "";
		--origam-card__before---display: block;
		--origam-card__before---left: 0;
		--origam-card__before---pointer-events: none;
		--origam-card__before---position: absolute;
		--origam-card__before---right: 0;
		--origam-card__before---top: 0;
		--origam-card__before---transition: inherit;
		--origam-card__before---opacity: 1;
		--origam-card__before---z-index: -1;
		--origam-card__before---box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

		--origam-card__after---border-radius: inherit;
		--origam-card__after---bottom: 0;
		--origam-card__after---content: "";
		--origam-card__after---display: block;
		--origam-card__after---left: 0;
		--origam-card__after---pointer-events: none;
		--origam-card__after---position: absolute;
		--origam-card__after---right: 0;
		--origam-card__after---top: 0;
		--origam-card__after---transition: inherit;
		--origam-card__after---z-index: 1;
		--origam-card__after---opacity: 0;
		--origam-card__after---box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
	}
</style>
