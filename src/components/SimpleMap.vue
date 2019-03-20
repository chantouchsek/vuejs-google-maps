<template lang="html">

  <div class="simple-map">

    <google-map id="map" ref="Map">

      <google-map-marker
        v-for="(marker, index) in markersList"
        :key="index"
        :title="marker.title"
        :position="marker.position"
        @click="panToMarker(marker.position)"
        @rightclick="setPanorama(marker.position)" />

    </google-map>

  </div>

</template>

<script>
import cities from '../assets/cities.json'

export default {
  data () {
    return {
      infoWIndowContext: {},
      markersList: cities
    }
  },
  methods: {
    panToMarker (pos) {
      this.$refs.Map.panTo(pos)
    },
    setPanorama (pos) {
      this.$refs.Map.setStreetView(pos, {}, (err, data) => {
        console.log(err)
        console.log(data)
      })
    }
  }
}
</script>

<style lang="css">
</style>
