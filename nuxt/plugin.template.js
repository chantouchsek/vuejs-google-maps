import Vue from 'vue';
import GoogleMap from 'vuejs-google-maps';

export default () => {
    const { apiKey, libraries } = <%= serialize(options) %> || {}
    Vue.use(GoogleMap, {
        load: {
            apiKey,
            libraries
        }
    });
}
