<template>
	<component
			:is="tag"
			:class="cardHeaderClasses"
			:style="cardHeaderStyles"
			v-bind="$attrs"
	>
    <span
		    key="underlay"
		    class="origam-card-header__underlay"
    />

		<slot name="wrapper">
			<div
					v-if="hasPrepend"
					key="prepend"
					class="origam-card-header__prepend"
					@click="handleClickPrepend"
			>
				<slot name="prepend">
					<origam-avatar
							v-if="prependAvatar"
							key="prepend-avatar"
							:density="density"
							:image="prependAvatar"
					/>
					<origam-icon
							v-if="prependIcon"
							key="prepend-icon"
							:density="density"
							:icon="prependIcon"
					/>
				</slot>
			</div>

			<div
					class="origam-card-header__content"
					data-no-activator=""
			>
				<div
						v-if="hasTitle"
						key="title"
						class="origam-card-header__title"
				>
					<slot
							name="title"
							v-bind="{ title }"
					>{{ title }}
					</slot>
				</div>

				<div
						v-if="hasSubtitle"
						key="subtitle"
						class="origam-card-header__subtitle"
				>
					<slot
							name="subtitle"
							v-bind="{ subtitle }"
					>{{ subtitle }}
					</slot>
				</div>

				<slot name="default"/>
			</div>

			<div
					v-if="hasAppend"
					key="append"
					class="origam-card-header__append"
					@click="handleClickAppend"
			>
				<slot name="append">
					<origam-avatar
							v-if="appendAvatar"
							key="append-avatar"
							:density="density"
							:image="appendAvatar"
					/>
					<origam-icon
							v-if="appendIcon"
							key="append-icon"
							:density="density"
							:icon="appendIcon"
					/>
				</slot>
			</div>
		</slot>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamAvatar, OrigamIcon } from '../../components'

	import { useAdjacent, useDensity, useProps } from '../../composables'

	import type { ICardHeaderProps } from '../../interfaces'

	import { computed, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICardHeaderProps>(), {tag: 'OrigamToolbar'})

	defineEmits(['click:prepend', 'click:append'])

	const {filterProps} = useProps<ICardHeaderProps>(props)

	const slots = useSlots()
	const {densityClasses} = useDensity(props)

	const {
		onClickPrepend: handleClickPrepend,
		onClickAppend: handleClickAppend,
		hasPrepend,
		hasAppend
	} = useAdjacent(props, toRef(props, 'prependIcon'), toRef(props, 'appendIcon'))

	const hasTitle = computed(() => {
		return slots.title || props.title != null
	})
	const hasSubtitle = computed(() => {
		return slots.subtitle || props.subtitle != null
	})

	// CLASS & STYLES

	const cardHeaderStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const cardHeaderClasses = computed(() => {
		return [
			'origam-card-header',
			densityClasses.value,
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
	.origam-card-header {
		$this: &;

		align-items: var(--origam-card-header---align-items);
		display: var(--origam-card-header---display);
		flex: var(--origam-card-header---flex);
		grid-template-areas: var(--origam-card-header---grid-template-areas);
		grid-template-columns: var(--origam-card-header---grid-template-columns);

		max-width: var(--origam-card-header---max-width);
		min-height: calc(var(--origam-card-header---min-height) + var(--origam-card-header---density));
		box-sizing: var(--origam-card-header---box-sizing);

		text-decoration: var(--origam-card-header---text-decoration);

		outline: var(--origam-card-header---outline);
		position: var(--origam-card-header---position);

		padding-block-start: calc(var(--origam-card-header---padding-block-start) + var(--origam-card-header---density));
		padding-block-end: calc(var(--origam-card-header---padding-block-end) + var(--origam-card-header---density));
		padding-inline-start: calc(var(--origam-card-header---padding-inline-start) + var(--origam-card-header---density));
		padding-inline-end: calc(var(--origam-card-header---padding-inline-end) + var(--origam-card-header---density));

		margin-block-start: var(--origam-card-header---margin-block-start);
		margin-block-end: var(--origam-card-header---margin-block-end);
		margin-inline-start: var(--origam-card-header---margin-inline-start);
		margin-inline-end: var(--origam-card-header---margin-inline-end);

		border-color: var(--origam-card-header---border-color);
		border-style: var(--origam-card-header---border-style);
		border-width: var(--origam-card-header---border-width);
		border-radius: var(--origam-card-header---border-radius);

		&--border {
			--origam-card-header---border-width: thin;
			--origam-card-header---box-shadow: none;
		}

		&--rounded {
			--origam-card-header---border-radius: 4px;
		}

		&--density-default {
			--origam-card-header---density: 0px;
		}

		&--density-compact {
			--origam-card-header---density: -8px;
		}

		&__underlay {
			position: var(--origam-card-header__underlay---position);
		}

		&__prepend,
		&__append {
			&,
			> .origam-badge {
				.origam-icon {
					opacity: var(--origam-card-header__icon---opacity);
				}
			}
		}

		&__prepend {
			align-items: var(--origam-card-header__prepend---align-items);
			align-self: var(--origam-card-header__prepend---align-self);
			display: var(--origam-card-header__prepend---display);
			grid-area: var(--origam-card-header__prepend---grid-area);
			min-width: var(--origam-card-header__prepend---min-width);
			min-height: var(--origam-card-header__prepend---min-height);
		}

		&__append {
			align-items: var(--origam-card-header__append---align-items);
			align-self: var(--origam-card-header__append---align-self);
			display: var(--origam-card-header__append---display);
			grid-area: var(--origam-card-header__append---grid-area);
			min-width: var(--origam-card-header__append---min-width);
			min-height: var(--origam-card-header__append---min-height);
		}

		&__content {
			align-self: var(--origam-card-header__content---align-self);
			grid-area: var(--origam-card-header__content---grid-area);
			overflow: var(--origam-card-header__content---overflow);
		}

		&__title {
			hyphens: var(--origam-card-header__title---hyphens);
			overflow-wrap: var(--origam-card-header__title---overflow-wrap);
			overflow: var(--origam-card-header__title---overflow);
			padding-block-start: var(--origam-card-header__title---padding-block-start);
			padding-block-end: var(--origam-card-header__title---padding-block-end);
			padding-inline-start: var(--origam-card-header__title---padding-inline-start);
			padding-inline-end: var(--origam-card-header__title---padding-inline-end);
			white-space: var(--origam-card-header__title---white-space);
			text-overflow: var(--origam-card-header__title---text-overflow);
			word-break: var(--origam-card-header__title---word-break);
			word-wrap: var(--origam-card-header__title---word-wrap);
			font-size: var(--origam-card-header__title---font-size);
			font-weight: var(--origam-card-header__title---font-weight);
			letter-spacing: var(--origam-card-header__title---letter-spacing);
			line-height: var(--origam-card-header__title---line-height);
			text-transform: var(--origam-card-header__title---text-transform);
		}

		&__subtitle {
			-webkit-box-orient: vertical;
			display: var(--origam-card-header__subtitle---display);
			opacity: var(--origam-card-header__subtitle---opacity);
			overflow: var(--origam-card-header__subtitle---overflow);
			padding-block-start: var(--origam-card-header__subtitle---padding-block-start);
			padding-block-end: var(--origam-card-header__subtitle---padding-block-end);
			padding-inline-start: var(--origam-card-header__subtitle---padding-inline-start);
			padding-inline-end: var(--origam-card-header__subtitle---padding-inline-end);
			text-overflow: var(--origam-card-header__subtitle---text-overflow);
			word-break: var(--origam-card-header__subtitle---word-break);
			font-size: var(--origam-card-header__subtitle---font-size);
			font-weight: var(--origam-card-header__subtitle---font-weight);
			letter-spacing: var(--origam-card-header__subtitle---letter-spacing);
			line-height: var(--origam-card-header__subtitle---line-height);
			text-transform: var(--origam-card-header__subtitle---text-transform);
		}
	}
</style>

<style>
	:root {
		--origam-card-header---align-items: center;
		--origam-card-header---display: grid;
		--origam-card-header---flex: none;
		--origam-card-header---grid-template-areas: "prepend content append";
		--origam-card-header---grid-template-columns: max-content 1fr auto;

		--origam-card-header---max-width: 100%;
		--origam-card-header---min-height: 40px;
		--origam-card-header---box-sizing: border-box;

		--origam-card-header---text-decoration: none;

		--origam-card-header---border-top-width: 0;
		--origam-card-header---border-left-width: 0;
		--origam-card-header---border-bottom-width: 0;
		--origam-card-header---border-right-width: 0;
		--origam-card-header---border-width: var(--origam-card-header---border-top-width) var(--origam-card-header---border-left-width) var(--origam-card-header---border-bottom-width) var(--origam-card-header---border-right-width);
		--origam-card-header---border-color: rgba(0, 0, 0, 0.87);
		--origam-card-header---border-style: solid;
		--origam-card-header---border-start-start-radius: 0;
		--origam-card-header---border-start-end-radius: 0;
		--origam-card-header---border-end-start-radius: 0;
		--origam-card-header---border-end-end-radius: 0;
		--origam-card-header---border-radius: var(--origam-card-header---border-start-start-radius) var(--origam-card-header---border-start-end-radius) var(--origam-card-header---border-end-start-radius) var(--origam-card-header---border-end-end-radius);

		--origam-card-header---padding-block-start: 8px;
		--origam-card-header---padding-block-end: 8px;
		--origam-card-header---padding-inline-start: 16px;
		--origam-card-header---padding-inline-end: 16px;

		--origam-card-header---margin-block-start: 0;
		--origam-card-header---margin-block-end: 0;
		--origam-card-header---margin-inline-start: 0;
		--origam-card-header---margin-inline-end: 0;

		--origam-card-header---position: relative;
		--origam-card-header---outline: none;

		--origam-card-header__underlay---position: absolute;

		--origam-card-header__icon---opacity: 0.87;

		--origam-card-header__prepend---align-items: center;
		--origam-card-header__prepend---align-self: center;
		--origam-card-header__prepend---display: flex;
		--origam-card-header__prepend---grid-area: prepend;
		--origam-card-header__prepend---min-width: 24px;
		--origam-card-header__prepend---min-height: 24px;

		--origam-card-header__append---align-items: center;
		--origam-card-header__append---align-self: center;
		--origam-card-header__append---display: flex;
		--origam-card-header__append---grid-area: append;
		--origam-card-header__append---min-width: 24px;
		--origam-card-header__append---min-height: 24px;

		--origam-card-header__content---align-self: center;
		--origam-card-header__content---grid-area: content;
		--origam-card-header__content---overflow: hidden;

		--origam-card-header__title---hyphens: auto;
		--origam-card-header__title---overflow-wrap: normal;
		--origam-card-header__title---overflow: hidden;

		--origam-card-header__title---padding-block-start: 0;
		--origam-card-header__title---padding-block-end: 0;
		--origam-card-header__title---padding-inline-start: 0;
		--origam-card-header__title---padding-inline-end: 0;

		--origam-card-header__title---white-space: nowrap;
		--origam-card-header__title---text-overflow: ellipsis;
		--origam-card-header__title---word-break: normal;
		--origam-card-header__title---word-wrap: break-word;
		--origam-card-header__title---font-size: 1rem;
		--origam-card-header__title---font-weight: 400;
		--origam-card-header__title---letter-spacing: 0.009375em;
		--origam-card-header__title---line-height: 1.5rem;
		--origam-card-header__title---text-transform: none;

		--origam-card-header__subtitle---display: -webkit-box;
		--origam-card-header__subtitle---opacity: 0.6;
		--origam-card-header__subtitle---overflow: hidden;

		--origam-card-header__subtitle---padding-block-start: 0;
		--origam-card-header__subtitle---padding-block-end: 0;
		--origam-card-header__subtitle---padding-inline-start: 0;
		--origam-card-header__subtitle---padding-inline-end: 0;

		--origam-card-header__subtitle---text-overflow: ellipsis;
		--origam-card-header__subtitle---word-break: break-all;
		--origam-card-header__subtitle---font-size: 0.875rem;
		--origam-card-header__subtitle---font-weight: 400;
		--origam-card-header__subtitle---letter-spacing: 0.0178571429em;
		--origam-card-header__subtitle---line-height: 1rem;
		--origam-card-header__subtitle---text-transform: none;
	}
</style>
