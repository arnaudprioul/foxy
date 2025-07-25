<template>
	<origam-overlay
			:id="id"
			ref="origamOverlayRef"
			v-model="isActive"
			:activator="activator"
			:activator-props="activatorProps"
			:class="menuClasses"
			:open-on-click="openOnClick"
			:open-on-context-menu="openOnContextMenu"
			:style="menuStyles"
			:target="target"
			absolute
			role="menu"
			v-bind="{...overlayProps, ...scopeId}"
			@keydown="handleKeydown"
			@click:outside="handleClickOutside"
	>
		<template #activator="{props}">
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default>
			<slot name="default">
				<origam-list class="origam-menu__list">
					<origam-list-subheader
							v-if="title"
							class="origam-menu__title"
					>{{ title }}
					</origam-list-subheader>
					<origam-list-group class="origam-menu__items">
						<template
								v-for="(item, index) in items"
								:key="index"
						>
							<origam-list-item
									v-if="!hasChilds(item)"
									class="origam-menu__item"
									v-bind="item"
							/>
							<origam-menu
									v-else
									:offset="[8,8]"
									:open-on-context-menu="false"
									open-on-click
									v-bind="{...item, ...overlayProps}"
							>
								<template #activator="{props}">
									<origam-list-item
											:append-icon="MDI_ICONS.CHEVRON_RIGHT"
											class="origam-menu__item"
											v-bind="{...props, ...item}"
									/>
								</template>
							</origam-menu>
						</template>
					</origam-list-group>
				</origam-list>
			</slot>
		</template>
	</origam-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, mergeProps, nextTick, provide, ref, shallowRef, StyleValue, watch } from 'vue'
	import {
		OrigamList,
		OrigamListGroup,
		OrigamListItem,
		OrigamListSubheader,
		OrigamOverlay,
		OrigamTranslateScale
	} from '../../components'

	import { useProps, useScopeId, useVModel } from '../../composables'

	import { ORIGAM_MENU_KEY } from '../../consts'

	import { INLINE, KEYBOARD_VALUES, LOCATION_STRATEGIES, MDI_ICONS, SCROLL_STRATEGIES } from '../../enums'

	import type { IItemProps, IMenuProps } from '../../interfaces'

	import type { TOrigamOverlay, TTransitionProps } from '../../types'

	import { focusableChildren, focusChild, forwardRefs, getNextElement, getUid } from '../../utils'

	const props = withDefaults(defineProps<IMenuProps>(), {
		closeDelay: 250,
		closeOnContentClick: true,
		locationStrategy: LOCATION_STRATEGIES.CONNECTED,
		openDelay: 300,
		scrim: false,
		openOnClick: true,
		location: INLINE.RIGHT,
		scrollStrategy: SCROLL_STRATEGIES.REPOSITION,
		offset: 8,
		transition: () => ({component: OrigamTranslateScale}) as unknown as TTransitionProps
	})

	defineEmits(['update:modelValue', 'contextmenu'])

	const {filterProps} = useProps<IMenuProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()

	const uid = getUid()
	const id = computed(() => props.id || `origam-menu--${uid}`)

	const origamOverlayRef = ref<TOrigamOverlay>()

	const parent = inject(ORIGAM_MENU_KEY, null)
	const openChildren = shallowRef(0)

	provide(ORIGAM_MENU_KEY, {
		register () {
			++openChildren.value
		},
		unregister () {
			--openChildren.value
		},
		closeParents () {
			setTimeout(() => {
				if (!openChildren.value) {
					isActive.value = false
					parent?.closeParents()
				}
			}, 40)
		}
	})

	const handleFocusIn = async (e: FocusEvent) => {
		const before = e.relatedTarget as HTMLElement | null
		const after = e.target as HTMLElement | null

		await nextTick()

		if (
				isActive.value &&
				before !== after &&
				origamOverlayRef.value?.contentEl &&
				// We're the topmost menu
				origamOverlayRef.value?.globalTop &&
				// It isn't the document or the menu body
				![document, origamOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the menu body
				!origamOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(origamOverlayRef.value.contentEl)
			focusable[0]?.focus()
		}
	}

	watch(isActive, (val) => {
		if (val) {
			parent?.register()
			document.addEventListener('focusin', handleFocusIn, {once: true})
		} else {
			parent?.unregister()
			document.removeEventListener('focusin', handleFocusIn)
		}
	})

	const handleClickOutside = () => {
		parent?.closeParents()
	}
	const handleKeydown = (e: KeyboardEvent) => {
		if (props.disabled) return

		if (e.key === KEYBOARD_VALUES.TAB) {
			const nextElement = getNextElement(
					focusableChildren(origamOverlayRef.value?.contentEl as Element, false),
					e.shiftKey ? 'prev' : 'next',
					(el: HTMLElement) => el.tabIndex >= 0
			)
			if (!nextElement) {
				isActive.value = false
				origamOverlayRef.value?.activatorEl?.focus()
			}
		}
	}
	const handleActivatorKeydown = (e: KeyboardEvent) => {
		if (props.disabled) return

		const el = origamOverlayRef.value?.contentEl
		const keyDown = [KEYBOARD_VALUES.DOWN, KEYBOARD_VALUES.UP]

		if (el && isActive.value) {
			if (e.key === KEYBOARD_VALUES.DOWN) {
				e.preventDefault()
				focusChild(el, 'next')
			} else if (e.key === KEYBOARD_VALUES.UP) {
				e.preventDefault()
				focusChild(el, 'prev')
			}
		} else if (keyDown.includes(e.key as typeof keyDown[number])) {
			isActive.value = true
			e.preventDefault()
			setTimeout(() => setTimeout(() => handleActivatorKeydown(e)))
		}
	}

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-haspopup': 'menu',
			'aria-expanded': String(isActive.value),
			'aria-owns': id.value,
			onKeydown: handleActivatorKeydown
		}, props.activatorProps)
	})

	const overlayProps = computed(() => {
		console.log(origamOverlayRef.value?.filterProps(props, ['activatorProps', 'id', 'class', 'style', 'role', 'modelValue', 'absolute', 'activator', 'target', 'openOnClick', 'openOnContextMenu']))

		return origamOverlayRef.value?.filterProps(props, ['activatorProps', 'id', 'class', 'style', 'role', 'modelValue', 'absolute', 'activator', 'target', 'openOnClick', 'openOnContextMenu'])
	})

	const hasChilds = (item: IItemProps) => {
		return item?.items
	}

	// CLASS & STYLES

	const menuStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const menuClasses = computed(() => {
		return [
			'origam-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({openChildren, filterProps}, origamOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.origam-menu {

	}
</style>

<style>
	:root {

	}
</style>
