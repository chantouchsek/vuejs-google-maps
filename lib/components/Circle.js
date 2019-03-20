import { shapeOptions } from '../common/props'
import MapElement from '../mixins/MapElement'

const boundProps = [
  'center',
  'draggable',
  'editable',
  'radius',
  'visible'
]

const redirectedEvents = [
  'click',
  'rightclick',
  'dblclick',
  'drag',
  'dragstart',
  'dragend',
  'mouseup',
  'mousedown',
  'mouseout',
  'mouseover',
  'mousemove',
  'radius_changed',
  'center_changed'
]

const redirectedMethods = [
  'getBounds',
  'getCenter',
  'getRadius',
  'getVisible'
]

const circleProps = {
  ...shapeOptions,
  center: {
    type: Object,
    required: true
  },
  radius: {
    type: Number,
    required: true
  },
  fitBounds: {
    type: [Boolean, String],
    default: false
  }
}

export default {
  name: 'GoogleMapCircle',

  mixins: [
    MapElement
  ],

  googleMapsElement: {
    boundProps,
    redirectedEvents,
    redirectedMethods
  },

  props: circleProps,

  watch: {
    clickable: 'updateOptions',
    editable: 'updateOptions',
    draggable: 'updateOptions',
    radius: 'updateOptions',
    zIndex: 'updateOptions'
  },

  methods: {
    updateOptions (options) {
      this.$_mapElement && this.$_mapElement.setOptions(options || this.$props)
    }
  },

  // When Google Maps is ready
  googleMapsReady () {
    // Automatically fit bounds when created
    if (this.fitBounds) {
      this.$_map.fitBounds(this.$_mapElement.getBounds())
    }
  }
}
