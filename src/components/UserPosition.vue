<template lang="html">

  <div class="simple-map">

    <div class="position-details" v-if="userPosition.coordinates">
      <div>Your position: {{userPosition.coordinates.lat}} {{userPosition.coordinates.lng}}</div>
      <div>Accuracy: {{ userPosition.accuracy }}</div>
    </div>

    <google-map id="map" ref="Map">

      <google-map-userposition
        :accuracy.sync="userPosition.accuracy"
        :position.sync="userPosition.coordinates"
      ></google-map-userposition>

    </google-map>

  </div>

</template>

<script>
export default {
  data () {
    return {
      userPosition: {
        accuracy: 0,
        coordinates: null
      }
    }
  },
  methods: {}
}
</script>

<style lang="css">
.position-details {
  position: absolute;
  bottom: 20px;
  width: 300px;
  height: 200px;
  background-color: white;
  padding: 10px;
  left: 20px;
  z-index: 1000;
  border: thin solid black;
}
</style>
