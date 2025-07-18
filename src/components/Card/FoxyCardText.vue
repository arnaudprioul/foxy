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
	import { useProps } from "@foxy/composables"
	import type { ICardTextProps } from '@foxy/interfaces'

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
			'foxy-card-text',
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
	.foxy-card-text {
		flex: var(--foxy-card-text---flex);
		font-size: var(--foxy-card-text---font-size);
		font-weight: var(--foxy-card-text---font-weight);
		letter-spacing: var(--foxy-card-text---letter-spacing);
		text-transform: var(--foxy-card-text---text-transform);

		padding-block-start: var(--foxy-card-text---padding-block-start);
		padding-block-end: var(--foxy-card-text---padding-block-end);
		padding-inline-start: var(--foxy-card-text---padding-inline-start);
		padding-inline-end: var(--foxy-card-text---padding-inline-end);

		margin-block-start: var(--foxy-card-text---margin-block-start);
		margin-block-end: var(--foxy-card-text---margin-block-end);
		margin-inline-start: var(--foxy-card-text---margin-inline-start);
		margin-inline-end: var(--foxy-card-text---margin-inline-end);

		border-color: var(--foxy-card-text---border-color);
		border-style: var(--foxy-card-text---border-style);
		border-width: var(--foxy-card-text---border-width);
		border-radius: var(--foxy-card-text---border-radius);
	}
</style>

<style>
	:root {
		--foxy-card-text---flex: 1 1 auto;
		--foxy-card-text---font-size: 0.875rem;
		--foxy-card-text---font-weight: 400;
		--foxy-card-text---letter-spacing: 0.0178571429em;
		--foxy-card-text---text-transform: none;

		--foxy-card-text---border-top-width: 0;
		--foxy-card-text---border-left-width: 0;
		--foxy-card-text---border-bottom-width: 0;
		--foxy-card-text---border-right-width: 0;
		--foxy-card-text---border-width: var(--foxy-card-text---border-top-width) var(--foxy-card-text---border-left-width) var(--foxy-card-text---border-bottom-width) var(--foxy-card-text---border-right-width);
		--foxy-card-text---border-color: rgba(0, 0, 0, 0.87);
		--foxy-card-text---border-style: solid;
		--foxy-card-text---border-start-start-radius: 0;
		--foxy-card-text---border-start-end-radius: 0;
		--foxy-card-text---border-end-start-radius: 0;
		--foxy-card-text---border-end-end-radius: 0;
		--foxy-card-text---border-radius: var(--foxy-card-text---border-start-start-radius) var(--foxy-card-text---border-start-end-radius) var(--foxy-card-text---border-end-start-radius) var(--foxy-card-text---border-end-end-radius);

		--foxy-card-text---padding-block-start: 1rem;
		--foxy-card-text---padding-block-end: 1rem;
		--foxy-card-text---padding-inline-start: 1rem;
		--foxy-card-text---padding-inline-end: 1rem;

		--foxy-card-text---margin-block-start: 0;
		--foxy-card-text---margin-block-end: 0;
		--foxy-card-text---margin-inline-start: 0;
		--foxy-card-text---margin-inline-end: 0;
	}
</style>
