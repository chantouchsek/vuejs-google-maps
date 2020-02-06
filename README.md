# vuejs-google-map

> Google Map components and integration for VueJs

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]![npm](https://img.shields.io/npm/dm/vuejs-google-maps?style=flat-square)

This package is under active development, the documentation is not complete yet, so if is missing something open a
 request or look at the [source code](https://github.com/chantouchsek/vuejs-google-map).

## Installation

```
npm i vuejs-google-maps
yarn add vuejs-google-maps
```

## Usage

Before starting you need a Google API key from the [developer console](http://console.developers.google.com/), once you obtained your key, import the module in your application and register it as plugin:

```js
import VueGoogleMap from 'vuejs-google-maps'

Vue.use(VueGoogleMap, {
  load: {
    apiKey: 'your-api-key',
    libraries: ['...']
  }
})
```

#Nuxt support

- create a file inside plugins folder
``vuejs-google-maps.js``


```js
import VueGoogleMap from 'vuejs-google-maps'

Vue.use(VueGoogleMap, {
  load: {
    apiKey: 'your-api-key',
    libraries: ['...']
  }
})
```

- inside nuxt.config.js

place it inside of plugins section

```html
plugins: [
    [...],
    { src: '~/plugins/vuejs-google-maps.js', mode: 'all' }
]
```

This module tries to map GoogleMap with Vue components as much as possible so any of the options available on the original GoogleMap class will be available as component props and all the events emitted will be mapped to component events.

## Components

Here a list of the available components that you can use with this plugin, click on them to discover more about the usage and see examples. If you are interested to see a __real life use__ checkout the [example](https://github.com/chantouchsek/vuejs-google-maps/tree/master/demo) folder which contains the source code of the [website](https://bookingkh.com/).

* [Marker](#marker)
* [AutoComplete](#autocomplete)
* [PlaceDetails](#placedetails)
* [Circle](#circle)
* [Rectangle](#rectangle)
* [Polygon](#polygon)
* [Polyline](#polyline)


#### Marker

The Google Map Marker element require to be inside a `<google-map>` component., it support the __default slot__.

```html
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
></google-map-marker>
```

#### AutoComplete

The AutoComplete component does not require to be inside a `<google-map>` component, it can be used anyway inside your app. It display an input and optionally the autocomplete controls, when a place is selected the __place-changed__ event is triggered with the result.

```html
<google-map-autocomplete
  model="String"
  types="Array"
  controls="Boolean"
  update-map="Boolean"
  place-changed="Function"
></google-map-autocomplete>
```

##### Update V 0.0.6
````html
<template lang="html">
  <div class="info-windows">
    <google-map id="map" ref="Map">
      <google-map-marker
        :key="index"
        v-for="(infowindow, index) in infoWindowsList"
        :position="infowindow.position"
        @click="toggleInfoWindow(infowindow)"
      ></google-map-marker>
      <google-map-infowindow
              :position="infoWIndowContext.position"
              :show.sync="showInfo"
              :options="{maxWidth: 300}"
              @info-window-clicked="infoClicked"
      >
        <h4>{{infoWIndowContext.title}}</h4>
        <p>{{infoWIndowContext.description}}</p>
      </google-map-infowindow>
    </google-map>
  </div>
</template>

<script>
import cities from '../assets/cities.json'
export default {
  data () {
    return {
      showInfo: false,
      infoWIndowContext: {
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
