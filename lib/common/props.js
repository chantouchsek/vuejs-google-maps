export const beheviorOptions = {
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
    default: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}

export const styleOptions = {
  zIndex: {
    type: Number,
    required: false
  },
  fillColor: {
    type: String,
    required: false,
    default: '#4285F4'
  },
  fillOpacity: {
    type: Number,
    required: false,
    default: 0.25
  },
  strokeColor: {
    type: String,
    required: false,
    default: '#4285F4'
  },
  strokeWeight: {
    type: Number,
    required: false,
    default: 1
  },
  strokeOpacity: {
    type: Number,
    required: false,
    strokeOpacity: 0.5
  }
}

export const shapeOptions = {
  ...beheviorOptions,
  ...styleOptions
}
