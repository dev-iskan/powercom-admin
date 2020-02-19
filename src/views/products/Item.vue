<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      v-card.border.elevation-0
        v-card-title.py-0.px-0
          v-btn(text :to="{ name: 'products' }" color="#444" large tile)
            v-icon(small) mdi-keyboard-backspace
            .ml-2 {{ $t('products') }}
          v-spacer
          v-checkbox.mt-0.mb-1.mr-4(
            v-model="payload.active"
            :label="$t('active')"
            hide-details
          )
          v-btn(
            @click="submit"
            :loading="loading"
            text color="#444" large tile
          )
            v-icon(small) mdi-content-save
            .ml-2 {{ $t('save') }}
          v-btn(
            @click="remove"
            :loading="loading"
            text color="red" large tile
          )
            v-icon(small) mdi-delete
            .ml-2 {{ $t('delete') }}
        v-divider
        v-card-text
          v-layout(row)
            v-flex.pa-3(xs12 sm6)
              v-text-field(v-model="payload.name" :label="$t('firstname')")
              v-text-field(v-model="payload.price" :label="$t('price')")
              v-text-field(v-model="payload.quantity" :label="$t('quantity')")
              v-select(
                v-model="payload.brand"
                :label="$t('brand')"
                :items="brands"
                item-text="name"
                item-value="name"
              )
              v-select(
                v-model="payload.categories"
                :label="$t('categories')"
                :items="categories"
                item-text="name"
                item-value="name"
                multiple
              )
              v-textarea(v-model="payload.short_description" :label="$t('short_description')")
            v-flex.pa-3(xs12 sm6)
              .subtitle {{ $t('description') }}
              editor(v-model="payload.description")
            v-flex.pa-3(xs12)
              images(v-if="payload.id" resource="products" :id="payload.id")
</template>
<script>
/* eslint-disable no-param-reassign */
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Item',
  data: () => ({
    brands: [],
    categories: [],
    payload: {
      id: null,
      name: '',
      short_description: '',
      description: '',
      price: 0,
      quantity: 0,
      active: true,
      order: '',
      brand: '',
      categories: [],
    },
  }),
  computed: {
    ...mapState('product', ['loading']),
  },
  methods: {
    ...mapActions('product', ['store', 'update', 'destroy', 'get']),
    ...mapActions('brand', { listBrands: 'list' }),
    ...mapActions('category', { listCategories: 'list' }),
    submit() {
      if (this.payload.id) {
        this.update(this.payload).then(() => this.$router.push({ name: 'products' }));
      } else {
        this.store(this.payload).then(() => this.$router.push({ name: 'products' }));
      }
    },
    remove() {
      this.$root.$emit('confirm', () => this
        .destroy({ id: this.payload.id, params: { paginate: true } })
        .then(() => this.$router.push({ name: 'products' }))
        .catch(alert));
    },
  },
  created() {
    this.listCategories().then((categories) => { this.categories = categories; });
    this.listBrands().then((brands) => { this.brands = brands; });
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then((payload) => {
          if (payload.brand) {
            payload.brand = payload.brand.name;
          }
          if (payload.categories && payload.categories.length) {
            payload.categories = payload.categories.map((item) => item.name);
          }
          this.payload = payload;
        })
        .catch(() => this.$router.go(-1));
    }
  },
};
</script>
