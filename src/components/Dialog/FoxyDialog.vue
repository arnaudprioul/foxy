<template>
	<foxy-overlay
			ref="foxyOverlayRef"
			v-model="isActive"
			:activator-props="activatorProps"
			:class="dialogClasses"
			:style="dialogStyles"
			aria-modal="true"
			role="dialog"
			v-bind="{...overlayProps, ...scopeId}"
	>
		<template
				v-if="slots.activator"
				#activator="{props}"
		>
			<slot
					name="activator"
					v-bind="{props}"
			/>
		</template>

		<template #default="{isActive}">
			<slot
					name="default"
					v-bind="{isActive}"
			>
				<foxy-card
						ref="foxyCardRef"
						v-bind="cardProps"
				>
					<template
							v-if="slots.loader"
							#loader
					>
						<slot name="loader"/>
					</template>

					<template
							v-if="slots.header"
							#header
					>
						<slot name="header"/>
					</template>

					<template #header:append>
						<slot name="header:append">
							<foxy-btn
									:icon="MDI_ICONS.CLOSE"
									:rounded="0"
									bg-color="transparent"
									@click="handleClose"
							/>
						</slot>
					</template>

					<template
							v-if="hasPrepend"
							#header:prepend
					>
						<slot name="header:prepend">
							<foxy-icon
									v-if="hasIcon"
									key="prepend-icon"
									:icon="icon as TIcon"
									:size="28"
							/>
						</slot>
					</template>

					<template
							v-if="slots['header:title']"
							#header:title
					>
						<slot name="header:title"/>
					</template>

					<template
							v-if="slots['header:subtitle']"
							#header:subtitle
					>
						<slot name="header:subtitle"/>
					</template>

					<template
							v-if="slots['header:content']"
							#header:content
					>
						<slot name="header:content"/>
					</template>

					<template
							v-if="slots.asset"
							#asset
					>
						<slot name="asset"/>
					</template>

					<template
							v-if="slots.text"
							#text
					>
						<slot name="text"/>
					</template>

					<template #default>
						<slot name="content"/>
						<div
								ref="endText"
								v-intersect="handleIntersect"
						></div>
					</template>

					<template
							v-if="slots.footer"
							#footer
					>
						<slot name="footer"/>
					</template>
				</foxy-card>
			</slot>
		</template>
	</foxy-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBtn, FoxyCard, FoxyIcon, FoxyOverlay, FoxyTranslateScale } from '@foxy/components'
	import { useProps, useScopeId, useStatus, useVModel } from '@foxy/composables'
	import { IN_BROWSER } from '@foxy/consts'
	import { vIntersect } from '@foxy/directives'
	import { MDI_ICONS } from '@foxy/enums'
	import { IDialogProps } from '@foxy/interfaces'
	import { TFoxyCard, TFoxyOverlay, TIcon, TTransitionProps } from '@foxy/types'
	import { focusableChildren, forwardRefs } from '@foxy/utils'

	import { computed, mergeProps, nextTick, ref, StyleValue, useSlots, watch } from 'vue'

	const props = withDefaults(defineProps<IDialogProps>(), {
		retainFocus: true,
		origin: 'center center',
		scrollStrategy: 'block',
		transition: () => ({component: FoxyTranslateScale}) as unknown as TTransitionProps,
		zIndex: 2400
	})

	const emits = defineEmits(['update:modelValue', 'isRead', 'click:outside'])

	const {filterProps} = useProps<IDialogProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()
	const slots = useSlots()
	const {icon, statusClasses} = useStatus(props)

	const foxyOverlayRef = ref<TFoxyOverlay>()
	const foxyCardRef = ref<TFoxyCard>()

	const handleFocusin = (e: FocusEvent) => {
		const before = e.relatedTarget as HTMLElement | null
		const after = e.target as HTMLElement | null

		if (
				before !== after &&
				foxyOverlayRef.value?.contentEl &&
				// We're the topmost dialog
				foxyOverlayRef.value?.globalTop &&
				// It isn't the document or the dialog body
				![document, foxyOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the dialog body
				!foxyOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(foxyOverlayRef.value.contentEl)

			if (!focusable.length) return

			const firstElement = focusable[0]
			const lastElement = focusable[focusable.length - 1]

			if (before === firstElement) {
				lastElement.focus()
			} else {
				firstElement.focus()
			}
		}
	}

	if (IN_BROWSER) {
		watch(() => isActive.value && props.retainFocus, (val) => {
			if (val) {
				document.addEventListener('focusin', handleFocusin)
			} else {
				document.removeEventListener('focusin', handleFocusin)
			}
		}, {immediate: true})
	}

	watch(isActive, async (val) => {
		await nextTick()
		if (val) {
			foxyOverlayRef.value!.contentEl?.focus({preventScroll: true})
		} else {
			foxyOverlayRef.value!.activatorEl?.focus({preventScroll: true})
		}
	})

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-haspopup': 'dialog',
			'aria-expanded': String(isActive.value)
		}, props.activatorProps)
	})
	const overlayProps = computed(() => {
		return foxyOverlayRef.value?.filterProps(props, ['activatorProps', 'class', 'style', 'modelValue'])
	})
	const cardProps = computed(() => {
		return foxyCardRef.value?.filterProps(props)
	})

	const handleClose = () => {
		isActive.value = false
	}
	const handleIntersect = (_isIntersecting: boolean, entries: Array<IntersectionObserverEntry>) => {
		if (entries[entries.length - 1].isIntersecting) {
			emits('isRead', true)
		}
	}

	const hasPrepend = computed(() => {
		return !!(slots['header:prepend'] || icon.value)
	})
	const hasIcon = computed(() => {
		return !!(props.icon || props.status)
	})

	// CLASSES & STYLES

	const dialogStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const dialogClasses = computed(() => {
		return [
			'foxy-dialog',
			{
				'foxy-dialog--fullscreen': props.fullscreen,
				'foxy-dialog--scrollable': props.scrollable
			},
			statusClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxyOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.foxy-dialog {
		$this: &;

		align-items: center;
		justify-content: center;
		margin: auto;

		> :deep(.foxy-overlay__content) {
			max-height: calc(100% - 48px);
			width: calc(100% - 48px);
			max-width: calc(100% - 48px);
			margin: 24px;

			&,
			> form {
				> .foxy-card {
					display: flex;
					flex: 1 1 100%;
					flex-direction: column;
					max-height: 100%;
					max-width: 100%;
					overflow: hidden;

					.foxy-card__content {
						display: flex;
						flex: 1 1 100%;
						flex-direction: column;
						max-height: 100%;
						max-width: 100%;
						overflow: auto;
					}
				}
			}
		}

		&--fullscreen {
			> :deep(.foxy-overlay__content) {
				border-radius: 0;
				margin: 0;
				padding: 0;
				width: 100%;
				height: 100%;
				max-width: 100%;
				max-height: 100%;
				overflow-y: auto;
				top: 0;
				left: 0;

				&,
				> form {
					> .foxy-card,
					> .foxy-sheet {
						min-height: 100%;
						min-width: 100%;
						border-radius: 0;
					}
				}
			}
		}
	}
</style>

<style>

</style>
