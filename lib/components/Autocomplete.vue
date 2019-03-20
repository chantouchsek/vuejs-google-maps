<template lang="html">
  <div class="pac-card">
    <div class="pac-controls-container" v-if="controls">
      <slot name="controls" :types="localTypes">
        <div class="pac-control">
          <input type="checkbox" value="establishment" v-model="localTypes">
          <label for="changetype-establishment">Establishments</label>
          <input type="checkbox" value="address" v-model="localTypes">
          <label for="changetype-address">Addresses</label>
          <input type="checkbox" value="geocode" v-model="localTypes">
          <label for="changetype-geocode">Geocodes</label>
        </div>
        <div class="pac-control">
          <input type="checkbox">
          <label for="use-strict-bounds">Strict Bounds</label>
        </div>
      </slot>
    </div>

    <div class="pac-input-container">
      <slot name="before-input"></slot>
      <input id="pac-input" type="text" :value="model" @input="onInputChange" :placeholder="placeholder">
      <slot name="after-input"></slot>
    </div>
  </div>
</template>

<script>
import BoundProps from '../mixins/BoundProps'
import Events from '../mixins/Events'
import Ready from '../mixins/Ready'
import FindElement from '../mixins/FindElement'
import { redirectMethods } from '../utils/redirect-methods'

const redirectedMethods = [
  'getBounds',
  'getPlace',
  'setTypes',
  'setBounds'
]

export default {
  name: 'GoogleMapAutocomplete',

  mixins: [
    BoundProps,
    Events,
    FindElement,
    Ready
  ],

  props: {
    model: String,
    placeholder: {
      type: String,
      default: 'Search on map'
    },
    types: {
      type: Array,
      default: () => ([])
    },
    controls: {
      type: Boolean,
      default: true
    },
    updateMap: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      localTypes: this.$props.types
    }
  },

  methods: {
    ...redirectMethods({
      target () {
        return this.$_autocomplete
      },
      names: redirectedMethods
    }),
    onInputChange (event) {
      this.$emit('update:model', event.target.value)
    }
  },

  watch: {
    localTypes: 'setTypes',
    types: 'setTypes'
  },

  created () {
    const mapAncestor = this.$_findAncestor(
      a => a.$options.name === 'GoogleMap'
    )
    if (!mapAncestor) {
      return
    }
    this.$_mapAncestor = mapAncestor
  },

  async googleMapsPrepare () {
    const mapComp = this.$_mapAncestor
    this.$_map = mapComp ? await mapComp.$_getMap() : null
  },

  googleMapsReady () {
    let input = this.$el.querySelector('#pac-input')
    this.$_autocomplete = new window.google.maps.places.Autocomplete(input)
    this.$_autocomplete.setTypes(this.$props.types)

    if (this.$_map) {
      this.$_autocomplete.bindTo('bounds', this.$_map)
    }

    this.$_autocomplete.addListener('place_changed', () => {
      let place = this.$_autocomplete.getPlace()
      this.$emit('place-changed', place)
      this.$emit('update:model', place.formatted_address)

      if (this.$_map && this.updateMap) {
        if (place.geometry.viewport) {
          this.$_map.fitBounds(place.geometry.viewport)
        } else {
          this.$_map.setCenter(place.geometry.location)
        }
      }
    })
  }
}
</script>

<style lang="css">
  .pac-card {
    border-radius: 2px 0 0 2px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    outline: none;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    background-color: #fff;
    font-family: Roboto;
    z-index: 1;
    position: absolute;
    right: 40px;
    margin-right: 10px;
    position: absolute;
    right: 40px;
    top: 10px;
    display: flex;
  }

  .pac-control {
    display: inline-block;
    padding: 5px 11px;
  }

  .pac-input-container {
    padding: 5px 11px;
    display: flex;
  }

  .pac-input-container input {
    width: 100%;
    padding: 4px;
    margin: 0;
  }
</style>
