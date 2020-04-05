<template lang="pug">
  v-layout(row wrap)
    //- v-flex(xs12 sm6 md4)
      client(:value="payload.client")
    v-flex(xs12 sm6 md4)
      .border
        v-card-title.py-2 {{ $t('order_details') }}
          v-spacer
          v-chip(:color="payload.status.color" label) {{ payload.status.name }}
        v-divider
        v-card-text.pa-4
          v-text-field(:label="$t('code')" :value="payload.unique_id" readonly)
          v-select(
            readonly
            v-model="payload.delivery"
            :label="$t('delivery')"
            :items="deliveryTypes"
            item-text="name" item-value="value"
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
            v-layout(row)
              .subtitle-1.mb-3 {{ $t('delivery') }}
              v-spacer
              v-chip(
                v-if="payload.status.id > 1"
                @click="deliver"
                :color="payload.order_delivery.delivered ? '#32CD32' : '#FFDF00'"
                label
              ) {{ $t(payload.order_delivery.delivered ? 'delivered' : 'not_delivered') }}

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
          br

          v-textarea(
            :label="$t('note')"
            v-model="payload.note"
            outlined
            hide-details
          )
          v-btn(
            v-if="payload.status.id <= 2"
            @click="save"
            :loading="loading"
            text block
          ) {{ $t('save') }}

        v-btn(
          @click="set('set_in_progress')"
          v-if="payload.amount && payload.status.id == 1"
          block tile color="blue"
          depressed dark large
        ) {{ $t('to_payment') }}

        v-btn(
          @click="set('set_completed')"
          v-if="canFinish"
          block tile color="blue"
          depressed dark large
        ) {{ $t('finish') }}

    v-flex(xs12 sm6 md8 v-if="payload.id")
      cart(:orderId="payload.id" :editable="payload.status.id == 1" @update="refresh")

    v-layout.px-5.pb-2(
      v-if="payload.status.id == 1 || payload.status.id == 2"
      row style="position: fixed; bottom: 0; right: 0;"
    )
      v-spacer
      v-flex(shrink)
        v-btn.ma-1(depressed color="red" fab dark @click="cancel")
          v-icon mdi-close
</template>
<script>
import { mapState, mapActions } from 'vuex';
// import Client from './components/Client.vue';
import Cart from './components/Cart.vue';

export default {
  name: 'Edit',
  components: {
    // Client,
    Cart,
  },
  data: () => ({
    payload: {
      id: null,
      amount: 0,
      status: {},
      order_delivery: null,
      client: {},
      note: '',
    },
  }),
  computed: {
    ...mapState('order', ['loading', 'deliveryTypes']),
    canFinish() {
      return this.payload.paid && this.payload.status.id === 2
        && (this.payload.delivery ? this.payload.order_delivery.delivered : true);
    },
  },
  methods: {
    ...mapActions('order', ['update', 'get', 'setStatus', 'completeDelivery', 'cancelDelivery']),
    refresh() {
      const { id } = this.$route.params;
      this.get(id).then((payload) => { this.payload = payload; });
    },
    save() {
      this.update({
        id: this.payload.id,
        client_id: this.payload.client_id,
        delivery: this.payload.delivery,
        ...(this.payload.delivery ? { full_name: this.payload.order_delivery.full_name } : {}),
        ...(this.payload.delivery ? { phone: this.payload.order_delivery.phone } : {}),
        ...(this.payload.delivery ? { address: this.payload.order_delivery.address } : {}),
        ...(this.payload.delivery ? { price: this.payload.order_delivery.price || 0 } : {}),
        note: this.payload.note,
      })
        .then(() => {
          this.refresh();
        });
    },
    set(status) {
      this.setStatus({
        id: this.payload.id,
        status,
      })
        .then(() => {
          this.refresh();
        });
    },
    deliver() {
      if (!this.payload.order_delivery.delivered) {
        this.completeDelivery(this.payload.id)
          .then(() => {
            this.refresh();
          });
      }
    },
    cancel() {
      this.$root.$emit('confirm', () => this
        .cancelDelivery(this.payload.id)
        .then(() => {
          this.get(this.payload.id).then((payload) => { this.payload = payload; });
        }));
    },
  },
  created() {
    const { id } = this.$route.params;
    this.get(id).then((payload) => { this.payload = payload; });
  },
};
</script>
