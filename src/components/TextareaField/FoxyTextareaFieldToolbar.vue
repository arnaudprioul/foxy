<template>
	<nav
			:class="textareaFieldToolbarClasses"
			:style="textareaFieldToolbarStyles"
	>
		<ul class="foxy-textarea-field-toolbar__modules">
			<template v-for="module in modules">
				<li :title="module.title" class="foxy-textarea-field-toolbar__module" :class="{highLight: module.moduleInspectResult, forbidden: module.forbidden}" @click="activeModule(module)">
<!--					TODO-->
				</li>
			</template>
		</ul>
	</nav>
</template>

<script setup lang="ts">

	import { useProps } from "@foxy/composables"

	import { ACTIONS } from "@foxy/consts"

	import { EDITOR_MODULES } from "@foxy/enums"

	import { ITextareaFieldToolbarProps } from "@foxy/interfaces"

	import { computed, StyleValue } from "vue"

	const props = withDefaults(defineProps<ITextareaFieldToolbarProps>(), {
		actions: [
			EDITOR_MODULES.BOLD
		]
	})

	const emits = defineEmits(['exec'])

	const {filterProps} = useProps<ITextareaFieldToolbarProps>(props)



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
