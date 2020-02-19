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
            tr
              td {{ index + 1 }}.
              td {{ item.name }}
              td +{{ item.phone }}
              td {{ item.email }}
              td {{ item.created_at }}
              td {{ item.updated_at }}
              td
                v-layout(row)
                  v-spacer
                  v-btn(icon :to="{ name: 'users.edit', params: { id: item.id } }")
                    v-icon(small) mdi-pencil
                  v-btn(icon color='red' @click="remove(item.id)")
                    v-icon(small) mdi-delete
        v-divider
        .text-xs-center
          v-pagination(v-model="query.page" :length="pagination.length")
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1(text tile :to="{ name: 'users.create' }") {{ $t('add') }}
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'List',
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          width: 1,
        },
        {
          text: this.$t('name'),
          value: 'name',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('phone'),
          value: 'phone',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('email'),
          value: 'email',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('created_at'),
          value: 'created_at',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('updated_at'),
          value: 'updated_at',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('actions'),
          value: 'actions',
          align: 'right',
          sortable: false,
          width: 0,
        },
      ],
      query: {
        paginate: true,
        page: 1,
      },
    };
  },
  computed: {
    ...mapState('user', ['loading', 'items', 'pagination']),
  },
  methods: {
    ...mapActions('user', ['list', 'destroy']),
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
