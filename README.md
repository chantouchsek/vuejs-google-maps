# vuejs-google-map

> Google Map components and integration for VueJs

[![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

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

This module tries to map GoogleMap with Vue components as much as possible so any of the options available on the original GoogleMap class will be available as component props and all the events emitted will be mapped to component events.

## Components

Here a list of the available components that you can use with this plugin, click on them to discover more about the usage and see examples. If you are interested to see a __real life use__ checkout the [example](https://github.com/chantouchsek/vuejs-google-maps/tree/master/demo) folder which contains the source code of the [website]().

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
