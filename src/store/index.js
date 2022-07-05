import App from '../App.vue';
import { createApp } from 'vue';
import Vuex from 'vuex';
import { auth } from './auth.modul';

const app = createApp(App);
app.use(Vuex);
export default new Vuex.Store({
  modules: {
    auth,
  },
});
