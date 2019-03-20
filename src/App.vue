<template>
  <md-app id="app" md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <h3 class="md-title" style="flex: 1">
        <span class="page-icon">
          <img width="32" height="32" src="./assets/logo.png">
        </span>
        <span>Vue Google Map</span>
      </h3>
      <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
        <md-icon>menu</md-icon>
      </md-button>
    </md-app-toolbar>

    <md-app-drawer :md-active.sync="menuVisible" md-right>
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="page-icon">
          <img width="42" height="42" src="./assets/logo.png">
        </span>
        <span class="md-headline">Vue Google Map</span>
      </md-toolbar>

      <md-list>
        <md-list-item @click="goTo(route.name)" v-for="route in routes" :key="route.name">
          <span class="md-list-item-text" v-text="route.label"></span>
        </md-list-item>
      </md-list>
    </md-app-drawer>

    <md-app-content>
      <router-view />
    </md-app-content>
  </md-app>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      menuVisible: false,
      routes: []
    }
  },
  methods: {
    goTo (name) {
      this.$router.push({name})
      this.menuVisible = false
    }
  },
  created () {
    this.routes = this.$router.options.routes
  }
}
</script>

<style>
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }

  #app .md-content {
    position: relative;
    padding: 0;
  }

  #app .md-content > div {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .page-icon {
    margin-right: 10px;
  }

  .md-drawer {
    background-color: white;
  }

  .infowindow .infowindow-header {
    background-color: #333;
    color: white;
    padding: 15px;
  }

  .infowindow .infowindow-footer {
    background-color: #eee;
    padding: 10px;
  }

  a {
    color: #42b983;
  }
</style>
