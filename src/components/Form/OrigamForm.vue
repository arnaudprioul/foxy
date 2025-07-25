<template>
	<form
			ref="formRef"
			:class="formClasses"
			:style="formStyles"
			novalidate
			@reset="handleReset"
			@submit="handleSubmit"
	>
		<slot
				name="default"
				v-bind="form"
		/>
	</form>
</template>

<script
		lang="ts"
		setup
>
	import { computed, ref, StyleValue } from 'vue'
	import { useForm, useProps } from '../../composables'

	import type { IFormProps, ISubmitEventPromise } from '../../interfaces'
	import { forwardRefs } from '../../utils'

	const props = withDefaults(defineProps<IFormProps>(), {})

	const emits = defineEmits(['submit'])

	const {filterProps} = useProps<IFormProps>(props)

	const form = useForm(props)
	const formRef = ref<HTMLFormElement>()

	const handleReset = (e: Event) => {
		e.preventDefault()
		form.reset()
	}

	const handleSubmit = (_e: Event) => {
		const e = _e as ISubmitEventPromise

		const ready = form.validate()
		e.then = ready.then.bind(ready)
		e.catch = ready.catch.bind(ready)
		e.finally = ready.finally.bind(ready)

		emits('submit', e)

		if (!e.defaultPrevented) {
			ready.then(({valid}) => {
				if (valid) {
					formRef.value?.submit()
				}
			})
		}

		e.preventDefault()
	}

	// CLASSES & STYLES

	const formStyles = computed(() => {
		return [
			props.style
		] as StyleValue
	})
	const formClasses = computed(() => {
		return [
			'origam-form',
			props.class
		]
	})

	defineExpose(forwardRefs({filterProps, ...form}, formRef))
</script>
