<template lang="pug">
  div
    v-autocomplete(
        :value="value"
        @change="(e) => $emit('input', e)"
        :label="$t('client')"
        :items="namesWithIds"
        item-text="name"
        item-value="id"
        clearable
    )
      template(v-slot:no-data)
        v-list-item(@click="dialog=true")
          v-list-item-title {{ $t('add') }}
    v-dialog(v-model="dialog" persistent max-width="400")
      v-card
        v-card-title
          .title {{ $t('client.create') }}
          v-spacer
          v-btn(icon @click="dialog=false")
            v-icon mdi-close
        v-divider
        v-card-text.pa-6
          v-text-field(:label="$t('name')" v-model="payload.name")
          v-text-field(:label="$t('surname')" v-model="payload.surname")
          v-text-field(:label="$t('patronymic')" v-model="payload.patronymic")
          v-text-field(:label="$t('phone')" prefix="+" v-model="payload.phone")
          v-text-field(:label="$t('email')" v-model="payload.email")
          v-alert(v-if="error" type="error" dismissible outlined) {{ error }}
        v-card-actions.pa-0
          v-btn.ma-0(
            :loading="loading"
            @click="submit"
            color="blue"
            block tile dark x-large
          ) {{ $t('add') }}
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  name: 'SearchClient',
  props: {
    value: {
      required: true,
    },
  },
  data: () => ({
    dialog: false,
    error: '',
    payload: {
      name: '',
      surname: '',
      patronymic: '',
      phone: '998',
      email: '',
    },
  }),
  computed: {
    ...mapState('client', ['loading', 'items']),
    ...mapGetters('client', ['namesWithIds']),
  },
  methods: {
    ...mapActions('client', ['list', 'store']),
    submit() {
      this.error = '';
      this.store(this.payload)
        .then((client) => {
          this.$emit('input', client.id);
          this.dialog = false;
        })
        .catch((error) => {
          this.error = error;
          if (error.response && error.response.data && error.response.data.errors) {
            this.error = Object.values(error.response.data.errors)
              .map((value) => value[0]).join('\n');
          }
        });
    },
  },
  created() {
    this.list();
  },
};
</script>
