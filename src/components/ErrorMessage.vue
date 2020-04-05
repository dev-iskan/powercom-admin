<template lang="pug">
  v-alert.alert.ma-4.white(
    mode="in-out"
    transition="slide-x-transition"
    v-model="show"
    text border="top"
    color="red"
    width="400"
    dismissible)
    div(v-html="message")
</template>
<script>
export default {
  name: 'ErrorMessage',
  data: () => ({
    show: false,
    message: '',
    timer: null,
  }),
  methods: {
    submit() {
      this.show = false;
    },
  },
  created() {
    this.$root.$on('error', (message) => {
      this.message = message;
      this.show = true;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.show = false;
      }, 5000);
    });
  },
};
</script>
<style>
  .alert {
    position: fixed !important;
    z-index: 202;
    top: 0;
    right: 0;
  }
</style>
