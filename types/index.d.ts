import { PluginFunction } from 'vue';

import './vue'

export interface VueGoogleMapOptions {
  apiKey: string
  libraries: Array<string>
}

export default class VueGoogleMap {
  constructor(options: VueGoogleMapOptions);

  static install(): PluginFunction<any>;
}

