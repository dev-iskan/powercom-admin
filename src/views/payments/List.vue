<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      .border
        v-card-title.py-2
          v-text-field(
            prepend-icon="mdi-magnify"
            dense solo flat hide-details
            :label="$t('search')"
          )
        v-divider
        v-data-table(
          :loading="loading"
          :items="items"
          :headers="headers"
          hide-default-footer
        )
          template(v-slot:item="{ item }")
            tr
              td
                router-link(:to="{ name: 'orders.edit', params: { id: item.order_id }}")
                  | {{ item.order.unique_id }}
              td
                router-link(:to="{ name: 'users.edit', params: { id: item.order.client_id }}")
                  | {{ item.order.client.name }} {{ item.order.client.surname }}
                  | {{ item.order.client.patronymic }}
                  br
                  | +{{ item.order.client.phone }}
              td {{ paymentMethods[item.payment_method] }}
              td {{ item.amount | numeric }} {{ $t('currency') }}
              td {{ item.paid_time }}
              td
                v-chip(label :color="getStatus(item.order.order_status_id).color")
                  | {{ getStatus(item.order.order_status_id).name }}
        v-divider
        .text-xs-center
          v-pagination(v-model="query.page" :length="pagination.length")
        v-divider
        v-layout(row)
          v-spacer
          item(@update="list(query)")
</template>
<script>
import { mapState, mapGetters, mapActions } from 'vuex';
import Item from './components/Item.vue';

export default {
  name: 'List',
  components: {
    Item,
  },
  data() {
    return {
      headers: [
        {
          text: this.$t('code'),
          value: 'code',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('client'),
          value: 'client.name',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('payment_method'),
          value: 'payment_method',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('sum'),
          value: 'amount',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('paid_time'),
          value: 'paid_time',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('status'),
          value: 'order.status',
          align: 'left',
          sortable: true,
        },
      ],
      query: {
        paginate: true,
        page: 1,
      },
    };
  },
  computed: {
    ...mapState('payment', ['loading', 'items', 'pagination']),
    ...mapState('global', ['paymentMethods']),
    ...mapGetters('global', ['getStatus']),
  },
  methods: {
    ...mapActions('payment', ['list']),
  },
  watch: {
    query: {
      deep: true,
      handler(value) {
        this.list(value);
      },
    },
  },
  created() {
    this.list(this.query);
  },
};
</script>
