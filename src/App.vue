<template lang="pug">
  v-app(style="background-color: #FAFAFA")
    v-progress-linear(v-if="loading" indeterminate style="z-index: 99")
    app-error-message
    router-view
    app-dialog
</template>

<script>
import { mapState } from 'vuex';
import axios from '@/api';
import Dialog from '@/components/Dialog.vue';
import ErrorMessage from '@/components/ErrorMessage.vue';

export default {
  name: 'App',
  components: {
    'app-dialog': Dialog,
    'app-error-message': ErrorMessage,
  },
  computed: {
    ...mapState('global', ['loading']),
  },
  created() {
    axios.interceptors.response.use(null, (error) => {
      let message;
      if (error.response) {
        if (error.response.data && error.response.data.errors) {
          message = [];
          Object.keys(error.response.data.errors).forEach((key) => {
            message.push(error.response.data.errors[key].join(' '));
          });
          message = message.join('<br>');
        } else {
          message = error.response.data.message || error.response.data;
        }
      } else if (error.request) {
        message = error.request;
      } else {
        message = error.message;
      }
      this.$root.$emit('error', message);
      return Promise.reject(error);
    });
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
.v-data-table-header {
  background-color: #EFEFEF;
}
</style>
