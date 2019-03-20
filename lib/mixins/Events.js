export default {
  beforeCreate () {
    this.$_googleListeners = []
  },

  beforeDestroy () {
    for (const listener of this.$_googleListeners) {
      listener.remove()
    }
  },

  methods: {
    listen (target, event, handler) {
      this.$_googleListeners.push(target.addListener(event, handler))
    },

    redirectEvents (target, events) {
      for (const e of events) {
        const normalized = e.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/[\s_]+/g, '-').toLowerCase()
        this.listen(target, e, (...args) => {
          this.$emit(normalized, ...args)
        })
      }
    }
  }
}
