<template>
	<div
			:class="textareaFieldEditorClasses"
			:style="textareaFieldEditorStyles"
	>
		<foxy-textarea-field-toolbar
			ref="foxyTextareaFieldToolbarRef"
			:z-index="zIndex + 1"
			v-bind="textareaFieldToolbarProps"
		/>

		<p class='content' :is="constantConfig.ROW_TAG" :spellcheck="spellcheck" ref="content" id="editor-content" :style="contentStyle" data-editor="content"
		   contenteditable="plaintext-only" v-drag-pic="handleDragPic">
		</p>
	</div>
</template>

<script setup lang="ts">

	import { FoxyTextareaFieldToolbar } from "@foxy/components"

	import { useProps, useVModel } from "@foxy/composables"

	import { ITextareaFieldEditorProps } from "@foxy/interfaces"

	import { TFoxyTextareaFieldToolbar } from "@foxy/types"

	import { computed, ref, StyleValue } from "vue"

	const props = withDefaults(defineProps<ITextareaFieldEditorProps>(), {

	})

	const {filterProps} = useProps<ITextareaFieldEditorProps>(props)

	const fullscreen = useVModel(props, 'fullscreen', false)

	const foxyTextareaFieldToolbarRef = ref<TFoxyTextareaFieldToolbar>()

	const textareaFieldToolbarProps = computed(() => {
		return foxyTextareaFieldToolbarRef.value?.filterProps(props, ['class', 'style', 'id', 'zIndex'])
	})

	// CLASSES & STYLES

	const textareaFieldEditorStyles = computed(() => {
		return [
			{
				'z-index': props.zIndex
			},
			props.style
		] as StyleValue
	})
	const textareaFieldEditorClasses = computed(() => {
		return [
			'foxy-textarea-field-editor',
			{
				'foxy-textarea-field-editor--fullscreen': fullscreen.value
			},
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
