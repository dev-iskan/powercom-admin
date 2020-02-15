<template lang="pug">
  v-app
    v-progress-linear(v-if="loading" indeterminate style="z-index: 99")
    router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState('global', ['loading']),
  },
};
</script>
