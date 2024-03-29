/* eslint-disable node/no-unpublished-import */
import Vue from 'vue';
import Vuex from 'vuex';
/* eslint-enable node/no-unpublished-import */

import auth from './auth/store';
// import characters from './characters/store';
import charms from './charms/store';
// import chronicles from './chronicles/store';
import reference from './reference/store';

Vue.use(Vuex);

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production', // eslint-disable-line no-process-env
  modules: {
    auth,
    // characters,
    charms,
    // chronicles,
    reference,
  },
});
