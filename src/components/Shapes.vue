<template lang="html">

  <div class="shapes-map">

    <div v-if="editableShape" class="shape-edit">
      <md-field>
        <label>Fill Color</label>
        <md-input v-model="editableShape.fillColor"></md-input>
      </md-field>

      <md-field>
        <label>Stroke Color</label>
        <md-input v-model="editableShape.strokeColor"></md-input>
      </md-field>

      <md-switch v-model="editableShape.draggable">Draggable</md-switch>
    </div>

    <google-map id="map" ref="Map" @click="editableShape = null">

      <google-map-circle
        :key="'circle-'+index"
        v-for="(circle, index) in circles"
        :radius="circle.radius"
        :center="circle.center"
        :options="circle.options"
      ></google-map-circle>

      <google-map-rectangle
        :key="'rectangle-'+index"
        v-for="(rectangle, index) in rectangles"
        :bounds="rectangle.bounds"
        :fill-color="rectangle.fillColor"
        :fill-opacity="rectangle.fillOpacity"
        :stroke-color="rectangle.strokeColor"
        :stroke-opacity="rectangle.strokeOpacity"
        :stroke-weight="rectangle.strokeWeight"
      ></google-map-rectangle>

      <google-map-polyline
        :key="'polyline-'+index"
        v-for="(line, index) in lines"
        :path="line.path"
        :geodesic="line.geodesic"
        :stroke-color="line.strokeColor"
        :stroke-opacity="line.strokeOpacity"
        :stroke-weight="line.strokeWeight"
      ></google-map-polyline>

      <google-map-polygon
        :id="key"
        :key="'polygon-'+key"
        v-for="(shape, key) in shapes"
        :draggable="shape.draggable"
        :clickable="shape.clickable"
        :fill-color="shape.fillColor"
        :stroke-color="shape.strokeColor"
        :paths="shape.paths"
        @click="editableShape = shape"
      ></google-map-polygon>

    </google-map>

  </div>

</template>

<script>

const defaultStyle = {
  strokeColor: '#4285F4',
  strokeOpacity: 0.5,
  fillColor: '#FF0000',
  fillOpacity: 0.5,
  strokeWeight: 1
}

const circles = [{
  center: {
    lat: 47.431546,
    lng: 11.788804
  },
  radius: 100000,
  draggable: true,
  options: defaultStyle
}, {
  center: {
    lat: 42.730972,
    lng: 11.143818
  },
  radius: 50000,
  draggable: true,
  options: defaultStyle
}]

const lines = [{
  path: [
    {lat: 37.772, lng: -122.214},
    {lat: 21.291, lng: -157.821},
    {lat: -18.142, lng: 178.431},
    {lat: -27.467, lng: 153.027}
  ],
  geodesic: true,
  strokeColor: '#FF0000',
  strokeOpacity: 1.0,
  strokeWeight: 2
}]

export default {
  data () {
    return {
      editableShape: null,
      circles,
      lines,
      rectangles: [{
        ...defaultStyle,
        bounds: {
          north: 23.668145,
          south: 27.671,
          east: -2.722558,
          west: -5.722558
        }
      }, {
        ...defaultStyle,
        bounds: {
          north: 30.668145,
          south: 50.671,
          east: -2.722558,
          west: -5.722558
        }
      }],
      shapes: {
        triangle: {
          fillColor: '',
          strokeColor: '',
          draggable: false,
          clickable: true,
          paths: [
            {lat: 25.774, lng: -80.190},
            {lat: 18.466, lng: -66.118},
            {lat: 32.321, lng: -64.757},
            {lat: 25.774, lng: -80.190}
          ]
        }
      }
    }
  },
  methods: {
    editShape (shape) {
      this.editableShape = shape
    }
  }
}
</script>

<style lang="css">
.shape-edit {
  width: 300px;
  height: 400px;
  background-color: white;
  right: 20px;
  top: 50px;
  padding: 10px;
  border: thin solid black;
  z-index: 1000;
  position: absolute;
}
</style>
