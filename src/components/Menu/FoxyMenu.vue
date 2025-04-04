<template>
	<foxy-overlay
			:id="id"
			ref="foxyOverlayRef"
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
				<foxy-list class="foxy-menu__list">
					<foxy-list-subheader
							v-if="title"
							class="foxy-menu__title"
					>{{ title }}
					</foxy-list-subheader>
					<foxy-list-group class="foxy-menu__items">
						<template
								v-for="(item, index) in items"
								:key="index"
						>
							<foxy-list-item
									v-if="!hasChilds(item)"
									class="foxy-menu__item"
									v-bind="item"
							/>
							<foxy-menu
									v-else
									:offset="[8,8]"
									:open-on-context-menu="false"
									open-on-click
									v-bind="{...item, ...overlayProps}"
							>
								<template #activator="{props}">
									<foxy-list-item
											:append-icon="MDI_ICONS.CHEVRON_RIGHT"
											class="foxy-menu__item"
											v-bind="{...props, ...item}"
									/>
								</template>
							</foxy-menu>
						</template>
					</foxy-list-group>
				</foxy-list>
			</slot>
		</template>
	</foxy-overlay>
</template>

<script
		lang="ts"
		setup
>
	import {
		FoxyList,
		FoxyListGroup,
		FoxyListItem,
		FoxyListSubheader,
		FoxyOverlay,
		FoxyTranslateScale
	} from '@foxy/components'

	import { useProps, useScopeId, useVModel } from '@foxy/composables'

	import { FOXY_MENU_KEY, KEYBOARD_VALUES } from '@foxy/consts'

	import { INLINE, LOCATION_STRATEGIES, MDI_ICONS, SCROLL_STRATEGIES } from '@foxy/enums'

	import { IItemProps, IMenuProps } from '@foxy/interfaces'

	import { TFoxyOverlay, TTransitionProps } from '@foxy/types'

	import { focusableChildren, focusChild, forwardRefs, getNextElement, getUid } from '@foxy/utils'

	import { computed, inject, mergeProps, nextTick, provide, ref, shallowRef, StyleValue, watch } from 'vue'

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
		transition: () => ({component: FoxyTranslateScale}) as unknown as TTransitionProps
	})

	defineEmits(['update:modelValue', 'contextmenu'])

	const {filterProps} = useProps<IMenuProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()

	const uid = getUid()
	const id = computed(() => props.id || `foxy-menu--${uid}`)

	const foxyOverlayRef = ref<TFoxyOverlay>()

	const parent = inject(FOXY_MENU_KEY, null)
	const openChildren = shallowRef(0)

	provide(FOXY_MENU_KEY, {
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
				foxyOverlayRef.value?.contentEl &&
				// We're the topmost menu
				foxyOverlayRef.value?.globalTop &&
				// It isn't the document or the menu body
				![document, foxyOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the menu body
				!foxyOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(foxyOverlayRef.value.contentEl)
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
					focusableChildren(foxyOverlayRef.value?.contentEl as Element, false),
					e.shiftKey ? 'prev' : 'next',
					(el: HTMLElement) => el.tabIndex >= 0
			)
			if (!nextElement) {
				isActive.value = false
				foxyOverlayRef.value?.activatorEl?.focus()
			}
		}
	}
	const handleActivatorKeydown = (e: KeyboardEvent) => {
		if (props.disabled) return

		const el = foxyOverlayRef.value?.contentEl
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
		console.log(foxyOverlayRef.value?.filterProps(props, ['activatorProps', 'id', 'class', 'style', 'role', 'modelValue', 'absolute', 'activator', 'target', 'openOnClick', 'openOnContextMenu']))

		return foxyOverlayRef.value?.filterProps(props, ['activatorProps', 'id', 'class', 'style', 'role', 'modelValue', 'absolute', 'activator', 'target', 'openOnClick', 'openOnContextMenu'])
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
			'foxy-menu',
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({openChildren, filterProps}, foxyOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.foxy-menu {

	}
</style>

<style>
	:root {

	}
</style>
