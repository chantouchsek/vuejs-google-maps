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
  'mousemove'
]

const polylineProps = {
  ...shapeOptions,
  path: {
    type: Array,
    required: true,
    default: () => []
  }
}

export default {
  name: 'GoogleMapPolygon',

  mixins: [
    MapElement
  ],

  googleMapsElement: {
    boundProps,
    redirectedEvents
  },

  props: polylineProps,

  watch: {
    path: 'updatePath',
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
    updatePath (paths) {
      this.$_mapElement && this.$_mapElement.setPath(paths)
    },
    updateOptions () {
      this.$_mapElement && this.$_mapElement.setOptions(this.$props)
    }
  }
}
