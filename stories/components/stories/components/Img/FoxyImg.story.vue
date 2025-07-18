<template>
	<Story
			group="components"
			title="Img"
	>
		<Variant title="default">
			<template #default="{ state }">
				<origam-img v-bind="state.props"/>
			</template>
		</Variant>

		<Variant title="cover">
			<template #default>
				<origam-img
						:cover="true"
						:width="300"
						alt="image example"
						aspect-ratio="1"
						src="https://picsum.photos/350/165?random"
				/>
				<origam-img
						:cover="false"
						:width="300"
						alt="image example"
						aspect-ratio="1"
						src="https://picsum.photos/350/165?random"
				/>
			</template>
		</Variant>

		<Variant title="height">
			<template #default>
				<origam-img
						alt="image example"
						cover
						height="125"
						src="https://picsum.photos/350/165?random"
				/>
				<origam-img
						alt="image example"
						height="125"
						src="https://picsum.photos/350/165?random"
				/>
				<origam-img
						alt="image example"
						cover
						max-height="125"
						src="https://picsum.photos/350/165?random"
				/>
				<origam-img
						alt="image example"
						max-height="125"
						src="https://picsum.photos/350/165?random"
				/>
			</template>
		</Variant>

		<Variant title="Slots / Placeholder">
			<template #default>
				<origam-img
						height="300"
						lazy-src="https://picsum.photos/id/11/100/60"
						max-width="500"
						src="https://bad.src/not/valid"
				>
					<template #placeholder>
						<origam-progress
								bg-color="#fff"
								color="#7d6fa1"
								indeterminate
								type="circular"
						/>
					</template>
				</origam-img>
			</template>
		</Variant>
	</Story>
</template>

<script
		lang="ts"
		setup
>
	import { OrigamImg, OrigamProgress } from '@origam/components'
	import type { IImgProps } from "@origam/interfaces"

	import { reactive } from 'vue'

	const state: Partial<IImgProps> = reactive({
		src: new URL('/stories/assets/img/example.jpeg', import.meta.url).href,
		alt: 'image example',
		width: 300,
		aspectRatio: '16/9',
		cover: true
	})
</script>
<docs lang="md">
Img Documentation
</docs>
