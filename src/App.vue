<template lang="pug">
  v-app
    v-progress-linear(v-if="loading" indeterminate style="z-index: 99")
    router-view
    app-dialog
</template>

<script>
import { mapState } from 'vuex';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'App',
  components: {
    'app-dialog': Dialog,
  },
  computed: {
    ...mapState('global', ['loading']),
  },
};
</script>
