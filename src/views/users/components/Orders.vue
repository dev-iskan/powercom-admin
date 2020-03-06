<template lang="pug">
  v-card.border.elevation-0
    v-card-title {{ $t('orders') }}
    v-divider
    v-card-text.pa-0
      v-data-table(
        :items="items"
        :headers="headers"
        :loading="loading"
        clickable
        hide-default-footer
      )
        template(v-slot:item="{ item }")
          tr(
            @click="$router.push({ name: 'orders.edit', params: { id: item.id } })"
            style="cursor: pointer;"
          )
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
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Orders',
  params: {
    clientId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
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
    };
  },
  computed: {
    ...mapState('order', ['loading']),
  },
  methods: {
    ...mapActions('order', ['list']),
  },
  created() {
    this.list({ client_id: this.clientId }).then((items) => { this.items = items; });
  },
};
</script>
