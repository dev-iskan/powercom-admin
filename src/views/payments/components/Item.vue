<template lang="pug">
  v-dialog(v-model="dialog" persistent max-width="600")
    template(v-slot:activator="{ on }")
      v-btn.mr-1(text large tile v-on="on") {{ $t('add') }}
    v-card
      v-card-title
        .title {{ $t('payments.create') }}
        v-spacer
        v-btn(icon @click="dialog=false")
          v-icon mdi-close
      v-divider
      v-card-text.pa-0
        div(v-if="!payload.order_id")
          v-text-field.ma-4(
              @input="search"
              append-icon="mdi-magnify"
              dense solo flat hide-details
              :label="$t('search')"
            )
          v-divider
          v-data-table(
            v-if="items.length"
            :items="items"
            :headers="headers"
            height="400px"
            clickable
            hide-default-footer
          )
            template(v-slot:item="{ item }")
              tr(@click="select(item)" style="cursor: pointer;")
                td {{ item.unique_id }}
                td {{ item.client.name }} {{ item.client.surname }} {{ item.client.patronymic }}
                  br
                  | {{ item.client.phone }}
                td {{ item.amount | numeric }} {{ $t('currency') }}
                td
                  v-chip(:color="item.paid ? '#32CD32' : '#FFDF00'" label)
                    | {{ $t(item.paid ? 'paid' : 'not_paid' ) }}
                td
                  v-chip(:color="item.status.color" label) {{ item.status.name }}
                td {{ $t(item.delivery ? 'with_delivery' : 'without_delivery') }}
        .pa-4(v-else)
          v-layout.px-3.mb-3(row)
            v-flex(extend)
              .caption {{ $t('code') }}
              .title {{ payload.unique_id }}
            v-flex(shrink)
              v-btn(icon color="red" @click="payload.order_id=null")
                v-icon mdi-close
          v-text-field(:label="$t('sum')" v-model="payload.amount" type="number")
          v-select(
            v-model="payload.payment_method"
            :label="$t('payment_method')"
            :items="getPaymentMethods"
            item-text="name"
            item-value="value"
          )
      v-card-actions.pa-0
          v-btn.ma-0(
            v-if="payload.order_id"
            :loading="loading"
            @click="submit"
            color="blue"
            block tile dark x-large
          ) {{ $t('finish') }}
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import debounce from 'lodash.debounce';

export default {
  name: 'Item',
  data() {
    return {
      dialog: false,
      items: [],
      headers: [
        {
          text: this.$t('code'),
          value: 'code',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('client'),
          value: 'client.name',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('sum'),
          value: 'amount',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('paid'),
          value: 'paid',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('status'),
          value: 'order_status_id',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('delivery'),
          value: 'delivery',
          align: 'left',
          sortable: false,
        },
      ],
      payload: {
        unique_id: '',
        order_id: null,
        payment_method: '',
        amount: '',
      },
    };
  },
  computed: {
    ...mapState('payment', ['loading']),
    ...mapGetters('global', ['getPaymentMethods']),
  },
  methods: {
    ...mapActions('order', ['list']),
    ...mapActions('payment', ['store']),
    // eslint-disable-next-line func-names
    search: debounce(function (q) {
      if (q) {
        this.list({ q, status_id: 2 }).then((items) => {
          this.items = items;
        });
      } else {
        this.items = [];
      }
    }, 500),
    select(item) {
      this.payload.unique_id = item.unique_id;
      this.payload.order_id = item.id;
      this.payload.amount = item.amount;
      this.items = [];
    },
    submit() {
      this.store(this.payload)
        .then(() => {
          this.$emit('update');
          this.dialog = false;
          this.payload.order_id = null;
        });
    },
  },
};
</script>
