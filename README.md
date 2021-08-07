# vuejs-google-map

> Google Map components and integration for VueJs

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]![npm](https://img.shields.io/npm/dm/vuejs-google-maps?style=flat-square)
[![npm](https://img.shields.io/npm/dt/vuejs-google-maps.svg?style=flat-square)](https://npmjs.com/package/vuejs-google-maps)

This package is under active development, the documentation is not complete yet, so if is missing something open a
request or look at the [source code](https://github.com/chantouchsek/vuejs-google-map).

## Installation

```
npm i vuejs-google-maps
yarn add vuejs-google-maps
```

## Usage

Before starting you need a Google API key from the [developer console](http://console.developers.google.com/), once you
obtained your key, import the module in your application and register it as plugin:

```js
import Vue from 'vue'
import VueGoogleMap from 'vuejs-google-maps'
import 'vuejs-google-maps/dist/vuejs-google-maps.css'

Vue.use(VueGoogleMap, {
    load: {
        apiKey: 'your-api-key',
        libraries: [/* rest of libraries */]
    }
})
```

## ♻️ Usage with Nuxt.js

Add `vuejs-google-maps/nuxt` to modules section of `nuxt.config.js`

```js
export default {
    modules: [
        // Simple usage
        'vuejs-google-maps/nuxt',
        // Passing options in module configuration
        ['vuejs-google-maps/nuxt', {apiKey: 'xxxxxx', libraries: [/* rest of libraries */]}]
    ],
    // Passing options in module top level configuration
    googleMaps: {apiKey: 'xxxxxx', libraries: [/* rest of libraries */]}
}
```

This module tries to map GoogleMap with Vue components as much as possible so any of the options available on the
original GoogleMap class will be available as component props and all the events emitted will be mapped to component
events.

## Components

Here a list of the available components that you can use with this plugin, click on them to discover more about the
usage and see examples. If you are interested to see a __real life use__ checkout
the [example](https://github.com/chantouchsek/vuejs-google-maps/tree/master/demo) folder which contains the source code
of the [website](https://google-maps.chantouch.me).

* [Marker](#marker)
* [AutoComplete](#autocomplete)
* [PlaceDetails](#placedetails)
* [Circle](#circle)
* [Rectangle](#rectangle)
* [Polygon](#polygon)
* [Polyline](#polyline)

#### Marker

The Google Map Marker element require to be inside a `<google-map>` component., it support the __default slot__.

```vue

<template>
  <google-map-marker
      title="String"
      label="String|Object"
      clickable="Boolean"
      draggable="Boolean"
      visible="Boolean"
      z-index="Number"
      click="Function"
      dblclick="Function"
      rightclick="Function"
      drag="Function"
      dragstart="Function"
      dragend="Function"
      mouseup="Function"
      mousedown="Function"
      mouseover="Function"
      mouseout="Function"
  />
</template>
```

#### AutoComplete

The AutoComplete component does not require to be inside a `<google-map>` component, it can be used anyway inside your
app. It display an input and optionally the autocomplete controls, when a place is selected the __place-changed__ event
is triggered with the result.

```vue

<template>
  <google-map-autocomplete
      model="String"
      types="Array"
      controls="Boolean"
      update-map="Boolean"
      place-changed="Function"
  />
</template>
```

### Autocomplete props
 - Example:
```js
const center = { lat: 50.064192, lng: -130.605469 };
// Create a bounding box with sides ~10km away from the center point
const defaultBounds = {
  north: center.lat + 0.1,
  south: center.lat - 0.1,
  east: center.lng + 0.1,
  west: center.lng - 0.1,
};
const options = {
  bounds: defaultBounds,
  componentRestrictions: { country: "us" },
  fields: ["address_components", "geometry", "icon", "name"],
  strictBounds: false,
  types: ["establishment"],
};
```

````vue

<template>
  <div class="info-windows">
    <google-map id="map" ref="Map">
      <google-map-marker
          :key="index"
          v-for="(infoWindow, index) in infoWindowsList"
          :position="infoWindow.position"
          :key="index"
          @click="toggleInfoWindow(infoWindow)"
      />
      <google-map-infowindow
          :position="infoWIndowContext.position"
          :show.sync="showInfo"
          :options="{maxWidth: 300}"
          @info-window-clicked="infoClicked"
      >
        <h4>{{infoWindowContext.title}}</h4>
        <p>{{infoWindowContext.description}}</p>
      </google-map-infowindow>
    </google-map>
  </div>
</template>

<script>
import cities from '~/assets/cities.json'

export default {
  data() {
    return {
      showInfo: false,
      infoWindowContext: {
        position: {
          lat: 44.2899,
          lng: 11.8774
        }
      },
      infoWindowsList: cities
    }
  },
  methods: {
    toggleInfoWindow(context) {
      this.infoWIndowContext = context
      this.showInfo = true
    },
    infoClicked(context) {
      console.log(context)
    }
  }
}
</script>
````

## Added

### @info-window-clicked($event) to info-windows

---

## Development

If you want to contribute in the development clone or fork the repository, than install all the dependencies:

```
npm install
yarn install
```

Create a `.env` file containing the __VUE_APP_GOOGLE_APIKEY__ variable with your valid API key:

```env
VUE_APP_GOOGLE_APIKEY=my-apy-key
```

---

## License

This package is under the [MIT License](LICENSE).

[npm-image]: https://badge.fury.io/js/vuejs-google-maps.svg

[npm-url]: https://npmjs.org/package/vuejs-google-maps

[daviddm-image]: https://david-dm.org/chantouchsek/vuejs-google-maps.svg?theme=shields.io

[daviddm-url]: https://david-dm.org/chantouchsek/vuejs-google-maps.svg
