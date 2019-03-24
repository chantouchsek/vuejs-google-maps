<template lang="html">

    <div class="simple-map">

        <google-map id="map" ref="Map" :center="center">

            <google-map-marker
                    v-for="(marker, index) in markersList"
                    :key="index"
                    :title="marker.title"
                    :position="marker.position"
                    @click="panToMarker(marker.position)"
                    @rightclick="setPanorama(marker.position)"
            ></google-map-marker>
            <google-map-polyline :path="path"
                                 :draggable="false"
                                 :strokeWeight="3"
            ></google-map-polyline>
        </google-map>

    </div>

</template>

<script>
  import cities from '../assets/cities.json'

  export default {
    data () {
      return {
        infoWIndowContext: {},
        markersList: cities,
        center: {
          lat: 34.734004,
          lng: 135.73660
        },
        path: [
          {
            lat: 34.731943,
            lng: 135.731617
          },
          {
            lat: 34.733713,
            lng: 135.735292
          },
          {
            lat: 34.734004,
            lng: 135.73660
          }
        ]
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
