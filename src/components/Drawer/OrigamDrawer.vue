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
			<div class="origam-drawer__wrapper">
				<slot name="wrapper">
					<div
							v-if="hasPrepend"
							class="origam-drawer__prepend"
					>
						<slot name="prepend"/>
					</div>

					<div
							v-if="hasContent"
							class="origam-drawer__content"
					>
						<slot name="default"/>
					</div>

					<div
							v-if="hasAppend"
							class="origam-drawer__append"
					>
						<slot name="append"/>
					</div>
				</slot>
			</div>
		</component>
		<origam-overlay-scrim
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
	import { OrigamOverlayScrim } from '../../components'

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
	} from '../../composables'

	import { INLINE } from '../../enums'

	import type { IDrawerProps } from '../../interfaces'

	import { getUid, int } from "../../utils"

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
		return `#${layoutId.value} .origam-layout__wrapper`
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
			'origam-drawer',
			`origam-drawer--${location.value}`,
			{
				'origam-drawer--expand-on-hover': props.expandOnHover,
				'origam-drawer--floating': props.floating,
				'origam-drawer--is-hovering': isHovering.value,
				'origam-drawer--rail': props.rail,
				'origam-drawer--temporary': isTemporary.value,
				'origam-drawer--active': isActive.value,
				'origam-drawer--sticky': isSticky.value
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
	.origam-drawer {
		-webkit-overflow-scrolling: touch;

		display: var(--origam-drawer--display);
		flex-direction: var(--origam-drawer--flex-direction);

		height: var(--origam-drawer--height);
		max-width: var(--origam-drawer--max-width);
		width: var(--origam-drawer---width);

		pointer-events: var(--origam-drawer--pointer-events);

		transform: var(--origam-layout---transform);
		transition-duration: var(--origam-drawer--transition-duration);
		transition-property: var(--origam-drawer--transition-property);
		transition-timing-function: var(--origam-drawer--transition-timing-function);

		position: var(--origam-layout---position, var(--origam-drawer--position));
		z-index: var(--origam-layout---zIndex, 1000);

		border-color: var(--origam-drawer--border-color);
		border-style: var(--origam-drawer--border-color);
		border-width: var(--origam-drawer--border-width);
		border-radius: var(--origam-drawer--border-radius);

		background: var(--origam-drawer--background);
		box-shadow: var(--origam-drawer--box-shadow);
		color: var(--origam-drawer--color);

		&--border {
			--origam-drawer--border-width: thin;
			--origam-drawer--box-shadow: none;
		}

		&--top {
			--origam-drawer--border-bottom-width: thin;

			top: 0;
			border-bottom-width: var(--origam-drawer--border-bottom-width);
		}

		&--bottom {
			--origam-drawer--border-top-width: thin;

			left: 0;
			border-top-width: var(--origam-drawer--border-top-width);
		}

		&--left {
			--origam-drawer--border-right-width: thin;

			top: 0;
			left: 0;
			right: auto;

			border-right-width: var(--origam-drawer--border-right-width);
		}

		&--right {
			--origam-drawer--border-left-width: thin;

			top: 0;
			left: auto;
			right: 0;

			border-left-width: var(--origam-drawer--border-left-width);
		}

		&--floating {
			border: none;
		}

		&--temporary {
			--origam-drawer--box-shadow: 0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12);
		}

		&--sticky {
			--origam-drawer--height: auto;
			--origam-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right;
		}

		&:deep(.origam-list) {
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
		--origam-drawer--display: flex;
		--origam-drawer--flex-direction: column;

		--origam-drawer--border-top-width: 0;
		--origam-drawer--border-left-width: 0;
		--origam-drawer--border-bottom-width: 0;
		--origam-drawer--border-right-width: 0;
		--origam-drawer--border-width: var(--origam-drawer--border-top-width) var(--origam-drawer--border-left-width) var(--origam-drawer--border-bottom-width) var(--origam-drawer--border-right-width);
		--origam-drawer--border-color: rgba(0, 0, 0, 0.87);
		--origam-drawer--border-style: solid;
		--origam-drawer--border-start-start-radius: 0;
		--origam-drawer--border-start-end-radius: 0;
		--origam-drawer--border-end-start-radius: 0;
		--origam-drawer--border-end-end-radius: 0;
		--origam-drawer--border-radius: var(--origam-drawer--border-start-start-radius) var(--origam-drawer--border-start-end-radius) var(--origam-drawer--border-end-start-radius) var(--origam-drawer--border-end-end-radius);

		--origam-drawer--position: absolute;

		--origam-drawer--transition-duration: 0.2s;
		--origam-drawer--transition-property: box-shadow, transform, visibility, width, height, left, right, top, bottom;
		--origam-drawer--transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

		--origam-drawer--height: 100%;
		--origam-drawer--width: 100%;
		--origam-drawer--max-width: 100%;

		--origam-drawer--pointer-events: auto;

		--origam-drawer--color: rgba(0, 0, 0, 0.87);
		--origam-drawer--box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.2), 0px 0px 0px 0px rgba(0, 0, 0, 0.14), 0px 0px 0px 0px rgba(0, 0, 0, 0.12);
		--origam-drawer--background: rgb(255, 255, 255);
	}
</style>
