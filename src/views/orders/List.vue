<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      .border
        v-card-title.pa-2
          v-spacer
          v-text-field.ma-0(
            single-line
            dense
            hide-details
            :label="$t('search')"
            style="max-width: 300px"
          )
        v-divider
        v-data-table(
          :loading="loading"
          :items="items"
          :headers="headers"
          hide-default-footer
        )
          template(v-slot:item="{ item, index }")
            tr(
              @click="$router.push({ name: 'orders.edit', params: { id: item.id } })"
              style="cursor: pointer"
            )
              td {{ item.unique_id }}
              td {{ item.client.name }} {{ item.client.surname }} {{ item.client.patronymic }}
                br
                | +{{ item.client.phone }}
              td {{ item.amount }}
              td
                v-chip(:color="item.status.color" label) {{ item.status.name }}
              td {{ $t(item.delivery ? 'with_delivery' : 'without_delivery') }}
              td {{ item.created_at }}
              td {{ item.updated_at }}
        v-divider
        .text-xs-center
          v-pagination(v-model="query.page" :length="pagination.length")
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1(text tile :to="{ name: 'orders.create' }") {{ $t('add') }}
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'List',
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
          text: this.$t('sum'),
          value: 'amount',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('status'),
          value: 'order_status_id',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('delivery'),
          value: 'delivery',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('created_at'),
          value: 'created_at',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('updated_at'),
          value: 'updated_at',
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
    ...mapState('order', ['loading', 'items', 'pagination']),
  },
  methods: {
    ...mapActions('order', ['list', 'destroy']),
    remove(id) {
      this.$root.$emit('confirm', () => this.destroy({ id, params: this.query }).catch(alert));
    },
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
