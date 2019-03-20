import Vue from 'vue'
import VueRouter from 'vue-router'

import SimpleMap from './components/SimpleMap.vue'
import InfoWindows from './components/InfoWindows.vue'
import PlaceSearch from './components/PlaceSearch.vue'
import UserPosition from './components/UserPosition.vue'
import Shapes from './components/Shapes.vue'
import Directions from './components/Directions.vue'
import HeatMap from './components/HeatMap.vue'

const router = new VueRouter({
  mode: 'hash',
  routes: [
    { path: '/', name: 'simple', label: 'Simple', component: SimpleMap },
    { path: '/info-windows', name: 'info-windows', label: 'Info Windows', component: InfoWindows },
    { path: '/place-search', name: 'place-search', label: 'Place Search', component: PlaceSearch },
    { path: '/user-position', name: 'user-position', label: 'User Position', component: UserPosition },
    { path: '/shapes', name: 'shapes', label: 'Map Shapes', component: Shapes },
    { path: '/directions', name: 'directions', label: 'Directions', component: Directions },
    { path: '/heatmap', name: 'heatmap', label: 'HeatMap', component: HeatMap }
  ]
})

Vue.use(VueRouter)

export default router
