<template>
	<component
			:is="tag"
			:class="cardTextClasses"
			:style="cardTextStyles"
	>
		<slot name="default">
			<span>{{ text }}</span>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { useProps } from "@foxui/composables"
	import type { ICardTextProps } from '@foxui/interfaces'

	import { computed, StyleValue } from 'vue'

	const props = withDefaults(defineProps<ICardTextProps>(), {tag: 'div'})

	const {filterProps} = useProps<ICardTextProps>(props)

	// CLASS & STYLES

	const cardTextStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const cardTextClasses = computed(() => {
		return [
			'foxui-card-text',
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
	.foxui-card-text {
		flex: var(--foxui-card-text---flex);
		font-size: var(--foxui-card-text---font-size);
		font-weight: var(--foxui-card-text---font-weight);
		letter-spacing: var(--foxui-card-text---letter-spacing);
		text-transform: var(--foxui-card-text---text-transform);

		padding-block-start: var(--foxui-card-text---padding-block-start);
		padding-block-end: var(--foxui-card-text---padding-block-end);
		padding-inline-start: var(--foxui-card-text---padding-inline-start);
		padding-inline-end: var(--foxui-card-text---padding-inline-end);

		margin-block-start: var(--foxui-card-text---margin-block-start);
		margin-block-end: var(--foxui-card-text---margin-block-end);
		margin-inline-start: var(--foxui-card-text---margin-inline-start);
		margin-inline-end: var(--foxui-card-text---margin-inline-end);

		border-color: var(--foxui-card-text---border-color);
		border-style: var(--foxui-card-text---border-style);
		border-width: var(--foxui-card-text---border-width);
		border-radius: var(--foxui-card-text---border-radius);
	}
</style>

<style>
	:root {
		--foxui-card-text---flex: 1 1 auto;
		--foxui-card-text---font-size: 0.875rem;
		--foxui-card-text---font-weight: 400;
		--foxui-card-text---letter-spacing: 0.0178571429em;
		--foxui-card-text---text-transform: none;

		--foxui-card-text---border-top-width: 0;
		--foxui-card-text---border-left-width: 0;
		--foxui-card-text---border-bottom-width: 0;
		--foxui-card-text---border-right-width: 0;
		--foxui-card-text---border-width: var(--foxui-card-text---border-top-width) var(--foxui-card-text---border-left-width) var(--foxui-card-text---border-bottom-width) var(--foxui-card-text---border-right-width);
		--foxui-card-text---border-color: rgba(0, 0, 0, 0.87);
		--foxui-card-text---border-style: solid;
		--foxui-card-text---border-start-start-radius: 0;
		--foxui-card-text---border-start-end-radius: 0;
		--foxui-card-text---border-end-start-radius: 0;
		--foxui-card-text---border-end-end-radius: 0;
		--foxui-card-text---border-radius: var(--foxui-card-text---border-start-start-radius) var(--foxui-card-text---border-start-end-radius) var(--foxui-card-text---border-end-start-radius) var(--foxui-card-text---border-end-end-radius);

		--foxui-card-text---padding-block-start: 1rem;
		--foxui-card-text---padding-block-end: 1rem;
		--foxui-card-text---padding-inline-start: 1rem;
		--foxui-card-text---padding-inline-end: 1rem;

		--foxui-card-text---margin-block-start: 0;
		--foxui-card-text---margin-block-end: 0;
		--foxui-card-text---margin-inline-start: 0;
		--foxui-card-text---margin-inline-end: 0;
	}
</style>
