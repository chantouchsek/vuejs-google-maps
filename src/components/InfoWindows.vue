<template lang="html">
  <div class="info-windows">
    <google-map id="map" ref="Map">
      <google-map-marker
        :key="index"
        v-for="(info, index) in infoWindowsList"
        :position="info.position"
        @click="toggleInfoWindow(info)"
      />
      <google-map-infowindow
              v-for="(info, index) in infoWindowsList"
              :key="`info-window-${index}`"
              :position="info.position"
              :show.sync="showInfo"
              :options="{maxWidth: 300}"
              @info-window-clicked="infoClicked($event, info)"
      >
        <h4 >{{infoWindowContext.title}}</h4>
        <p>{{infoWindowContext.description}}</p>
      </google-map-infowindow>
    </google-map>
  </div>
</template>

<script>
import cities from '../assets/cities.json'
export default {
  data () {
    return {
      showInfo: true,
      infoWindowContext: {
        title: 'Hello world',
        description: 'Description',
        position: {
          lat: 44.2899,
          lng: 11.8774
        }
      },
      infoWindowsList: cities
    }
  },
  methods: {
    toggleInfoWindow (context) {
      this.infoWindowContext = context
      this.showInfo = true
    },
    infoClicked(context, spot) {
      console.log('infoClicked', context, spot)
    }
  }
}
</script>
