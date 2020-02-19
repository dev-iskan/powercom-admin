<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      v-card.border.elevation-0
        v-card-title.py-0.px-0
          v-btn(text :to="{ name: 'users' }" color="#444" large tile)
            v-icon(small) mdi-keyboard-backspace
            .ml-2 {{ $t('users') }}
          v-spacer
          v-btn(
            @click="submit"
            :loading="loading"
            text color="#444" large tile
          )
            v-icon(small) mdi-content-save
            .ml-2 {{ $t('save') }}
          v-btn(
            @click="remove"
            :loading="loading"
            text color="red" large tile
          )
            v-icon(small) mdi-delete
            .ml-2 {{ $t('delete') }}
        v-divider
        v-card-text
          v-layout(row)
            v-flex(xs12 sm6)
              v-text-field(v-model="payload.name" :label="$t('firstname')")
              v-text-field(v-model="payload.surname" :label="$t('surname')")
              v-text-field(v-model="payload.patronymic" :label="$t('patronymic')")
            v-flex(xs12 sm6)
              v-text-field(v-model="payload.phone" :label="$t('phone')")
              v-text-field(v-model="payload.email" :label="$t('email')")
              v-text-field(v-model="payload.password" :label="$t('password')")
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Item',
  data: () => ({
    payload: {
      id: null,
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      email: '',
      password: '',
    },
  }),
  computed: {
    ...mapState('user', ['loading']),
  },
  methods: {
    ...mapActions('user', ['store', 'update', 'destroy', 'get']),
    submit() {
      if (this.payload.id) {
        this.update(this.payload).then(() => this.$router.push({ name: 'users' }));
      } else {
        this.store(this.payload).then(() => this.$router.push({ name: 'users' }));
      }
    },
    remove() {
      this.$root.$emit('confirm', () => this
        .destroy({ id: this.payload.id, params: { paginate: true } })
        .then(() => this.$router.push({ name: 'users' }))
        .catch(alert));
    },
  },
  created() {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then((payload) => { this.payload = payload; })
        .catch(() => this.$router.go(-1));
    }
  },
};
</script>
