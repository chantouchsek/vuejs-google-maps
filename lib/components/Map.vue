<template>
  <div class="vue-google-map">
    <div ref="map" class="map-view"></div>
    <div class="hidden-content">
      <slot></slot>
    </div>
    <slot name="visible"></slot>
  </div>
</template>

<script>
import Ready from '../mixins/Ready'
import BoundProps from '../mixins/BoundProps'
import Events from '../mixins/Events'
import { autoCall, assignDefined } from '../utils/misc'
import { redirectMethods } from '../utils/redirect-methods'

const boundProps = [
  {
    name: 'center',
    watcher: value => {
      return value && {
        lat: autoCall(value.lat),
        lng: autoCall(value.lng)
      }
    },
    identity: (a, b) => {
      if (a && b) {
        if (typeof a.equals !== 'function') {
          a = new window.google.maps.LatLng(a)
        }
        if (typeof b.equals !== 'function') {
          b = new window.google.maps.LatLng(b)
        }
        return a.equals(b)
      }
    },
    retriever: (value) => ({
      lat: value.lat(),
      lng: value.lng()
    })
  },
  'heading',
  'mapTypeId',
  'tilt',
  'zoom'
]

const redirectedMethods = [
  'panBy',
  'panTo',
  'panToBounds',
  'setCenter',
  'fitBounds',
  'getBounds'
]

const redirectedEvents = [
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'mousemove',
  'mouseout',
  'mouseover',
  'resize',
  'rightclick',
  'tilesloaded'
]

export default {
  name: 'GoogleMap',

  mixins: [
    Ready,
    BoundProps,
    Events
  ],

  props: {
    center: {
      type: [String, Object, Array],
      required: false
    },
    heading: {
      type: Number
    },
    mapTypeId: {
      type: String,
      required: false
    },
    options: {
      type: Object,
      default: () => ({})
    },
    tilt: {
      type: Number,
      required: false
    },
    zoom: {
      type: Number,
      required: false
    }
  },

  beforeCreate () {
    this.$_mapPromises = []
  },

  googleMapsReady () {
    const element = this.$refs.map

    // Fallback to global options when props are not defined
    const { options, ...propOpts } = this.$props
    const mapOptions = assignDefined(this.$googleMap, options, propOpts)

    // Create the map
    this.$_map = new window.google.maps.Map(element, mapOptions)
    this.bindProps(this.$_map, boundProps)
    this.redirectEvents(this.$_map, redirectedEvents)
    this.lastCenter = this.$_map.getCenter()

    // Init map renderers
    this.$_streetView = this.$_map.getStreetView()
    this.$_streetViewService = new window.google.maps.StreetViewService()
    this.$_directionsService = new window.google.maps.DirectionsService()
    this.$_directionsRenderer = new window.google.maps.DirectionsRenderer({
      map: this.$_map
    })

    // Update component bounds property
    this.listen(this.$_map, 'bounds_changed', () => {
      this.$emit('update:bounds', this.$_map.getBounds())
    })

    // Update last center
    this.listen(this.$_map, 'idle', () => {
      this.$emit('idle', this)
      this.lastCenter = this.$_map.getCenter()
    })

    // Code that awaits `$_getMap()`
    this.$_mapPromises.forEach(resolve => resolve(this.$_map))
  },

  methods: {
    ...redirectMethods({
      target () {
        return this.$_map
      },
      names: redirectedMethods
    }),

    resize (preserveCenter = true) {
      if (this.$_map) {
        window.google.maps.event.trigger(this.$_map, 'resize')
        preserveCenter && this.$_map.setCenter(this.lastCenter)
      }
    },

    $_getMap () {
      if (this.$_map) {
        return Promise.resolve(this.$_map)
      } else {
        return new Promise(resolve => {
          this.$_mapPromises.push(resolve)
        })
      }
    },

    // This method simulate the DirectionsService api directly on map
    // Route; An object with the route request properties
    // @see: https://developers.google.com/maps/documentation/javascript/3.exp/reference#DirectionsRequest
    getDirections (route, callback) {
      callback = callback || function () {}
      return new Promise((resolve, reject) => {
        this.$_directionsService.route(route, (result, status) => {
          if (status !== 'OK') {
            callback(status)
            reject(status)
            return
          }
          this.$_directionsRenderer.setDirections(result)
          callback(null, result)
          resolve(result)
        })
      })
    },

    // This method simulate the StreetViewService directly on current map
    // Position: Lat Lng position to get panoramas
    // Options: { location, preference, radius, source }
    //  @see: https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewLocationRequest
    // Callback: The callback to run when the streetview service has done
    setStreetView (position, options, callback) {
      callback = callback || function () {}
      return new Promise((resolve, reject) => {
        this.$_streetViewService.getPanorama({
          location: position
        }, (data, status) => {
          if (status !== 'OK') {
            callback(status)
            reject(status)
            return
          }
          this.$_streetView.setPano(data.location.pano)
          this.$_streetView.setVisible(true)
          callback(null, data)
          resolve(data)
        })
      })
    }
  },

  watch: {
    options: {
      handler (val) {
        this.$_map.setOptions(val)
      },
      deep: true
    }
  }
}
</script>

<style lang="css">
  .vue-google-map {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .vue-google-map .map-view {
    height: 100%;
    width: 100%;
    position: relative;
  }

  .vue-google-map .hidden-content {
    display: none;
  }
</style>
