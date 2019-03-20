import Ready from './Ready'
import FindElement from './FindElement'

/**
 * This mixin define something that is inside a GoogleMap component
 * and which depends on the map element as ancestor but may not render
 * any element in map and act just as a wrapper
 */
export default {

  mixins: [
    FindElement,
    Ready
  ],

  /**
   * Assign map ancestor to component or fail with error
   * all map element components must be used within an ancestor
   * map component since they depends on the map object
   */
  created () {
    const mapAncestor = this.$_findAncestor(
      a => a.$options.name === 'GoogleMap'
    )
    if (!mapAncestor) {
      throw new Error(`${this.constructor.name} component must be used within a <google-map> component.`)
    }

    this.$_mapAncestor = mapAncestor
  },

  /**
   * Prepare the map element child by adding
   * the map element reference to his scope
   */
  async googleMapsPrepare () {
    const mapComp = this.$_mapAncestor
    this.$_map = await mapComp.$_getMap()
  }

}
