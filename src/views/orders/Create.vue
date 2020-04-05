<template lang="pug">
  v-layout(row wrap)
    v-flex
      v-card.border.elevation-0
        v-card-title.py-0.px-0
          v-btn(text :to="{ name: 'orders' }" color="#444" large tile)
            v-icon(small) mdi-keyboard-backspace
            .ml-2 {{ $t('orders') }}
          v-spacer
          v-btn(
            @click="submit"
            :loading="loading"
            text color="#444" large tile
          )
            v-icon(small) mdi-content-save
            .ml-2 {{ $t('save') }}
        v-divider
        v-card-text
          v-layout(row)
            v-flex.pa-3(xs12)
              search-client(v-model="payload.client_id")
              v-select(
                v-model="payload.delivery"
                :label="$t('delivery')"
                :items="deliveryTypes"
                item-text="name" item-value="value"
              )
              v-text-field(v-model="payload.full_name" :label="$t('full_name')")
              v-text-field(v-model="payload.phone" :label="$t('phone')")
              v-text-field(v-model="payload.address" :label="$t('address')")
</template>
<script>
/* eslint-disable no-param-reassign */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Create',
  data: () => ({
    payload: {
      client_id: null,
      delivery: true,
      full_name: '',
      phone: '',
      address: '-',
      price: 0,
    },
  }),
  computed: {
    ...mapState('order', ['loading', 'deliveryTypes']),
  },
  methods: {
    ...mapActions('client', ['get']),
    ...mapActions('order', ['store']),
    submit() {
      this.store(this.payload)
        .then((order) => {
          this.$router.push({ name: 'orders.edit', params: { id: order.id } });
        });
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'payload.client_id': function (id) {
      if (id) {
        this.get(id).then((client) => {
          this.payload.full_name = `${client.name} ${client.surname} ${client.patronymic}`;
          this.payload.phone = client.phone;
        });
      } else {
        this.payload.full_name = '';
        this.payload.phone = '';
      }
    },
  },
};
</script>
