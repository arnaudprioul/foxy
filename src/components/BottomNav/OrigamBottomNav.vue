<template>
	<component
			:is="tag"
			:id="id"
			:class="bottomNavClasses"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="origam-bottom-nav__content">
			<slot name="default">
				<template
						v-for="(item, index) in items"
						:key="index"
				>
					<slot
							:name="`item.${index}`"
							v-bind="{props: item}"
					>
						<slot
								name="item"
								v-bind="{props: item, index}"
						>
							<origam-btn
									ref="origamBtnRef"
									class="origam-bottom-nav__btn"
									v-bind="item"
							/>
						</slot>
					</slot>
				</template>
			</slot>
		</div>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamBtn } from "../../components"
	import {
		useActive,
		useBorder,
		useColorEffect,
		useDensity,
		useElevation,
		useGroup,
		useHover,
		useLayoutItem,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useSsrBoot,
		useStyle
	} from '../../composables'

	import { ORIGAM_BTN_TOGGLE_KEY } from '../../consts'
	import { MODE } from "../../enums"

	import type { IBottomNavProps, IBreadcrumbItemProps } from '../../interfaces'
	import type { TOrigamBtn } from "../../types"

	import { convertToUnit, int } from '../../utils'

	import { computed, ComputedRef, Ref, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IBottomNavProps>(), {
		tag: 'nav',
		name: 'bottom-navigation',
		modelValue: true,
		selectedClass: 'origam-bottom-nav__btn--selected',
		mode: MODE.VERTICAL,
		items: () => [] as Array<TOrigamBtn>
	})

	defineEmits(['update:modelValue', 'update:active', 'update:hover'])

	const {filterProps} = useProps<IBottomNavProps>(props)

	const {borderClasses, borderStyles} = useBorder(props)
	const {isActive, activeClasses} = useActive(props, 'modelValue')
	const {isHover, hoverClasses, onMouseenter: handleMouseenter, onMouseleave: handleMouseleave} = useHover(props)
	const {colorStyles} = useColorEffect(props, isHover, isActive as unknown as ComputedRef<boolean>)
	const {densityClasses} = useDensity(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {ssrBootStyles} = useSsrBoot()

	const height = computed(() => {
		if (props.height) {
			return Number(props.height) - (props.density === 'compact' ? 8 : 0)
		}

		return 48
	})

	const {layoutItemStyles} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order)),
		position: computed(() => 'bottom'),
		layoutSize: computed(() => isActive.value ? height.value : 0),
		elementSize: height,
		active: isActive as Ref<boolean>,
		absolute: toRef(props, 'absolute')
	})

	const items = computed(() => {
		return props.items.map((item) => {
			return {
				...item,
				density: props.density ?? item.density,
				color: props.color ?? item.color,
				bgColor: props.bgColor ?? item.bgColor,
				hoverColor: props.hoverColor ?? item.hoverColor,
				hoverBgColor: props.hoverBgColor ?? item.hoverBgColor,
				activeColor: props.activeColor ?? item.activeColor,
				activeBgColor: props.activeBgColor ?? item.activeBgColor
			}
		}) as Array<IBreadcrumbItemProps>
	})

	useGroup(props, ORIGAM_BTN_TOGGLE_KEY)

	// CLASS & STYLES

	const bottomNavStyles = computed(() => {
		return [
			{
				height: props.height ? convertToUnit(height.value) : undefined,
				transform: `translateY(${convertToUnit(!isActive.value ? 100 : 0, '%')})`
			},
			roundedStyles.value,
			colorStyles.value,
			borderStyles.value,
			layoutItemStyles.value,
			ssrBootStyles.value,
			paddingStyles.value,
			marginStyles.value,
			props.style
		] as StyleValue
	})
	const bottomNavClasses = computed(() => {
		return [
			'origam-bottom-nav',
			`origam-bottom-nav--${props.mode}`,
			{
				'origam-bottom-nav--grow': props.grow
			},
			activeClasses.value,
			hoverClasses.value,
			borderClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			paddingClasses.value,
			marginClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(bottomNavStyles)

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
	.origam-bottom-nav {
		$this: &;

		display: flex;
		overflow: hidden;
		position: absolute;

		transition: var(--origam-bottom-bar---transition);

		max-width: var(--origam-bottom-bar---max-width);
		height: calc(var(--origam-bottom-bar---height) - var(--origam-bottom-bar---density));

		background: var(--origam-bottom-bar---background);
		box-shadow: var(--origam-bottom-bar---box-shadow);
		color: var(--origam-bottom-bar---color);

		border-color: var(--origam-bottom-bar---border-color);
		border-style: var(--origam-bottom-bar---border-style);
		border-width: var(--origam-bottom-bar---border-width);
		border-radius: var(--origam-bottom-bar---border-radius);

		padding-block-start: calc(var(--origam-bottom-bar---padding-block-start) - var(--origam-bottom-bar---density));
		padding-block-end: calc(var(--origam-bottom-bar---padding-block-end) - var(--origam-bottom-bar---density));
		padding-inline-start: calc(var(--origam-bottom-bar---padding-inline-start) - var(--origam-bottom-bar---density));
		padding-inline-end: calc(var(--origam-bottom-bar---padding-inline-end) - var(--origam-bottom-bar---density));
		margin-block-start: var(--origam-bottom-bar---margin-block-start);
		margin-block-end: var(--origam-bottom-bar---margin-block-end);
		margin-inline-start: var(--origam-bottom-bar---margin-inline-start);
		margin-inline-end: var(--origam-bottom-bar---margin-inline-end);

		&__content {
			flex: none;
			display: flex;
			justify-content: var(--origam-bottom-bar__content---justify-content);
			align-items: var(--origam-bottom-bar__content---align-items);
			flex-wrap: var(--origam-bottom-bar__content---flex-wrap);
			width: 100%;
			transform: var(--origam-bottom-bar__content--transform);

			> :deep(.origam-btn) {
				--origam-btn---font-size: 0.75rem;
				--origam-btn---text-transform: none;

				--origam-btn---height: 100%;
				--origam-btn---width: auto;
				--origam-btn---max-width: 168px;
				--origam-btn---min-width: 80px;

				--origam-btn---border-radius: 0;

				.origam-btn__content,
				.origam-btn__icon {
					transition: inherit;
				}

				.origam-btn__icon {
					font-size: 1.5rem;
				}
			}
		}

		&--elevated {
			--origam-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--origam-bottom-bar---border-width: thin;
		}

		&--rounded {
			--origam-bottom-bar---border-radius: 4px;
		}

		&--density-comfortable {
			--origam-bottom-bar---density: 8px;
		}

		&--density-default {
			--origam-bottom-bar---density: 0px;
		}

		&--density-compact {
			--origam-bottom-bar---density: 8px;
		}

		&--active {
			--origam-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--grow {
			#{$this}__content {
				> :deep(.origam-btn) {
					flex-grow: 1;
				}
			}
		}

		&--horizontal {
			#{$this}__content {
				> :deep(.origam-btn) {
					.origam-btn__loader {
						display: flex;
					}
				}
			}
		}

		&--vertical,
		&--shift {
			#{$this}__content {
				> :deep(.origam-btn) {
					.origam-btn__loader {
						grid-template-areas: "prepend" "content" "append";
						grid-template-columns: auto;
						grid-template-rows: max-content max-content max-content;
						justify-items: center;
						align-content: center;
					}

					.origam-btn__prepend {
						--origam-btn__prepend---margin-inline-end: 0;
					}

					.origam-btn__append {
						--origam-btn__prepend---margin-inline-start: 0;
					}

					.origam-btn__content {
						--origam-btn__prepend---margin-inline-start: 0;
						--origam-btn__prepend---margin-inline-end: 0;
					}
				}
			}
		}

		&--shift {
			#{$this}__content {
				> :deep(.origam-btn) {
					&:not(#{$this}__item--selected) {
						.origam-btn__content {
							--origam-bottom-bar__content--transform: translateY(0.5rem);
							transition: inherit;
							opacity: 0;
						}
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--origam-bottom-bar---border-top-width: 0;
		--origam-bottom-bar---border-left-width: 0;
		--origam-bottom-bar---border-bottom-width: 0;
		--origam-bottom-bar---border-right-width: 0;
		--origam-bottom-bar---border-width: var(--origam-bottom-bar---border-top-width) var(--origam-bottom-bar---border-left-width) var(--origam-bottom-bar---border-bottom-width) var(--origam-bottom-bar---border-right-width);
		--origam-bottom-bar---border-color: currentColor;
		--origam-bottom-bar---border-style: solid;
		--origam-bottom-bar---border-radius: 0;
		--origam-bottom-bar---density: 0;
		--origam-bottom-bar---max-width: 100%;
		--origam-bottom-bar---height: 48px;
		--origam-bottom-bar---box-shadow: none;
		--origam-bottom-bar---color: rgba(0, 0, 0, 0.87);
		--origam-bottom-bar---background: rgb(230, 230, 230);
		--origam-bottom-bar---margin-inline-start: 0;
		--origam-bottom-bar---margin-inline-end: 0;
		--origam-bottom-bar---margin-block-start: 0;
		--origam-bottom-bar---margin-block-end: 0;
		--origam-bottom-bar---padding-block-start: 8px;
		--origam-bottom-bar---padding-block-end: 8px;
		--origam-bottom-bar---padding-inline-start: 8px;
		--origam-bottom-bar---padding-inline-end: 8px;
		--origam-bottom-bar---transition-duration: 0.2s, 0.1s;
		--origam-bottom-bar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--origam-bottom-bar---transition-property: transform, color;
		--origam-bottom-bar---transition: var(--origam-bottom-bar---transition-property) var(--origam-bottom-bar---transition-duration) var(--origam-bottom-bar---transition-timing-function);

		--origam-bottom-bar__content---justify-content: center;
		--origam-bottom-bar__content---align-items: center;
		--origam-bottom-bar__content---flex-wrap: nowrap;
		--origam-bottom-bar__content--transform: none;
	}
</style>
