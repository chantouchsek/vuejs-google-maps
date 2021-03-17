import Vue from 'vue';
import GoogleMap from 'vuejs-google-maps';
import 'vuejs-google-maps/dist/vuejs-google-maps.css'

export default () => {
    const { apiKey, libraries } = <%= serialize(options) %> || {}
    Vue.use(GoogleMap, {
        load: {
            apiKey,
            libraries
        }
    });
}
