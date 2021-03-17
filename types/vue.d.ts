/**
 * Extends interfaces in Vue.js
 */

import Vue from 'vue';
import VueWaiting from './';

declare module '@nuxt/types' {
  interface Context {
    $waiting: VueWaiting;
    $wait: VueWaiting;
  }
  interface NuxtAppOptions {
    $waiting: VueWaiting;
    $wait: VueWaiting;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $waiting: VueWaiting;
    $wait: VueWaiting;
  }
}

declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    waiting?: VueWaiting;
    wait?: VueWaiting;
  }
}
