import MapElement from '../mixins/MapElement'

const redirectedEvents = [
  'closeclick',
  'content_changed',
  'position_changed',
  'zindex_changed'
]

const redirectedMethods = ['close']

export default {
  name: 'GoogleMapInfoWindow',
  mixins: [MapElement],
  googleMapsElement: {
    redirectedEvents,
    redirectedMethods
  },
  props: {
    show: {
      type: Boolean,
      required: false,
      default: () => false
    },
    position: {
      type: Object,
      required: true
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  methods: {
    open (position) {
      this.$_mapElement.setPosition(position)
      this.$_mapElement.open(this.$_map)
      this.$emit('update:show', true)
    }
  },
  watch: {
    show (val) {
      val ? this.$_mapElement.open(this.$_map) : this.$_mapElement.close()
    },
    position (val) {
      this.$_mapElement.setPosition(val)
    },
    options: {
      handler (val) {
        this.$_mapElement.setOptions(val)
      },
      deep: true
    }
  },
  render (h) {
    return h(
      'div',
      {
        style: {
          display: 'none'
        }
      },
      this.$slots.default
    )
  },
  mounted () {
    const self = this
    self.observer = new MutationObserver(() => {
      let content = document.createElement('div')

      content.classList.add('google-map-info-windows')

      for (let childNode of self.$el.childNodes) {
        content.appendChild(childNode);
      }

      self.content = content;
      self.$_mapElement.setContent(self.content)

      document.querySelectorAll('.google-map-info-windows').forEach(function (element) {
        element.onclick = function ($event) {
          self.$emit('info-window-clicked', $event)
        }
      })
    })
    this.observer.observe(this.$el, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    })
  },
  googleMapsReady () {
    this.$_mapElement.setContent(this.$props.content || this.$el.innerHTML)
    // Since the parent map is set automatically
    // during element creation in MapElement mixin
    // if the info window shoudn't be seen we close it
    if (!this.show) {
      this.close()
    }
    // Sync parent show property
    this.listen(this.$_mapElement, 'closeclick', () => {
      this.$emit('update:show', false)
    })
  }
}
