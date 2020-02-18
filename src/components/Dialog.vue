<template lang="pug">
  v-dialog(v-model="show" max-width="400")
    v-card
      v-card-title.headline {{ $t('warning') }}
      v-card-text {{ $t('delete_message') }}
      v-card-actions
        v-spacer
        v-btn(text @click="show=false") {{ $t('cancel') }}
        v-btn(text @click="submit()" color="red") {{ $t('delete') }}
</template>
<script>
export default {
  name: 'Dialog',
  data: () => ({
    show: false,
    approve: null,
  }),
  methods: {
    submit() {
      this.approve();
      this.show = false;
    },
  },
  created() {
    this.$root.$on('confirm', (approve) => {
      this.show = true;
      this.approve = approve;
    });
  },
};
</script>
