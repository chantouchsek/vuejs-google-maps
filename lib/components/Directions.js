import MapElement from '../mixins/MapElement'

const travelModes = [
  'BICYCLING',
  'DRIVING',
  'TRANSIT',
  'WALKING'
]

const boundProps = [
  'draggable',
  'hideRouteList',
  'preserveViewport',
  'suppressMarkers',
  'suppressPolylines',
  'suppressBicyclingLayer',
  'suppressInfoWindows'
]

const redirectedEvents = [
  'directions_changed'
]

export default {
  name: 'GoogleMapDirections',

  mixins: [
    MapElement
  ],

  props: {
    origin: {
      type: [String, Object],
      required: true
    },
    destination: {
      type: [String, Object],
      required: true
    },
    travelMode: {
      type: String,
      required: false,
      default: 'DRIVING',
      validator: (value) => travelModes.includes(value)
    },
    draggable: {
      type: Boolean,
      required: false,
      default: false
    },
    hideRouteList: {
      type: Boolean,
      required: false,
      default: false
    },
    preserveViewport: {
      type: Boolean,
      required: false,
      default: false
    },
    suppressMarkers: {
      type: Boolean,
      required: false,
      default: false
    },
    suppressPolylines: {
      type: Boolean,
      required: false,
      default: false
    },
    suppressBicyclingLayer: {
      type: Boolean,
      required: false,
      default: false
    },
    suppressInfoWindows: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  watch: {
    origin: 'findRoute',
    destination: 'findRoute',
    travelMode: 'findRoute'
  },

  methods: {
    findRoute () {
      this.$_mapAncestor.$_directionsService.route({
        origin: this.$props.origin,
        destination: this.$props.destination,
        travelMode: this.$props.travelMode
      }, (response, status) => {
        if (status !== 'OK') {
          // eslint-disable-next-line
          console.warn('No directions found:', status, response)
          this.$_mapElement.setMap(null)
          return
        }

        this.$_mapElement.setMap(this.$_map)
        this.$_mapElement.setDirections(response)
      })
    }
  },

  googleMapsReady () {
    const options = Object.assign({
      map: this.$_map
    }, this.$props)
    this.$_mapElement = new window.google.maps.DirectionsRenderer(options)
    this.bindProps(this.$_mapElement, boundProps)
    this.redirectEvents(this.$_mapElement, redirectedEvents)
    this.findRoute()
  }
}
