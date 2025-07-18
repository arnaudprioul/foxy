<template>
	<teleport
			v-if="isActive"
			:to="teleportDrawer"
	>
		<component
				:is="tag"
				:ref="rootEl"
				:class="drawerClasses"
				:style="drawerStyles"
				v-bind="{...scopeId, ...$attrs}"
				@mouseenter="handleMouseEnter"
				@mouseleave="handleMouseLeave"
		>
			<div class="foxui-drawer__wrapper">
				<slot name="wrapper">
					<div
							v-if="hasPrepend"
							class="foxui-drawer__prepend"
					>
						<slot name="prepend"/>
					</div>

					<div
							v-if="hasContent"
							class="foxui-drawer__content"
					>
						<slot name="default"/>
					</div>

					<div
							v-if="hasAppend"
							class="foxui-drawer__append"
					>
						<slot name="append"/>
					</div>
				</slot>
			</div>
		</component>
		<foxui-overlay-scrim
				:active="isTemporary && (isDragging || isActive && !!scrim)"
				:scrim="scrim"
				:style="scrimStyles"
				v-bind="scopeId"
				@click="handleClickScrim"
		/>
	</teleport>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiOverlayScrim } from '@foxui/components'

	import {
		useBackgroundColor,
		useBorder,
		useDensity,
		useElevation,
		useLayoutItem,
		useMargin,
		usePadding,
		useProps,
		useRounded,
		useRouter,
		useScopeId,
		useSsrBoot,
		useSticky,
		useToggleScope,
		useTouch,
		useVModel
	} from '@foxui/composables'

	import { INLINE } from '@foxui/enums'

	import type { IDrawerProps } from '@foxui/interfaces'

	import { getUid, int } from "@foxui/utils"

	import {
		computed,
		ComputedRef,
		nextTick,
		onBeforeMount,
		Ref,
		ref,
		shallowRef,
		StyleValue,
		toRef,
		useSlots,
		watch
	} from 'vue'

	const props = withDefaults(defineProps<IDrawerProps>(), {
		tag: 'nav',
		permanent: null,
		rail: null,
		railWidth: 56,
		scrim: true,
		width: 256,
		location: INLINE.LEFT,
		modelValue: true
	})

	const emits = defineEmits(['update:rail'])

	const {filterProps} = useProps<IDrawerProps>(props)

	const {backgroundColorStyles} = useBackgroundColor(toRef(props, 'bgColor'))
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const {borderClasses, borderStyles} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {densityClasses} = useDensity(props)
	const slots = useSlots()
	const router = useRouter()
	const {ssrBootStyles} = useSsrBoot()
	const {scopeId} = useScopeId()

	const isActive = useVModel(props, 'modelValue', false, v => !!v)
	const rootEl = ref<HTMLElement>()
	const isHovering = shallowRef(false)

	const width = computed(() => {
		return (props.rail && props.expandOnHover && isHovering.value)
				? Number(props.width)
				: Number(props.rail ? props.railWidth : props.width)
	})
	const location = computed(() => {
		return props.location as 'left' | 'right' | 'bottom'
	})
	const isTemporary = computed(() => !props.permanent && (props.temporary))
	const isSticky = computed(() => {
		return props.sticky && !isTemporary.value && location.value !== 'bottom'
	})

	useToggleScope(() => props.expandOnHover && props.rail != null, () => {
		watch(isHovering, val => emits('update:rail', !val))
	})
	useToggleScope(() => !props.disableResizeWatcher, () => {
		watch(isTemporary, val => !props.permanent && (nextTick(() => isActive.value = !val)))
	})
	useToggleScope(() => !props.disableRouteWatcher && !!router, () => {
		watch(router!.currentRoute, () => isTemporary.value && (isActive.value = false))
	})

	watch(() => props.permanent, val => {
		if (val) isActive.value = true
	})

	onBeforeMount(() => {
		if (props.modelValue != null || isTemporary.value) return

		isActive.value = props.permanent as boolean
	})

	// DRAG

	const {isDragging, dragProgress, dragStyles} = useTouch({
		isActive: isActive as Ref<boolean>,
		isTemporary,
		width,
		touchless: toRef(props, 'touchless'),
		position: location
	})

	// LAYOUT

	const layoutSize = computed(() => {
		const size = isTemporary.value ? 0
				: props.rail && props.expandOnHover ? Number(props.railWidth)
						: width.value

		return isDragging.value ? size * dragProgress.value : size
	})

	const {layoutItemStyles, layoutItemScrimStyles, layoutId} = useLayoutItem({
		id: props.name,
		order: computed(() => int(props.order as string || getUid().toString() as string)),
		position: location,
		layoutSize,
		elementSize: width,
		active: computed(() => isActive.value || isDragging.value) as ComputedRef<boolean>,
		disableTransitions: computed(() => isDragging.value),
		absolute: computed(() =>
				props.absolute || (isSticky.value && typeof isStuck.value !== 'string')
		)
	})

	const teleportDrawer = computed(() => {
		return `#${layoutId.value} .foxui-layout__wrapper`
	})

	const {isStuck, stickyStyles} = useSticky({rootEl, isSticky, layoutItemStyles})

	// SCRIM
	const scrimStyles = computed(() => ({
		...isDragging.value ? {
			opacity: dragProgress.value * 0.2,
			transition: 'none'
		} : undefined,
		...layoutItemScrimStyles.value
	}))

	const handleClickScrim = () => {
		isActive.value = false
	}

	// HOVER

	const handleMouseEnter = () => {
		isHovering.value = true
	}
	const handleMouseLeave = () => {
		isHovering.value = false
	}

	// SLOTS

	const hasPrepend = computed(() => {
		return slots.prepend
	})
	const hasContent = computed(() => {
		return slots.default
	})
	const hasAppend = computed(() => {
		return slots.append
	})

	// CLASSES & STYLES

	const drawerStyles = computed(() => {
		return [
			backgroundColorStyles.value,
			roundedStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			layoutItemStyles.value,
			dragStyles.value,
			ssrBootStyles.value,
			stickyStyles.value,
			props.style
		] as StyleValue
	})
	const drawerClasses = computed(() => {
		return [
			'foxui-drawer',
			`foxui-drawer--${location.value}`,
			{
				'foxui-drawer--expand-on-hover': props.expandOnHover,
				'foxui-drawer--floating': props.floating,
				'foxui-drawer--is-hovering': isHovering.value,
				'foxui-drawer--rail': props.rail,
				'foxui-drawer--temporary': isTemporary.value,
				'foxui-drawer--active': isActive.value,
				'foxui-drawer--sticky': isSticky.value
			},
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			densityClasses.value,
			elevationClasses.value,
			roundedClasses.value,
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
	.foxui-drawer {
		-webkit-overflow-scrolling: touch;

		display: var(--foxui-drawer--display);
		flex-direction: var(--foxui-drawer--flex-direction);

		height: var(--foxui-drawer--height);
		max-width: var(--foxui-drawer--max-width);
		width: var(--foxui-drawer---width);

		pointer-events: var(--foxui-drawer--pointer-events);

		transform: var(--foxui-layout---transform);
		transition-duration: var(--foxui-drawer--transition-duration);
		transition-property: var(--foxui-drawer--transition-property);
		transition-timing-function: var(--foxui-drawer--transition-timing-function);

		position: var(--foxui-layout---position, var(--foxui-drawer--position));
		z-index: var(--foxui-layout---zIndex, 1000);

		border-color: var(--foxui-drawer--border-color);
		border-style: var(--foxui-drawer--border-color);
		border-width: var(--foxui-drawer--border-width);
		border-radius: var(--foxui-drawer--border-radius);

		background: var(--foxui-drawer--background);
		box-shadow: var(--foxui-drawer--box-shadow);
		color: var(--foxui-drawer--color);

		&--border {
			--foxui-drawer--border-width: thin;
			--foxui-drawer--box-shadow: none;
		}

		&--top {
			--foxui-drawer--border-bottom-width: thin;

			top: 0;
			border-bottom-width: var(--foxui-drawer--border-bottom-width);
		}

		&--bottom {
			--foxui-drawer--border-top-width: thin;

			left: 0;
			border-top-width: var(--foxui-drawer--border-top-width);
		}

		&--left {
			--foxui-drawer--border-right-width: thin;

			top: 0;
			left: 0;
			right: auto;

			border-right-width: var(--foxui-drawer--border-right-width);
		}

		&--right {
			--foxui-drawer--border-left-width: thin;

			top: 0;
			left: auto;
			right: 0;

			border-left-width: var(--foxui-drawer--border-left-width);
		}

		&--floating {
			border: none;
		}

		&--temporary {
			--foxui-drawer--box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
		}

		&--sticky {
			--foxui-drawer--height: auto;
			--foxui-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right;
		}

		&:deep(.foxui-list) {
			overflow: hidden;
		}

		&__content {
			flex: 0 1 auto;
			height: 100%;
			max-width: 100%;
			overflow-x: hidden;
			overflow-y: auto;
		}

		&__img {
			height: 100%;
			left: 0;
			position: absolute;
			top: 0;
			width: 100%;
			z-index: -1;

			img {
				height: inherit;
				object-fit: cover;
				width: inherit;
			}
		}

		&__scrim {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: black;
			opacity: 0.2;
			transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
			z-index: 1;
		}

		&__prepend,
		&__append {
			flex: none;
			overflow: hidden;
		}
	}
</style>

<style>
	:root {
		--foxui-drawer--display: flex;
		--foxui-drawer--flex-direction: column;

		--foxui-drawer--border-top-width: 0;
		--foxui-drawer--border-left-width: 0;
		--foxui-drawer--border-bottom-width: 0;
		--foxui-drawer--border-right-width: 0;
		--foxui-drawer--border-width: var(--foxui-drawer--border-top-width) var(--foxui-drawer--border-left-width) var(--foxui-drawer--border-bottom-width) var(--foxui-drawer--border-right-width);
		--foxui-drawer--border-color: rgba(0, 0, 0, 0.87);
		--foxui-drawer--border-style: solid;
		--foxui-drawer--border-start-start-radius: 0;
		--foxui-drawer--border-start-end-radius: 0;
		--foxui-drawer--border-end-start-radius: 0;
		--foxui-drawer--border-end-end-radius: 0;
		--foxui-drawer--border-radius: var(--foxui-drawer--border-start-start-radius) var(--foxui-drawer--border-start-end-radius) var(--foxui-drawer--border-end-start-radius) var(--foxui-drawer--border-end-end-radius);

		--foxui-drawer--position: absolute;

		--foxui-drawer--transition-duration: 0.2s;
		--foxui-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;
		--foxui-drawer--transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--foxui-drawer--height: 100%;
		--foxui-drawer--width: 100%;
		--foxui-drawer--max-width: 100%;

		--foxui-drawer--pointer-events: auto;

		--foxui-drawer--color: rgba(0, 0, 0, 0.87);
		--foxui-drawer--box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--foxui-drawer--background: rgb(255, 255, 255);
	}
</style>
