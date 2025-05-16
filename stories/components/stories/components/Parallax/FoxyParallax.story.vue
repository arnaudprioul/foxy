<template>
  <Story
      auto-props-disabled
      group="components"
      title="Parallax"
  >
    <Variant title="Default">
      <template #default>
        <div style="height: 1500px;">
          <foxy-container fullscreen>
            <foxy-row
                :align="ALIGN.CENTER"
                :justify="JUSTIFY.CENTER"
            >
              <foxy-col cols>
                <foxy-parallax v-bind="state">
                  <foxy-container fullscreen>
                    <foxy-row
                        :align="ALIGN.CENTER"
                        :justify="JUSTIFY.CENTER"
                    >
                      <foxy-col cols="auto">
                        <foxy-title tag="h2">Parallax</foxy-title>
                      </foxy-col>
                    </foxy-row>
                  </foxy-container>
                  <foxy-parallax-element
                      :strength="-20"
                      :type="stateElement.type"
                      class="circle circle-blue"
                  />
                  <foxy-parallax-element
                      :strength="10"
                      :type="stateElement.type"
                      class="circle circle-purple"
                  />
                  <foxy-parallax-element
                      :strength="25"
                      :type="stateElement.type"
                      class="circle circle-yellow"
                  />
                  <foxy-parallax-element
                      :strength="30"
                      :type="stateElement.type"
                      class="circle circle-green"
                  />
                  <foxy-parallax-element
                      :strength="15"
                      :type="stateElement.type"
                      class="circle circle-orange"
                  />
                  <foxy-parallax-element
                      :strength="-15"
                      :type="stateElement.type"
                      class="circle circle-red"
                  />
                </foxy-parallax>
              </foxy-col>
            </foxy-row>
          </foxy-container>
        </div>
      </template>
      <template #controls>
        <hst-slider
            v-model="state.duration"
            :max="2000"
            :min="500"
            title="Animation Duration"
        />

        <hst-text
            v-model="state.easing"
            title="Easing"
        />

        <hst-select
            v-model="state.event"
            :options="[
                {value: PARALLAX_EVENT.MOVE, label: 'Move'},
                {value: PARALLAX_EVENT.SCROLL, label: 'Scroll'},
                {value: PARALLAX_EVENT.ORIENTATION, label: 'Orientation'}
                ]"
            title="Event"
        />

        <hst-select
            v-model="stateElement.type"
            :options="[
                {value: PARALLAX_ELEMENT_TYPE.TRANSLATE, label: 'Translation'},
                {value: PARALLAX_ELEMENT_TYPE.DEPTH, label: 'Depth'},
                {value: PARALLAX_ELEMENT_TYPE.DEPTH_INV, label: 'Depth inv'},
                {value: PARALLAX_ELEMENT_TYPE.SCALE, label: 'Scale'},
                {value: PARALLAX_ELEMENT_TYPE.SCALE_X, label: 'Scale x'},
                {value: PARALLAX_ELEMENT_TYPE.SCALE_Y, label: 'Scale y'},
                {value: PARALLAX_ELEMENT_TYPE.ROTATE, label: 'Rotation'}
                ]"
            title="Type"
        />
      </template>
    </Variant>
  </Story>
</template>

<script
    lang="ts"
    setup
>
	import { FoxyCol, FoxyContainer, FoxyParallax, FoxyParallaxElement, FoxyRow, FoxyTitle } from '@foxy/components'

	import { ALIGN, JUSTIFY, PARALLAX_ELEMENT_TYPE, PARALLAX_EVENT } from '@foxy/enums'

	import { reactive } from 'vue'

	const state = reactive({
    duration: 1000,
    easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
    height: '80vh',
    event: PARALLAX_EVENT.SCROLL
  })

  const stateElement = reactive({
    type: PARALLAX_ELEMENT_TYPE.TRANSLATE
  })
</script>

<style
    lang="scss"
    scoped
>
.circle {
  border-radius: 100%;
  position: absolute;

  &.circle-blue {
    background-color: #eaf1fa;
    width: 32vw;
    height: 32vw;
    top: 5%;
    right: -16vw
  }

  &.circle-purple {
    border: 25px solid #f2eafa;
    width: 16vw;
    height: 16vw;
    left: 50%
  }

  &.circle-yellow {
    background-color: #faf9ea;
    width: 8vw;
    height: 8vw;
    left: 30%;
    top: 25%
  }

  &.circle-green {
    background-color: #eafaf2;
    width: 10vw;
    height: 10vw;
    right: 20%;
    top: 90%
  }

  &.circle-orange {
    border: 25px solid #faf3ea;
    width: 8vw;
    height: 8vw;
    left: 20%;
    top: 60%
  }

  &.circle-red {
    background-color: #faeaea;
    width: 12vw;
    height: 12vw;
    left: -4.8vw;
    top: 25%
  }
}

.foxy-title {
  z-index: 99;
  position: relative;
}
</style>

<docs lang="md">

</docs>
