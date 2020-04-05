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
            v-if="payload.id"
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
              v-text-field(v-model="payload.phone" :label="$t('phone')")
              v-text-field(v-model="payload.email" :label="$t('email')")
              v-text-field(v-model="payload.password" :label="$t('password')")
            v-flex(xs12 sm6)
              div(v-if="payload.id")
                .subtitle-1 {{ $t('role') }}
                v-checkbox.ml-2.mt-2(
                  :disabled="loading"
                  :label="$t('admin')"
                  v-model="!!payload.admin"
                  @click.stop="change('admin')"
                  hide-details
                )
                v-checkbox.ml-2.mt-2(
                  :disabled="loading"
                  :label="$t('operator')"
                  v-model="!!payload.operator"
                  @click.stop="change('operator')"
                  hide-details
                )
                v-checkbox.ml-2.mt-2(
                  :label="$t('client')"
                  v-model="!!payload.client"
                  disabled hide-details
                )
    v-flex(xs12 v-if="payload.client")
      orders(:clientId="payload.client.id")
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Orders from './components/Orders.vue';

export default {
  name: 'Item',
  components: {
    Orders,
  },
  data: () => ({
    payload: {
      id: null,
      name: '',
      phone: '',
      email: '',
      password: '',
      admin: {},
      operator: {},
      client: {},
    },
  }),
  computed: {
    ...mapState('user', ['loading']),
  },
  methods: {
    ...mapActions('user', ['store', 'update', 'destroy', 'get', 'toggle']),
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
        .then(() => this.$router.push({ name: 'users' })));
    },
    change(key) {
      this.toggle({ id: this.payload.id, key })
        .then(() => {
          this.get(this.$route.params.id)
            .then((payload) => this.$set(this, 'payload', payload))
            .catch(() => this.$router.go(-1));
        });
    },
  },
  created() {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then((payload) => this.$set(this, 'payload', payload))
        .catch(() => this.$router.go(-1));
    }
  },
};
</script>
