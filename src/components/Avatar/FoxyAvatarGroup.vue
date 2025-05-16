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
				<foxy-avatar
						:id="`avatar-${index}`"
						ref="foxyAvatarRef"
						class="foxy-avatar-group__item"
						v-bind="avatarDisplayProps(item)"
				/>
			</slot>
		</template>

		<template v-if="restItems.length">
			<slot
					name="rest"
					v-bind="{rest: restItems, length: restItems.length}"
			>
				<foxy-avatar
						ref="foxyAvatarRef"
						class="foxy-avatar-group__rest"
						v-bind="avatarProps"
				>
					<template #default>
						<slot name="default">
							+{{ restItems.length }}
						</slot>
					</template>
				</foxy-avatar>
			</slot>
		</template>
	</component>
</template>

<script
		lang="ts"
		setup
>

	import { FoxyAvatar } from "@foxy/components"
	import { useActive, useHover, useMargin, usePadding, useProps, useRtl, useStyle } from "@foxy/composables"
	import { DIRECTION } from "@foxy/enums"
	import type { IAvatarGroupProps, IAvatarProps } from "@foxy/interfaces"
	import type { TFoxyAvatar } from '@foxy/types'

	import { computed, mergeProps, ref, StyleValue, VNodeProps } from "vue"

	const props = withDefaults(defineProps<IAvatarGroupProps>(), {
		items: () => [],
		max: 5,
		tag: 'div',
		direction: DIRECTION.HORIZONTAL
	})

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
	const {activeClasses, isActive, onClick} = useActive(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {paddingClasses, paddingStyles} = usePadding(props)

	const foxyAvatarRef = ref<TFoxyAvatar>()
	const avatarProps = computed(() => {
		return foxyAvatarRef.value?.[0]?.filterProps(props, ['margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom']) || foxyAvatarRef.value?.filterProps(props, ['margin', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom', 'padding', 'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom'])
	})

	const avatarDisplayProps = (item: IAvatarProps) => {
		return mergeProps(item as VNodeProps, avatarProps.value, {hover: isHover.value, active: isActive.value})
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

		onClick()
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
			'foxy-avatar-group',
			`foxy-avatar-group--${props.direction}`,
			{
				'foxy-avatar-group--expand-on-hover': props.expandOnHover,
				'foxy-avatar-group--expand-on-click': props.expandOnClick,
				'foxy-avatar-group--rtl': isRtl
			},
			hoverClasses.value,
			activeClasses.value,
			marginClasses.value,
			paddingClasses.value,
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
	.foxy-avatar-group {
		$this: &;

		flex-wrap: nowrap;
		display: inline-flex;
		position: relative;

		&--expand-on-hover,
		&--expand-on-click {
			.foxy-avatar {
				&:not(:first-child) {
					transition: margin .3s cubic-bezier(.4, 0, .2, 1);
				}
			}
		}

		&--horizontal {
			flex-direction: row;

			.foxy-avatar {
				&:not(:first-child) {
					margin-left: -18px;
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					.foxy-avatar {
						&:not(:first-child) {
							margin-left: 0;
						}
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					.foxy-avatar {
						&:not(:first-child) {
							margin-left: 0;
						}
					}
				}
			}
		}

		&--vertical {
			flex-direction: column;

			.foxy-avatar {
				&:not(:first-child) {
					margin-top: -18px;
				}
			}

			&#{$this}--expand-on-hover {
				&:hover {
					.foxy-avatar {
						&:not(:first-child) {
							margin-top: 0;
						}
					}
				}
			}

			&#{$this}--expand-on-click {
				&#{$this}--active {
					.foxy-avatar {
						&:not(:first-child) {
							margin-top: 0;
						}
					}
				}
			}
		}
	}
</style>
