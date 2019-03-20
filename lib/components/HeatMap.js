import MapElement from '../mixins/MapElement'

export default {
  name: 'GoogleMapHeatmap',

  mixins: [
    MapElement
  ],

  props: {
    data: {
      type: Array,
      required: true,
      default: () => []
    },
    radius: {
      type: Number,
      required: false
    },
    opacity: {
      type: Number,
      required: false,
      validator: v => (v >= 0 && v <= 1)
    },
    gradient: {
      type: Array,
      required: false
    }
  },

  methods: {
    updateOptions () {
      this.$_mapElement.setOptions({
        radius: this.radius,
        opacity: this.opacity,
        gradient: this.gradient
      })
    },
    prepareData (data) {
      data = data || this.data
      return this.data.map(p => {
        if (p instanceof window.google.maps.LatLng || p.location instanceof window.google.maps.LatLng) {
          return p
        }
        if (typeof p.location === 'object') {
          p.location = new window.google.maps.LatLng(location)
          return p
        }
        if (Array.isArray(p)) {
          return new window.google.maps.LatLng({
            lat: p[0],
            lng: p[1]
          })
        }
        return new window.google.maps.LatLng(p)
      })
    }
  },

  watch: {
    radius: 'updateOptions',
    opacity: 'updateOptions',
    gradient: 'updateOptions',
    data (val) {
      this.$_mapElement.setData(
        this.prepareData(val)
      )
    }
  },

  // When Google Maps is ready
  googleMapsReady () {
    this.$_mapElement = new window.google.maps.visualization.HeatmapLayer({
      data: this.prepareData(),
      map: this.$_map
    })
  }
}
