<template>
	<component
			:is="tag"
			:class="avatarGroupClasses"
			:style="avatarGroupStyles"
			role="group"
			@click="handleClick"
			@mouseenter="handleMouseEnter"
			@mouseleave="handleMouseLeave"
	>
		<template
				v-for="(item, index) in displayItems"
				:key="index"
		>
			<slot
					name="avatar"
					v-bind="{item, index}"
			>
				<foxui-avatar
						:id="`avatar-${index}`"
						ref="foxuiAvatarRef"
						class="foxui-avatar-group__item"
						v-bind="avatarProps(item)"
				/>
			</slot>
		</template>

		<template v-if="restItems.length">
			<slot
					name="rest"
					v-bind="{rest: restItems, length: restItems.length}"
			>
				<foxui-avatar
						ref="foxuiAvatarRef"
						class="foxui-avatar-group__rest"
						v-bind="avatarProps"
				>
					<template #default>
						<slot name="default">
							+{{ restItems.length }}
						</slot>
					</template>
				</foxui-avatar>
			</slot>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>

	import { FoxuiAvatar } from "@foxui/components"
	import {
		useActive,
		useDensity,
		useHover,
		useMargin,
		usePadding,
		useProps,
		useRtl,
		useStyle
	} from "@foxui/composables"
	import { DIRECTION } from "@foxui/enums"
	import type { IAvatarGroupProps, IAvatarProps } from "@foxui/interfaces"
	import type { TFoxuiAvatar } from '@foxui/types'

	import type { StyleValue, VNodeProps } from 'vue'
	import { computed, mergeProps, ref } from "vue"

	const props = withDefaults(defineProps<IAvatarGroupProps>(), {
		items: () => [],
		max: 5,
		tag: 'div',
		direction: DIRECTION.HORIZONTAL
	})

	defineEmits(['update:active', 'update:hover'])

	const {filterProps} = useProps<IAvatarGroupProps>(props)

	const {isRtl} = useRtl()

	const max = ref(props.max)

	const restItems = computed(() => {
		if (props.items.length > max.value) {
			return props.items.slice(max.value - 1, props.items.length)
		}

		return []
	})
	const displayItems = computed(() => {
		if (props.items.length > max.value) {
			return props.items.slice(0, max.value - 1)
		}

		if (props.items.length === max.value) {
			return props.items.slice(0, max.value)
		}

		return props.items
	})

	const {hoverClasses, isHover, onMouseleave, onMouseenter} = useHover(props)
	const {activeClasses, isActive, onActive} = useActive(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {densityClasses} = useDensity(props)

	const foxuiAvatarRef = ref<TFoxuiAvatar>()
	const avatarProps = (item: IAvatarProps = {}) => {
		const ignoreProps = ['margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']
		const avatarDefaultProps = foxuiAvatarRef.value?.[0]?.filterProps(props, ignoreProps) || foxuiAvatarRef.value?.filterProps(props, ignoreProps)

		return mergeProps(item as VNodeProps, avatarDefaultProps, {hover: isHover.value, active: isActive.value})
	}

	const handleMouseEnter = () => {
		if (props.expandOnHover) {
			max.value = props.items.length
		}

		onMouseenter()
	}
	const handleMouseLeave = () => {
		if (props.expandOnHover) {
			max.value = props.max
		}

		onMouseleave()
	}

	const handleClick = () => {
		if (props.expandOnClick) {
			if (isActive.value) {
				max.value = props.max
			} else {
				max.value = props.items.length
			}
		}

		onActive()
	}

	// CLASS & STYLES

	const avatarGroupStyles = computed(() => {
		return [
			marginStyles.value,
			paddingStyles.value,
			props.style
		] as StyleValue
	})
	const avatarGroupClasses = computed(() => {
		return [
			'foxui-avatar-group',
			`foxui-avatar-group--${props.direction}`,
			{
				'foxui-avatar-group--expand-on-hover': props.expandOnHover,
				'foxui-avatar-group--expand-on-click': props.expandOnClick,
				'foxui-avatar-group--rtl': isRtl
			},
			hoverClasses.value,
			activeClasses.value,
			marginClasses.value,
			paddingClasses.value,
			densityClasses.value,
			props.class
		]
	})

	const {id, css, load, isLoaded, unload} = useStyle(avatarGroupStyles)

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
	.foxui-avatar-group {
		$this: &;

		position: var(--foxui-avatar-group---position);

		flex-wrap: nowrap;
		display: inline-flex;
		flex-direction: var(--foxui-avatar-group---flex-direction);

		padding-block-start: var(--foxui-avatar-group---padding-block-start);
		padding-block-end: var(--foxui-avatar-group---padding-block-end);
		padding-inline-start: var(--foxui-avatar-group---padding-inline-start);
		padding-inline-end: var(--foxui-avatar-group---padding-inline-end);
		margin-block-start: var(--foxui-avatar-group---margin-block-start);
		margin-block-end: var(--foxui-avatar-group---margin-block-end);
		margin-inline-start: var(--foxui-avatar-group---margin-inline-start);
		margin-inline-end: var(--foxui-avatar-group---margin-inline-end);

		&___item {
			margin-block-start: var(--foxui-avatar-group__item---margin-block-start);
			margin-block-end: var(--foxui-avatar-group__item---margin-block-end);
			margin-inline-start: var(--foxui-avatar-group__item---margin-inline-start);
			margin-inline-end: var(--foxui-avatar-group__item---margin-inline-end);
		}

		&--expand-on-hover,
		&--expand-on-click {
			#{$this}___item {
				&:not(:first-child) {
					transition: var(--foxui-avatar-group__avatar---transition);
				}
			}
		}

		&--elevated {
			box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
		}

		&--density-comfortable {
			--foxui-avatar-group---density: 8px;
		}

		&--density-default {
			--foxui-avatar-group---density: 0px;
		}

		&--density-compact {
			--foxui-avatar-group---density: 8px;
		}

		&--horizontal {
			--foxui-avatar-group---flex-direction: row;

			#{$this}___item {
				&:not(:first-child) {
					--foxui-avatar-group---margin-inline-start: calc(-18px + var(--foxui-avatar-group---density));
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					#{$this}___item {
						--foxui-avatar-group---margin-inline-start: 0;
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					#{$this}___item {
						--foxui-avatar-group---margin-inline-start: 0;
					}
				}
			}
		}

		&--vertical {
			flex-direction: column;

			#{$this}___item {
				&:not(:first-child) {
					--foxui-avatar-group---margin-block-start: calc(-18px + var(--foxui-avatar-group---density));
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					#{$this}___item {
						--foxui-avatar-group---margin-block-start: 0;
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					#{$this}___item {
						--foxui-avatar-group---margin-block-start: 0;
					}
				}
			}
		}
	}
</style>

<style>
	:root {
		--foxui-avatar-group---flex-direction: row;
		--foxui-avatar-group---position: relative;
		--foxui-avatar-group---density: 0;
		--foxui-avatar-group---margin-inline-start: 0;
		--foxui-avatar-group---margin-inline-end: 0;
		--foxui-avatar-group---margin-block-start: 0;
		--foxui-avatar-group---margin-block-end: 0;
		--foxui-avatar-group---padding-block-start: 0;
		--foxui-avatar-group---padding-block-end: 0;
		--foxui-avatar-group---padding-inline-start: 0;
		--foxui-avatar-group---padding-inline-end: 0;

		--foxui-avatar-group__avatar---transition-duration: 0.2s;
		--foxui-avatar-group__avatar---transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
		--foxui-avatar-group__avatar---transition-property: margin;
		--foxui-avatar-group__avatar---transition: var(--foxui-avatar-group__avatar---transition-property) var(--foxui-avatar-group__avatar---transition-duration) var(--foxui-avatar-group__avatar---transition-timing-function);
		--foxui-avatar-group__avatar---margin-inline-start: 0;
		--foxui-avatar-group__avatar---margin-inline-end: 0;
		--foxui-avatar-group__avatar---margin-block-start: 0;
		--foxui-avatar-group__avatar---margin-block-end: 0;
	}
</style>
