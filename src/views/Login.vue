<template lang="pug">
  v-content
    v-container(fill-height fluid)
      v-layout(align-center justify-center)
        v-flex(xs10 sm6 md4 lg3)
          form.text-sm-center(@submit.prevent="submit()")
            .headline.my-4.text-capitalize {{ $t('authorization') }}

            v-text-field(
              v-model="auth.phone"
              :label="$t('phone')"
              autocomplete="username")

            v-text-field(
              v-model="auth.password"
              :label="$t('password')"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              autocomplete="current-password")

            v-btn(
              type="submit"
              block outlined
              :loading="loading"
            ) {{ $t('login') }}
</template>

<script>
import { mapActions } from 'vuex';

const phone = process.env.VUE_APP_PHONE || '';
const password = process.env.VUE_APP_PASSWORD || '';

export default {
  name: 'Login',
  data: () => ({
    loading: false,
    show: false,
    auth: {
      phone,
      password,
    },
  }),
  methods: {
    ...mapActions('auth', ['login']),
    submit() {
      this.loading = true;
      this.login(this.auth)
        .then(() => this.$router.push({ name: 'home' }))
        .finally(() => { this.loading = false; });
    },
  },
};
</script>
