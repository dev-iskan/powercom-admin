<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12 sm6 md4)
      .border
        v-card-title.py-2 {{ $t('client') }}
        v-divider
        v-card-text.pa-4
          v-text-field(:label="$t('name')" v-model="payload.client.name" readonly)
          v-text-field(:label="$t('surname')" v-model="payload.client.surname" readonly)
          v-text-field(:label="$t('patronymic')" v-model="payload.client.patronymic" readonly)
          v-text-field(:label="$t('phone')" v-model="payload.client.phone" readonly)
          v-text-field(:label="$t('email')" v-model="payload.client.email" readonly)

    v-flex(xs12 sm6 md4)
      .border
        v-card-title.py-2 {{ $t('order_details') }}
        v-divider
        v-card-text.pa-4
          v-text-field(:label="$t('code')" :value="payload.unique_id" readonly)
          v-text-field(
            :label="$t('delivery')"
            :value="$t(payload.delivery ? 'with_delivery' : 'without_delivery')"
            readonly
          )
          v-text-field(
            :value="payload.amount"
            :label="$t('sum')"
            :suffix="$t('currency')"
            readonly
          )
          v-text-field(
            :value="payload.status.name"
            :label="$t('status')"
            readonly
          )
          v-text-field(
            v-model="payload.finished_at || '-'"
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

    v-flex(xs12 sm6 md4)
      .border
        v-card-title.py-2 {{ $t('cart') }}
        v-divider
        v-card-text.pa-4

</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Edit',
  data: () => ({
    payload: {
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
  },
  created() {
    const { id } = this.$route.params;
    this.get(id)
      .then((payload) => { this.payload = payload; })
      .catch(alert);
  },
};
</script>
