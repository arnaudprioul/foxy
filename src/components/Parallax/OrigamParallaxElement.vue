<template>
	<component
			:is="tag"
			:class="parallaxElementClasses"
			:style="parallaxElementStyles"
	>
		<slot name="default"/>
	</component>
</template>

<script
		lang="ts"
		setup
>
	import { computed, inject, StyleValue } from 'vue'
	import { useParallaxTransform, useProps } from '../../composables'

	import { ORIGAM_PARALLAX_KEY } from '../../consts'

	import { AXIS, PARALLAX_ELEMENT_TYPE } from '../../enums'

	import type { IParallaxElementProps } from '../../interfaces'

	import { cyclicMovement, elementMovement } from '../../utils'

	const props = withDefaults(defineProps<IParallaxElementProps>(), {
		tag: 'div',
		type: PARALLAX_ELEMENT_TYPE.TRANSLATE,
		transformOrigin: 'center',
		originX: 50,
		originY: 50,
		strength: 10,
		cycle: 0,
		audioIndex: 50
	})

	const {filterProps} = useProps<IParallaxElementProps>(props)

	const parallax = inject(ORIGAM_PARALLAX_KEY)

	if (!parallax) throw new Error('[Origam] parallax-element needs to be placed inside parallax')

	const {transformStyles, strength} = useParallaxTransform(props)

	const transform = computed(() => {
		return transformCalculation()
	})
	const transitionDuration = computed(() => {
		return `${parallax.duration.value}ms`
	})
	const transitionTimingFunction = computed(() => {
		return parallax.easing.value
	})
	const transformParameters = computed(() => {
		return {
			transitionProperty: 'transform',
			transitionDuration: transitionDuration.value,
			transformOrigin: props.transformOrigin,
			transitionTimingFunction: transitionTimingFunction.value
		}
	})

	const calculateAudioMovement = () => {
		let movementX = 0
		let movementY = 0

		if (parallax.audioData.value) {
			movementX = parallax.audioData.value[props.audioIndex]
			movementY = parallax.audioData.value[props.audioIndex]
		}

		return {
			x: movementX,
			y: movementY
		}
	}
	const calculateMouseMovement = () => {
		if (!parallax.shape.value || (!parallax.isMoving.value)) return {
			x: 0,
			y: 0
		}

		let movementX = 0
		let movementY = 0

		const {x, y} = props.cycle < 1
				? elementMovement({
					x: parallax.movement.value.x,
					y: parallax.movement.value.y,
					target: parallax.movement.value?.target,
					originX: props.originX,
					originY: props.originY,
					strength: strength.value,
					event: parallax.event.value,
					minX: props.minX,
					minY: props.minY,
					maxX: props.maxX,
					maxY: props.maxY
				})
				: cyclicMovement({
					referencePosition: parallax.event.value === 'scroll' ? {x: 0, y: 0} : parallax.eventData.value,
					shape: parallax.shape.value,
					event: parallax.event.value,
					cycles: props.cycle,
					strength: strength.value
				})

		if (parallax.event.value !== 'scroll') {
			movementX = props.axis === AXIS.Y ? 0 : x
			movementY = props.axis === AXIS.X ? 0 : y
		} else if (parallax.event.value === 'scroll') {
			movementX = props.axis === AXIS.X ? y : 0
			movementY = props.axis === AXIS.Y || !props.axis ? y : 0
		} else if (props.cycle > 0) {
			movementX = props.axis === AXIS.X ? x : 0
			movementY = props.axis === AXIS.Y ? y : 0
		}

		return {
			x: movementX,
			y: movementY
		}
	}
	const transformCalculation = () => {
		let x = 0
		let y = 0

		if (parallax.audioData.value) {
			const audioMovement = calculateAudioMovement()

			x = audioMovement.x
			y = audioMovement.y
		} else {
			const mouseMovement = calculateMouseMovement()

			x = mouseMovement.x
			y = mouseMovement.y
		}

		return {
			transform: transformStyles(x, y)
		}
	}

	// CLASS & STYLES

	const parallaxElementStyles = computed(() => {
		return [
			props.style,
			{
				...transform.value,
				...transformParameters.value
			}
		] as StyleValue
	})
	const parallaxElementClasses = computed(() => {
		return [
			'origam-parallax-element',
			props.class
		]
	})

	// EXPOSE

	defineExpose({
		filterProps
	})
</script>
