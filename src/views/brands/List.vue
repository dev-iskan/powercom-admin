<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      v-card.elevation-0.border
        v-card-title.py-2
          v-text-field(
            :label="$t('search')"
            @input="search"
            prepend-icon="mdi-magnify"
            dense solo flat hide-details
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
              td {{ (pagination.page - 1) * pagination.offset + index + 1 }}.
              td {{ item.name }}
              td {{ item.created_at }}
              td {{ item.updated_at }}
              td
                v-layout(row)
                  v-spacer
                  v-btn(icon :to="{ name: 'brands.edit', params: { id: item.id } }")
                    v-icon(small) mdi-pencil
                  v-btn(icon color='red' @click="remove(item.id)")
                    v-icon(small) mdi-delete
        v-divider
        .text-xs-center
          v-pagination(v-model="query.page" :length="pagination.length")
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1(text large tile :to="{ name: 'brands.create' }") {{ $t('add') }}
</template>
<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash.debounce';

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
        q: '',
        paginate: true,
        page: 1,
      },
    };
  },
  computed: {
    ...mapState('brand', ['loading', 'items', 'pagination']),
  },
  methods: {
    ...mapActions('brand', ['list', 'destroy']),
    remove(id) {
      this.$root.$emit('confirm', () => this.destroy({ id, params: this.query }));
    },
    // eslint-disable-next-line func-names
    search: debounce(function (q) {
      this.query.q = q;
    }, 500),
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
