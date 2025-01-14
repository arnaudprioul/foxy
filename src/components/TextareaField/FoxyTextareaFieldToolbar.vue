<template>
	<div
			:class="textareaFieldToolbarClasses"
			:style="textareaFieldToolbarStyles"
	>
		<foxy-row no-gutters>
			<template v-for="(action, index) in actions">
				<foxy-col cols="auto">
					<template v-if="action.childrens">

					</template>
					<template v-else>
						<foxy-btn v-bind="action"/>
					</template>
				</foxy-col>
			</template>
		</foxy-row>
	</div>
</template>

<script setup lang="ts">

	import { FoxyBtn, FoxyCol, FoxyRow } from "@foxy/components"
	import { useProps } from "@foxy/composables"

	import { DEFAULT_ACTIONS } from "@foxy/consts"

	import { EDITOR_ACTIONS } from "@foxy/enums"

	import { ITextareaFieldToolbarProps } from "@foxy/interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<ITextareaFieldToolbarProps>(), {
		actions: [
				EDITOR_ACTIONS.BOLD
		]
	})

	const {filterProps} = useProps<ITextareaFieldToolbarProps>(props)

	const actions = computed(() => {
		return props.actions.map((action) => {
			return DEFAULT_ACTIONS[action as keyof typeof DEFAULT_ACTIONS]
		})
	})


	// content.onkeydown = event => {
	// 	if (event.key === 'Enter' && queryCommandValue(formatBlock) === 'blockquote') {
	// 		setTimeout(() => exec(formatBlock, `<${defaultParagraphSeparator}>`), 0)
	// 	}
	// }
	// appendChild(settings.element, content)

	// actions.forEach(action => {
	// 	const button = createElement('button')
	// 	button.className = classes.button
	// 	button.innerHTML = action.icon
	// 	button.title = action.title
	// 	button.setAttribute('type', 'button')
	// 	button.onclick = () => action.result() && content.focus()
	//
	// 	if (action.state) {
	// 		const handler = () => button.classList[action.state() ? 'add' : 'remove'](classes.selected)
	// 		addEventListener(content, 'keyup', handler)
	// 		addEventListener(content, 'mouseup', handler)
	// 		addEventListener(button, 'click', handler)
	// 	}
	//
	// 	appendChild(actionbar, button)
	// })
	//
	// if (settings.styleWithCSS) exec('styleWithCSS')
	// exec(defaultParagraphSeparatorString, defaultParagraphSeparator)

	// CLASSES & STYLES

	const textareaFieldToolbarStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const textareaFieldToolbarClasses = computed(() => {
		return [
			'foxy-textarea-field-toolbar',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style scoped lang="scss">

</style>
