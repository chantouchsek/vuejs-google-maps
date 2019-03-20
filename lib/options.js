export function optionMergeStrategies (Vue) {
  const strats = Vue.config.optionMergeStrategies
  strats.googleMapsReady = strats.created
  strats.googleMapsPrepare = strats.created
  strats.googleMapsElement = strats.methods
}
