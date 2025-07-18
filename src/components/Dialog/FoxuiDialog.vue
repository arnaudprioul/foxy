<template>
	<foxui-overlay
			ref="foxuiOverlayRef"
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
				<foxui-card
						ref="foxuiCardRef"
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

					<template #header-append>
						<slot name="header-append">
							<foxui-btn
									:icon="MDI_ICONS.CLOSE"
									:rounded="0"
									bg-color="transparent"
									@click="handleClose"
							/>
						</slot>
					</template>

					<template
							v-if="hasPrepend"
							#header-prepend
					>
						<slot name="header-prepend">
							<foxui-icon
									v-if="hasIcon"
									key="prepend-icon"
									:icon="icon as TIcon"
									:size="28"
							/>
						</slot>
					</template>

					<template
							v-if="slots['header-title']"
							#header-title
					>
						<slot name="header-title"/>
					</template>

					<template
							v-if="slots['header-subtitle']"
							#header-subtitle
					>
						<slot name="header-subtitle"/>
					</template>

					<template
							v-if="slots['header-content']"
							#header-content
					>
						<slot name="header-content"/>
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
				</foxui-card>
			</slot>
		</template>
	</foxui-overlay>
</template>

<script
		lang="ts"
		setup
>
	import { FoxuiBtn, FoxuiCard, FoxuiIcon, FoxuiOverlay, FoxuiTranslateScale } from '@foxui/components'
	import { useProps, useScopeId, useStatus, useVModel } from '@foxui/composables'
	import { IN_BROWSER } from '@foxui/consts'
	import { vIntersect } from '@foxui/directives'
	import { MDI_ICONS } from '@foxui/enums'
	import type { IDialogProps } from '@foxui/interfaces'
	import type { TFoxuiCard, TFoxuiOverlay, TIcon, TTransitionProps } from '@foxui/types'
	import { focusableChildren, forwardRefs } from '@foxui/utils'

	import { computed, mergeProps, nextTick, ref, StyleValue, useSlots, watch } from 'vue'

	const props = withDefaults(defineProps<IDialogProps>(), {
		retainFocus: true,
		origin: 'center center',
		scrollStrategy: 'block',
		transition: () => ({component: FoxuiTranslateScale}) as unknown as TTransitionProps,
		zIndex: 2400
	})

	const emits = defineEmits(['update:modelValue', 'isRead', 'click:outside'])

	const {filterProps} = useProps<IDialogProps>(props)

	const isActive = useVModel(props, 'modelValue')
	const {scopeId} = useScopeId()
	const slots = useSlots()
	const {icon, statusClasses} = useStatus(props)

	const foxuiOverlayRef = ref<TFoxuiOverlay>()
	const foxuiCardRef = ref<TFoxuiCard>()

	const handleFocusin = (e: FocusEvent) => {
		const before = e.relatedTarget as HTMLElement | null
		const after = e.target as HTMLElement | null

		if (
				before !== after &&
				foxuiOverlayRef.value?.contentEl &&
				// We're the topmost dialog
				foxuiOverlayRef.value?.globalTop &&
				// It isn't the document or the dialog body
				![document, foxuiOverlayRef.value.contentEl].includes(after!) &&
				// It isn't inside the dialog body
				!foxuiOverlayRef.value.contentEl.contains(after)
		) {
			const focusable = focusableChildren(foxuiOverlayRef.value.contentEl)

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
			foxuiOverlayRef.value!.contentEl?.focus({preventScroll: true})
		} else {
			foxuiOverlayRef.value!.activatorEl?.focus({preventScroll: true})
		}
	})

	const activatorProps = computed(() => {
		return mergeProps({
			'aria-haspopup': 'dialog',
			'aria-expanded': String(isActive.value)
		}, props.activatorProps)
	})
	const overlayProps = computed(() => {
		return foxuiOverlayRef.value?.filterProps(props, ['activatorProps', 'class', 'style', 'modelValue'])
	})
	const cardProps = computed(() => {
		return foxuiCardRef.value?.filterProps(props)
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
		return !!(slots['header-prepend'] || icon.value)
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
			'foxui-dialog',
			{
				'foxui-dialog--fullscreen': props.fullscreen,
				'foxui-dialog--scrollable': props.scrollable
			},
			statusClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose(forwardRefs({filterProps}, foxuiOverlayRef))
</script>

<style
		lang="scss"
		scoped
>
	.foxui-dialog {
		$this: &;

		align-items: center;
		justify-content: center;
		margin: auto;

		> :deep(.foxui-overlay__content) {
			max-height: calc(100% - 48px);
			width: calc(100% - 48px);
			max-width: calc(100% - 48px);
			margin: 24px;

			&,
			> form {
				> .foxui-card {
					display: flex;
					flex: 1 1 100%;
					flex-direction: column;
					max-height: 100%;
					max-width: 100%;
					overflow: hidden;

					.foxui-card__content {
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
			> :deep(.foxui-overlay__content) {
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
					> .foxui-card,
					> .foxui-sheet {
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
