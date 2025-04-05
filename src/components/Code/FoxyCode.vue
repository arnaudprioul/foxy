<template>
	<div
			:class="codeClasses"
			:style="codeStyles"
	>
		<div
				v-if="label || slots.label"
				class="foxy-code__header"
		>
			<div class="foxy-code__label">
				<slot
						name="label"
						v-bind="{label, copyStatus}"
				>
					<span>{{ label }}</span>
				</slot>
			</div>
		</div>
		<div class="foxy-code__code">
			<div v-if="copy || slots.actions" class="foxy-code__actions">
				<slot name="actions">
					<foxy-tooltip>
						<template #activator="props">
							<foxy-btn
									v-if="copy"
									:icon="copyIcon"
									class="foxy-code__action foxy-code__action--copy"
									v-bind="props"
									@click="handleCopyCode"
							/>
						</template>
						<template #default>
							{{ copyText }}
						</template>
					</foxy-tooltip>
				</slot>
			</div>

			<pre :class="`language-${lang}`">
				<code
						:class="`language-${lang}`"
						v-html="renderedCode"
				/>
			</pre>
		</div>
	</div>
</template>

<script lang="ts" setup>
	import { FoxyTooltip } from "@foxy/components"
	import {
		useBorder,
		useBothColor,
		useDensity,
		useDimension,
		useElevation,
		useMargin,
		usePadding,
		useProps,
		useRounded
	} from '@foxy/composables'

	import { COPY_STATUS, DENSITY } from '@foxy/enums'

	import { ICodeProps } from '@foxy/interfaces'
	import { TCopyStatus } from "@foxy/types"

	import { computed, onBeforeMount, ref, StyleValue, toRef, useSlots } from 'vue'

	const props = withDefaults(defineProps<ICodeProps>(), {
		density: DENSITY.DEFAULT,
		copySuccessText: 'Copied!',
		copyFailedText: 'Copy failed!',
		copyText: 'Copy Code'
	})

	const emits = defineEmits(['copy'])

	const {filterProps} = useProps<ICodeProps>(props)

	const {colorStyles} = useBothColor(toRef(props, 'bgColor'), toRef(props, 'color'))
	const {densityClasses} = useDensity(props)
	const {borderStyles, borderClasses} = useBorder(props)
	const {paddingClasses, paddingStyles} = usePadding(props)
	const {marginClasses, marginStyles} = useMargin(props)
	const {dimensionStyles} = useDimension(props)
	const {elevationClasses} = useElevation(props)
	const {roundedClasses, roundedStyles} = useRounded(props)
	const slots = useSlots()

	const copying = ref(false)
	const copyTextValue = ref('')
	const copyStatus = ref<TCopyStatus>(COPY_STATUS.COPY)
	const code = ref('')

	const convertedCode = computed({
		get: () => {
			return code.value
		},
		set: (value) => {
			code.value = value
		}
	})

	const parseCode = () => {
		// TODO - parse code
	}
	const handleCopyCode = () => {
		if (copying.value) {
			return
		}

		copying.value = true

		navigator.clipboard.writeText(convertedCode.value as string).then(() => {
					copyTextValue.value = props.copySuccessText
					copyStatus.value = COPY_STATUS.SUCCESS
					emits('copy', copyStatus.value)
				}, (err) => {
					copyTextValue.value = props.copyFailedText
					copyStatus.value = COPY_STATUS.FAILED
					emits('copy', copyStatus.value)

					console.error('Copy to clipboard failed: ', err)
				}
		);

		setTimeout(() => {
			copyTextValue.value = props.copyText
			copyStatus.value = COPY_STATUS.COPY
			emits('copy', copyStatus.value)
			copying.value = false
		}, 3000);
	}

	onBeforeMount(() => {
		copyTextValue.value = props.copyText
		parseCode()
	})

	// CLASS & STYLES

	const codeStyles = computed(() => {
		return [
			dimensionStyles.value,
			colorStyles.value,
			borderStyles.value,
			paddingStyles.value,
			marginStyles.value,
			roundedStyles.value,
			props.style
		] as StyleValue
	})
	const codeClasses = computed(() => {
		return [
			'foxy-code',
			densityClasses.value,
			borderClasses.value,
			paddingClasses.value,
			marginClasses.value,
			elevationClasses.value,
			roundedClasses.value,
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>

<style lang="scss" scoped>
	.foxy-code {
		$this: &;


	}

</style>

<style>
	:root {

	}
</style>
