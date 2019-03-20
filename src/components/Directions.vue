<template lang="html">

  <div class="simple-map">

    <google-map id="map" ref="Map">

      <google-map-directions
        v-for="(direction, index) in directionsList"
        :key="index"
        :origin="direction.origin"
        :destination="direction.destination"
        :travel-mode="direction.travelMode"
        @directions-changed="onDirectionsChange"
        preserve-viewport
      />

    </google-map>

    <div class="directions-control">

      <div class="direction-options" v-for="(direction, index) in directionsList">
        <h3>Route Track #{{index + 1}}</h3>

        <div class="md-layout md-gutter">
          <div class="md-layout-item">
            <md-field>
              <label>Origin</label>
              <md-input v-model="direction.origin"></md-input>
            </md-field>
          </div>

          <div class="md-layout-item">
            <md-field>
              <label>Destination</label>
              <md-input v-model="direction.destination"></md-input>
            </md-field>
          </div>
        </div>

        <md-field>
          <label for="travel-mode">Travel Mode</label>
          <md-select v-model="direction.travelMode" name="travel-mode">
            <md-option v-for="mode in travelModes" :value="mode">{{mode}}</md-option>
          </md-select>
        </md-field>
      </div>

    </div>

  </div>

</template>

<script>
import directions from '../assets/directions.json'

export default {
  data () {
    return {
      directionsList: directions,
      travelModes: [
        'BICYCLING',
        'DRIVING',
        'TRANSIT',
        'WALKING'
      ]
    }
  },
  methods: {
    onDirectionsChange () {
      console.log('Direction change callback');
    }
  }
}
</script>

<style lang="css">
  .directions-control {
    position: absolute;
    top: 65px;
    right: 10px;
    background-color: white;
    z-index: 10000;
  }

  .direction-options {
    padding: 10px 20px;
  }

  .md-select-menu {
    background-color: white;
  }
</style>
