<template lang="pug">
  v-layout(row wrap)
    v-flex(xs12)
      .border
        v-card-title.py-2
          v-text-field(
            :label="$t('search')"
            @input="search"
            prepend-icon="mdi-magnify"
            dense solo flat hide-details
          )
          v-spacer
          input(ref="fileInput" type="file" name="name" accept=".xls, .xlsx" style="display: none;")
          v-btn(:loading="loading" text tile @click="$refs.fileInput.click()") {{ $t('import') }}
            v-icon.ml-2(small) mdi-database-plus
          v-btn(:loading="loading" text tile @click="exportPrice") {{ $t('export') }}
            v-icon.ml-2(small) mdi-file-excel-outline
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
              td {{ item.price | numeric }} сум
              td {{ item.quantity | numeric }} шт.
              td {{ item.created_at }}
              td {{ item.updated_at }}
              td
                v-layout(row)
                  v-spacer
                  v-btn(icon :to="{ name: 'products.edit', params: { id: item.id } }")
                    v-icon(small) mdi-pencil
                  v-btn(icon color='red' @click="remove(item.id)")
                    v-icon(small) mdi-delete
        v-divider
        .text-xs-center
          v-pagination(v-model="query.page" :length="pagination.length")
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1(text large tile :to="{ name: 'products.create' }") {{ $t('add') }}
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
          text: this.$t('price'),
          value: 'price',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('quantity'),
          value: 'quantity',
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
    ...mapState('product', ['loading', 'items', 'pagination']),
  },
  methods: {
    ...mapActions('product', ['list', 'destroy', 'exportPrice', 'importPrice']),
    remove(id) {
      this.$root.$emit('confirm', () => this.destroy({ id, params: this.query }).catch(alert));
    },
    // eslint-disable-next-line func-names
    search: debounce(function (q) {
      this.query.q = q;
    }, 500),
  },
  watch: {
    query: {
      deep: true,
      handler({ q, page, paginate }) {
        this.list({ q, page, paginate });
        this.$router.push({ name: this.$route.name, query: { ...(q ? { q } : {}), page } });
      },
    },
  },
  created() {
    // parse route query
    const { query } = this.$route;
    this.query.q = query.q || '';
    this.query.page = parseInt(query.page, 10) || 1;

    // fetch
    this.list(this.query);

    // update route
    // this.$router.push({
    //   name: this.$route.name,
    //   query: {
    //     ...(this.query.q ? { q: this.query.q } : {}),
    //     page: this.query.page,
    //   },
    // });
  },
  mounted() {
    this.$refs.fileInput.addEventListener('change', () => {
      const files = Array.from(this.$refs.fileInput.files);
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('products', file);
        this.importPrice(formData)
          .then(() => this.list(this.query))
          .catch(alert);
      });
      this.$refs.fileInput.value = '';
    }, false);
  },
};
</script>
