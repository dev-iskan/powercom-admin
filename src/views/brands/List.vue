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
          v-pagination
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1(text tile :to="{ name: 'brands.create' }") {{ $t('add') }}
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
    };
  },
  computed: {
    ...mapState('brand', ['loading', 'items']),
  },
  methods: {
    ...mapActions('brand', ['list', 'destroy']),
    remove(id) {
      this.$root.$emit('confirm', () => this.destroy(id).catch(alert));
    },
  },
  created() {
    this.list();
  },
};
</script>
