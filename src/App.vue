<template lang="pug">
  v-app
    v-progress-linear(v-if="loading" indeterminate style="z-index: 99")
    router-view
    app-dialog
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'App',
  components: {
    'app-dialog': Dialog,
  },
  computed: {
    ...mapState('global', ['loading']),
  },
  methods: {
    ...mapActions('global', ['app']),
  },
  created() {
    this.app();
  },
};
</script>
<style>
.border {
  background-color: white !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important
}
.border-bottom {
  background-color: white !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important
}
.v-pagination__navigation, .v-pagination__item {
  box-shadow: none !important;
}
</style>
