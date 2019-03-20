<template lang="html">

  <div class="simple-map">

    <google-map
      id="map"
      ref="Map"
      :zoom.sync="zoom"
      :center.sync="center">

      <google-map-heatmap :radius="heatmapOptions.radius" :data="data" />

      <div class="map-buttons" slot="visible">
        <input type="number" v-model="heatmapOptions.radius" placeholder="Radius">
        <md-button class="md-raised" @click="randomize">RANDOMIZE</md-button>
        <md-button class="md-raised" @click="clear">CLEAR</md-button>
      </div>

    </google-map>

  </div>

</template>

<script>
import Randomizer from '../mixins/Randomizer'

export default {
  name: 'HeatMap',
  mixins: [Randomizer],
  data () {
    const {center} = this.$root.defaultMapOptions
    return {
      center,
      zoom: 12,
      heatmapOptions: {
        radius: 20
      },
      data: this.generateRandomPoints(center, this.getRandomInt(1000, 5000), this.getRandomInt(100, 300))
    }
  },
  methods: {
    clear () {
      this.data = []
    },
    randomize () {
      this.data = this.generateRandomPoints(this.center, this.getRandomInt(1000, 5000), this.getRandomInt(100, 300))
    }
  }
}
</script>

<style lang="scss">
.map-buttons {
  border: 0px;
  margin: 10px;
  padding: 0px;
  position: absolute;
  cursor: pointer;
  user-select: none;
  border-radius: 2px;
  height: 40px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
  overflow: hidden;
  top: 0px;
  right: 60px;
  & > *:not(:last-child) {
    margin-right: 5px !important;
  }
  input {
    height: 100%;
    padding: 10px 5px;
    width: 100px;
  }
  .md-button {
    background-color: rgb(255, 255, 255);
    height: 100%;
    margin: 0;
  }
}
</style>
