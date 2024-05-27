<template>
  <Story
      group="components"
      title="Grids/Columns"
  >
    <Variant title="Default">
      <template #default>
        <foxy-container>
          <foxy-row>
            <foxy-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                One of three columns
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
    </Variant>
    <Variant title="Align">
      <template #default>
        <foxy-container>
          <foxy-row align="start" style="height: 150px;">
            <foxy-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align start
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row align="center" style="height: 150px;">
            <foxy-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align center
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row align="end" style="height: 150px;">
            <foxy-col v-for="n in 3"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align end
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row align="baseline" style="height: 150px;">
            <foxy-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align baseline
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row style="height: 150px;">
            <foxy-col
                v-for="n in 3"
                :key="n"
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align stretch
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row style="height: 150px;">
            <foxy-col align="start" cols="12" sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align self start
              </foxy-sheet>
            </foxy-col>
            <foxy-col align="center" cols="12" sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align self center
              </foxy-sheet>
            </foxy-col>
            <foxy-col align="end" cols="12" sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Align self end
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
    </Variant>
    <Variant title="Justify">
      <template #default>
        <foxy-container>
          <foxy-row style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify start (default)
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row justify="center" style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify center
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row justify="end" style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify end
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row justify="space-around" style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify space around
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row justify="space-between" style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify space between
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
          <foxy-row justify="space-evenly" style="height: 150px;">
            <foxy-col v-for="n in 2"
                      :key="n"
                      cols="12"
                      sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                Justify space between
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
    </Variant>
    <Variant title="Spacer">
      <template #default>
        <foxy-container>
          <foxy-row>
            <foxy-col
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                One of two columns
              </foxy-sheet>
            </foxy-col>

            <foxy-spacer/>

            <foxy-col
                cols="12"
                sm="4">
              <foxy-sheet bg-color="#7d6fa1" color="#fff">
                One of two columns
              </foxy-sheet>
            </foxy-col>
          </foxy-row>
        </foxy-container>
      </template>
    </Variant>
  </Story>
</template>

<script setup>
  import { FoxyCol, FoxyContainer, FoxyRow, FoxySpacer, FoxySheet } from '@foxy/components'
</script>

<docs lang="md">
Grid documentation
</docs>
