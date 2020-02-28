<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm6 md4)
      client(:value="payload.client")
    v-flex(xs12 sm6 md4)
      .border
        v-card-title.py-2 {{ $t('order_details') }}
          v-spacer
          v-chip(:color="payload.status.color" label) {{ payload.status.name }}
        v-divider
        v-card-text.pa-4
          v-text-field(:label="$t('code')" :value="payload.unique_id" readonly)
          v-text-field(
            :label="$t('delivery')"
            :value="$t(payload.delivery ? 'with_delivery' : 'without_delivery')"
            readonly
          )
          v-text-field(
            :value="payload.amount | numeric"
            :label="$t('sum')"
            :suffix="$t('currency')"
            readonly
          )
          v-text-field(
            v-if="payload.finished_at"
            v-model="payload.finished_at"
            :label="$t('finished_at')"
            readonly
          )
          div(v-if="payload.order_delivery")
            .subtitle-1.mb-3 {{ $t('delivery') }}
            v-text-field(
              :label="$t('full_name')"
              :value="payload.order_delivery.full_name"
              readonly
            )
            v-text-field(
              :label="$t('phone')"
              :value="payload.order_delivery.phone"
              readonly
            )
            v-text-field(
              :label="$t('address')"
              :value="payload.order_delivery.address"
              readonly
            )
            v-text-field(
              :label="$t('price')"
              :value="payload.order_delivery.price"
              :suffix="$t('currency')"
              readonly
            )
            v-chip(v-if="payload.order_delivery.delivered" label) {{ $t('delivered') }}
            v-chip.ml-2(
              v-if="payload.order_delivery.delivered_at"
              label
            ) {{ payload.order_delivery.delivered_at }}
        v-btn(block tile color="blue" depressed dark large) {{ $t('finish') }}
    v-flex(xs12 sm6 md4 v-if="payload.id")
      cart(:orderId="payload.id" @update="refresh")
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Client from './components/Client.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'Edit',
  components: {
    Client,
    Cart,
  },
  data: () => ({
    payload: {
      id: null,
      status: {},
      order_delivery: null,
      client: {},
    },
  }),
  computed: {
    ...mapState('order', ['loading']),
  },
  methods: {
    ...mapActions('order', ['get']),
    refresh() {
      const { id } = this.$route.params;
      this.get(id)
        .then((payload) => { this.payload = payload; })
        .catch(alert);
    },
  },
  created() {
    const { id } = this.$route.params;
    this.get(id)
      .then((payload) => { this.payload = payload; })
      .catch(alert);
  },
};
</script>
