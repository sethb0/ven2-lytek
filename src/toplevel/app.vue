<script>
/* eslint-disable node/no-unpublished-import */
import { mapGetters, mapState } from 'vuex';
/* eslint-enable node/no-unpublished-import */

import MfLoading from '../shared/loading.vue';
import MfNavbar from './navbar.vue';
import MfPrivate from './private.vue';

export default {
  components: { MfLoading, MfNavbar, MfPrivate },
  computed: {
    ...mapState('auth', ['initialized']),
    ...mapGetters('auth', ['authorized']),
    authRoute () {
      return this.$route.meta?.auth;
    },
    'public' () {
      return this.$route.matched.every((x) => x.meta?.public);
    },
    showRouterView () {
      return this.authRoute || this.public || this.authorized;
    },
  },
};
</script>

<template>
  <div id="app" role="application" class="app-root-container">
    <template v-if="initialized">
      <mf-navbar v-if="!authRoute" class="app-navbar"></mf-navbar>
      <router-view v-if="showRouterView" class="app-main-view">
      </router-view>
      <mf-private v-else class="app-main-view"></mf-private>
    </template>
    <mf-loading v-else></mf-loading>
  </div>
</template>

<style>
a.disabled { pointer-events: none; }
div.fake-hr { height: 3px; }

.brand-font {
  color: var(--brand-font-color);
  font-family: var(--brand-font-family);
  font-style: normal;
  font-weight: normal;
}

.app-navbar {
  min-height: var(--navbar-height);
}

.app-main-view {
  height: var(--main-height);
  margin-top: var(--body-margin);
}
</style>
