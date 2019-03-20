export default {
  methods: {
    $_findAncestor (condition) {
      let search = this.$parent

      while (search) {
        if (condition(search)) {
          return search
        }
        search = search.$parent
      }

      return null
    },
    $_findChildren (condition) {
      let search = this.$children

      while (search) {
        if (condition(search)) {
          return search
        }
        search = search.$children
      }

      return null
    }
  }
}
