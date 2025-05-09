<template>
	<div class="hst-classes">
		<label>{{ getTitle }}</label>
		<template v-for="(model, index) in models">
			<hst-text
					:model-value="model"
					title="Class"
					@change="handleFormat($event, index)"
			/>
		</template>
		<foxy-btn
				:icon="MDI_ICONS.PLUS"
				@click="handleAddField"
		/>
		<foxy-btn
				v-if="models.length > 1"
				:icon="MDI_ICONS.MINUS"
				@click="handleRemoveField"
		/>
	</div>
</template>

<script
		lang="ts"
		setup
>
	import { FoxyBtn } from "@foxy/components"
	import { useVModel } from "@foxy/composables"
	import { MDI_ICONS } from "@foxy/enums"
	import { toKebabCase, wrapInArray } from "@foxy/utils"

	import useTitle from '@stories/composables/title.composable'

	import type { TTitleProp } from '@stories/types/title.type'
	import { watch } from "vue"

	// TODO - WIP

	const props = defineProps<{
		modelValue?: string | Array<string>
	} & TTitleProp>()

	const emit = defineEmits(['update:modelValue'])

	const {getTitle} = useTitle(props.title, 'Classes')

	const models = useVModel(props, 'modelValue', [''], (v) => wrapInArray(v))

	const handleFormat = (item: string, index) => {
		const value = [...models.value]

		value[index] = toKebabCase(item)

		models.value = value
	}

	const handleAddField = () => {
		models.value = [...models.value, '']
	}

	const handleRemoveField = () => {
		const value = [...models.value]

		value.pop()
		models.value = value
	}

	watch(models, () => {
		emit('update:modelValue', models)
	})
</script>

<style
		lang="scss"
		scoped
>

</style>
