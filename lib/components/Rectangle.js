import MapElement from '../mixins/MapElement'

const boundProps = [
  'bounds',
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
  'mousemove'
]

export default {
  name: 'GoogleMapRectangle',

  mixins: [
    MapElement
  ],

  googleMapsElement: {
    boundProps,
    redirectedEvents
  },

  props: {
    bounds: {
      type: [Object, Array],
      required: true
    },

    // Beheviour customization
    clickable: {
      type: Boolean,
      default: true
    },
    draggable: {
      type: Boolean,
      default: false
    },
    editable: {
      type: Boolean,
      default: false
    },
    geodesic: {
      type: Boolean,
      default: false
    },
    visible: {
      type: Boolean,
      default: true
    },

    // Style customization
    zIndex: {
      type: Number
    },
    fillColor: {
      type: String
    },
    fillOpacity: {
      type: Number
    },
    strokeColor: {
      type: String
    },
    strokeWeight: {
      type: Number
    },
    strokeOpacity: {
      type: Number
    }
  },

  watch: {
    bounds: 'updateBounds',
    clickable: 'updateOptions',
    editable: 'updateOptions',
    draggable: 'updateOptions',
    visible: 'updateOptions',
    geodesic: 'updateOptions',
    fillColor: 'updateOptions',
    fillOpacity: 'updateOptions',
    strokeColor: 'updateOptions',
    strokeWeight: 'updateOptions',
    strokeOpacity: 'updateOptions'
  },

  methods: {
    updateBounds (paths) {
      this.$_mapElement && this.$_mapElement.setBounds(paths)
    },
    updateOptions () {
      this.$_mapElement && this.$_mapElement.setOptions(this.$props)
    }
  }
}
