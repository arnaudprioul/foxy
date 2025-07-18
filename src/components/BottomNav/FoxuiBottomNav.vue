<template>
	<component
			:is="tag"
			:id="id"
			:class="bottomNavClasses"
			@mouseenter="handleMouseenter"
			@mouseleave="handleMouseleave"
	>
		<div class="foxui-bottom-nav__content">
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
							<foxui-btn
									ref="foxuiBtnRef"
									class="foxui-bottom-nav__btn"
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
	import { FoxuiBtn } from "@foxui/components"
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
	} from '@foxui/composables'

	import { FOXUI_BTN_TOGGLE_KEY } from '@foxui/consts'
	import { MODE } from "@foxui/enums"

	import type { IBottomNavProps, IBreadcrumbItemProps } from '@foxui/interfaces'
	import type { TFoxuiBtn } from "@foxui/types"

	import { convertToUnit, int } from '@foxui/utils'

	import { computed, ComputedRef, Ref, StyleValue, toRef } from 'vue'

	const props = withDefaults(defineProps<IBottomNavProps>(), {
		tag: 'nav',
		name: 'bottom-navigation',
		modelValue: true,
		selectedClass: 'foxui-bottom-nav__btn--selected',
		mode: MODE.VERTICAL,
		items: () => [] as Array<TFoxuiBtn>
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

	useGroup(props, FOXUI_BTN_TOGGLE_KEY)

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
			'foxui-bottom-nav',
			`foxui-bottom-nav--${props.mode}`,
			{
				'foxui-bottom-nav--grow': props.grow
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
	.foxui-bottom-nav {
		$this: &;

		display: flex;
		overflow: hidden;
		position: absolute;

		transition: var(--foxui-bottom-bar---transition);

		max-width: var(--foxui-bottom-bar---max-width);
		height: calc(var(--foxui-bottom-bar---height) - var(--foxui-bottom-bar---density));

		background: var(--foxui-bottom-bar---background);
		box-shadow: var(--foxui-bottom-bar---box-shadow);
		color: var(--foxui-bottom-bar---color);

		border-color: var(--foxui-bottom-bar---border-color);
		border-style: var(--foxui-bottom-bar---border-style);
		border-width: var(--foxui-bottom-bar---border-width);
		border-radius: var(--foxui-bottom-bar---border-radius);

		padding-block-start: calc(var(--foxui-bottom-bar---padding-block-start) - var(--foxui-bottom-bar---density));
		padding-block-end: calc(var(--foxui-bottom-bar---padding-block-end) - var(--foxui-bottom-bar---density));
		padding-inline-start: calc(var(--foxui-bottom-bar---padding-inline-start) - var(--foxui-bottom-bar---density));
		padding-inline-end: calc(var(--foxui-bottom-bar---padding-inline-end) - var(--foxui-bottom-bar---density));
		margin-block-start: var(--foxui-bottom-bar---margin-block-start);
		margin-block-end: var(--foxui-bottom-bar---margin-block-end);
		margin-inline-start: var(--foxui-bottom-bar---margin-inline-start);
		margin-inline-end: var(--foxui-bottom-bar---margin-inline-end);

		&__content {
			flex: none;
			display: flex;
			justify-content: var(--foxui-bottom-bar__content---justify-content);
			align-items: var(--foxui-bottom-bar__content---align-items);
			flex-wrap: var(--foxui-bottom-bar__content---flex-wrap);
			width: 100%;
			transform: var(--foxui-bottom-bar__content--transform);

			> :deep(.foxui-btn) {
				--foxui-btn---font-size: 0.75rem;
				--foxui-btn---text-transform: none;

				--foxui-btn---height: 100%;
				--foxui-btn---width: auto;
				--foxui-btn---max-width: 168px;
				--foxui-btn---min-width: 80px;

				--foxui-btn---border-radius: 0;

				.foxui-btn__content,
				.foxui-btn__icon {
					transition: inherit;
				}

				.foxui-btn__icon {
					font-size: 1.5rem;
				}
			}
		}

		&--elevated {
			--foxui-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--border {
			--foxui-bottom-bar---border-width: thin;
		}

		&--rounded {
			--foxui-bottom-bar---border-radius: 4px;
		}

		&--density-comfortable {
			--foxui-bottom-bar---density: 8px;
		}

		&--density-default {
			--foxui-bottom-bar---density: 0px;
		}

		&--density-compact {
			--foxui-bottom-bar---density: 8px;
		}

		&--active {
			--foxui-bottom-bar---box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--grow {
			#{$this}__content {
				> :deep(.foxui-btn) {
					flex-grow: 1;
				}
			}
		}

		&--horizontal {
			#{$this}__content {
				> :deep(.foxui-btn) {
					.foxui-btn__loader {
						display: flex;
					}
				}
			}
		}

		&--vertical,
		&--shift {
			#{$this}__content {
				> :deep(.foxui-btn) {
					.foxui-btn__loader {
						grid-template-areas: "prepend" "content" "append";
						grid-template-columns: auto;
						grid-template-rows: max-content max-content max-content;
						justify-items: center;
						align-content: center;
					}

					.foxui-btn__prepend {
						--foxui-btn__prepend---margin-inline-end: 0;
					}

					.foxui-btn__append {
						--foxui-btn__prepend---margin-inline-start: 0;
					}

					.foxui-btn__content {
						--foxui-btn__prepend---margin-inline-start: 0;
						--foxui-btn__prepend---margin-inline-end: 0;
					}
				}
			}
		}

		&--shift {
			#{$this}__content {
				> :deep(.foxui-btn) {
					&:not(#{$this}__item--selected) {
						.foxui-btn__content {
							--foxui-bottom-bar__content--transform: translateY(0.5rem);
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
		--foxui-bottom-bar---border-top-width: 0;
		--foxui-bottom-bar---border-left-width: 0;
		--foxui-bottom-bar---border-bottom-width: 0;
		--foxui-bottom-bar---border-right-width: 0;
		--foxui-bottom-bar---border-width: var(--foxui-bottom-bar---border-top-width) var(--foxui-bottom-bar---border-left-width) var(--foxui-bottom-bar---border-bottom-width) var(--foxui-bottom-bar---border-right-width);
		--foxui-bottom-bar---border-color: currentColor;
		--foxui-bottom-bar---border-style: solid;
		--foxui-bottom-bar---border-radius: 0;
		--foxui-bottom-bar---density: 0;
		--foxui-bottom-bar---max-width: 100%;
		--foxui-bottom-bar---height: 48px;
		--foxui-bottom-bar---box-shadow: none;
		--foxui-bottom-bar---color: rgba(0, 0, 0, 0.87);
		--foxui-bottom-bar---background: rgb(230, 230, 230);
		--foxui-bottom-bar---margin-inline-start: 0;
		--foxui-bottom-bar---margin-inline-end: 0;
		--foxui-bottom-bar---margin-block-start: 0;
		--foxui-bottom-bar---margin-block-end: 0;
		--foxui-bottom-bar---padding-block-start: 8px;
		--foxui-bottom-bar---padding-block-end: 8px;
		--foxui-bottom-bar---padding-inline-start: 8px;
		--foxui-bottom-bar---padding-inline-end: 8px;
		--foxui-bottom-bar---transition-duration: 0.2s, 0.1s;
		--foxui-bottom-bar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-bottom-bar---transition-property: transform, color;
		--foxui-bottom-bar---transition: var(--foxui-bottom-bar---transition-property) var(--foxui-bottom-bar---transition-duration) var(--foxui-bottom-bar---transition-timing-function);

		--foxui-bottom-bar__content---justify-content: center;
		--foxui-bottom-bar__content---align-items: center;
		--foxui-bottom-bar__content---flex-wrap: nowrap;
		--foxui-bottom-bar__content--transform: none;
	}
</style>
