<template>
  <Story
      group="components"
      title="Images & Icons/Img">
    <Variant :init-state="initState" title="default">
      <template #default="{ state }">
        <foxy-img v-bind="state.props"/>
      </template>
    </Variant>

    <Variant title="cover">
      <template #default>
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            :width="300"
            aspect-ratio="1"
            :cover="true"
        />
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            :width="300"
            aspect-ratio="1"
            :cover="false"
        />
      </template>
    </Variant>

    <Variant title="height">
      <template #default>
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            height="125"
            cover
        />
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            height="125"
        />
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            max-height="125"
            cover
        />
        <foxy-img
            src="https://picsum.photos/350/165?random"
            alt="image example"
            max-height="125"
        />
      </template>
    </Variant>

    <Variant title="Slots / Placeholder">
      <template #default>
        <foxy-img
            height="300"
            lazy-src="https://picsum.photos/id/11/100/60"
            max-width="500"
            src="https://bad.src/not/valid"
        >
          <template #placeholder>
              <foxy-progress indeterminate type="circular" color="#7d6fa1" bg-color="#fff" />
          </template>
        </foxy-img>
      </template>
    </Variant>
  </Story>
</template>

<script lang="ts" setup>
  import { FoxyImg, FoxyProgress } from '@foxy/components'

  function initState () {
    return {
      props: {
        src: new URL('/stories/assets/img/example.jpeg', import.meta.url).href,
        alt: 'image example',
        width: 300,
        aspectRatio: '16/9',
        cover: true
      }
    }
  }
</script>
<docs lang="md">
Img Documentation
</docs>
