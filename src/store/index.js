import { createStore } from 'vuex';

import coachesModule from './modules/coaches/index';
import requestsModule from './modules/requests/index';

export default createStore({
  state: {
    userId: 'c3',
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    coaches: coachesModule,
    requests: requestsModule,
  },
});
