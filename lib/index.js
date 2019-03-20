'use strict'

import { version } from '../package.json'

import 'regenerator-runtime/runtime'
import loader from './lib-loader'
import { optionMergeStrategies } from './options'
import { initErrorHandling } from './utils/error'

import Map from './components/Map.vue'
import Marker from './components/Marker'

import InfoWindow from './components/InfoWindow'
import Autocomplete from './components/Autocomplete'
import PlaceDetails from './components/PlaceDetails'
import UserPosition from './components/UserPosition'
import Directions from './components/Directions'
import Polygon from './components/Polygon'
import Polyline from './components/Polyline'
import Circle from './components/Circle'
import Rectangle from './components/Rectangle'
import HeatMap from './components/HeatMap'

export {
  Map,
  Marker,
  Circle,
  Rectangle,
  Polyline,
  UserPosition,
  PlaceDetails,
  Autocomplete,
  InfoWindow,
  Polygon,
  Directions,
  HeatMap
}

function registerComponents (Vue, prefix) {
  Vue.component(`${prefix}`, Map)
  Vue.component(`${prefix}-marker`, Marker)
  Vue.component(`${prefix}-circle`, Circle)
  Vue.component(`${prefix}-infowindow`, InfoWindow)
  Vue.component(`${prefix}-autocomplete`, Autocomplete)
  Vue.component(`${prefix}-placedetails`, PlaceDetails)
  Vue.component(`${prefix}-userposition`, UserPosition)
  Vue.component(`${prefix}-polygon`, Polygon)
  Vue.component(`${prefix}-polyline`, Polyline)
  Vue.component(`${prefix}-rectangle`, Rectangle)
  Vue.component(`${prefix}-directions`, Directions)
  Vue.component(`${prefix}-heatmap`, HeatMap)
}

// @see: https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions
const defaultOptions = {
  zoom: 5,
  center: {
    lat: 41.89193,
    lng: 12.51133
  }
}

export default {
  version: version,
  install (Vue, options) {
    const finalOptions = Object.assign({}, {
      installComponents: true,
      componentsPrefix: 'google-map',
      mapOptions: defaultOptions
    }, options)

    Vue.prototype.$googleMap = finalOptions.mapOptions

    optionMergeStrategies(Vue)
    initErrorHandling(Vue)

    if (finalOptions.installComponents) {
      registerComponents(Vue, finalOptions.componentsPrefix)
    }

    if (finalOptions.load) {
      loader.load(finalOptions.load)
    }
  }
}
