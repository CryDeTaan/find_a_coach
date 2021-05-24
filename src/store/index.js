import { createStore } from 'vuex';

import authModule from './modules/auth/index';
import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth: authModule,
    coaches: coachesModule,
    requests: requestsModule,
  },
});
