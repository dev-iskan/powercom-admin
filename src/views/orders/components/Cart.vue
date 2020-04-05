<template lang="pug">
  v-card.elevation-0.border
    v-card-title.py-2 {{ $t('waybill') }}
    v-divider
    v-card-text.pa-0
      v-data-table(
        :items="items"
        :headers="headers"
        :loading="loading"
        hide-default-footer
      )
        template(v-slot:item="{ item, index }")
          tr
            td {{ index + 1 }}.
            td {{ item.product.name }}
            td {{ item.quantity | numeric }}
            td {{ item.price | numeric }} {{ $t('currency') }}
            td {{ item.price * item.quantity | numeric}} {{ $t('currency') }}
            td
              v-layout(row)
                v-spacer
                v-btn(icon :disabled="!editable" color="red" @click="remove(item.id)")
                  v-icon(small) mdi-close
    v-divider(v-if="editable")
    v-layout(row v-if="editable")
      v-flex
        v-autocomplete(
          v-model="product"
          :items="products"
          :placeholder="$t('search')"
          @update:search-input="search"
          item-text="name"
          item-value="id"
          solo flat
          hide-details
          clearable
          return-object
        )
      v-flex
        v-text-field(
          v-model="quantity"
          type="number"
          solo flat
          hide-details
          :placeholder="$t('quantity')"
        )
      v-flex.pt-0.pb-1(shrink)
        v-btn(
          @click="add"
          :loading="loading"
          :disabled="!product || parseInt(quantity) < 1"
          text tile style="height: 100%"
        ) {{ $t('add') }}
</template>
<script>
import { mapState, mapActions } from 'vuex';
import debounce from 'lodash.debounce';

export default {
  name: 'Cart',
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('name'),
          value: 'product.name',
          align: 'left',
          sortable: true,
        },
        {
          text: this.$t('quantity'),
          value: 'quantity',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('price'),
          value: 'price',
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('sum'),
          align: 'left',
          sortable: false,
        },
        {
          text: this.$t('actions'),
          align: 'right',
          sortable: false,
        },
      ],

      product: null,
      quantity: 0,
    };
  },
  props: {
    orderId: {
      type: Number,
      required: true,
    },
    editable: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState('product', { products: 'items' }),
    ...mapState('item', ['items', 'loading']),
  },
  methods: {
    ...mapActions('product', ['list']),
    ...mapActions('item', ['store', 'destroy']),
    ...mapActions('item', { refresh: 'list' }),

    // eslint-disable-next-line func-names
    search: debounce(function (q) {
      if (q && !this.product) { this.list({ q, paginate: true }); }
    }, 500),

    add() {
      this.store({
        order_id: this.orderId,
        product_id: this.product.id,
        quantity: this.quantity,
        price: this.product.price,
      })
        .then(() => {
          this.refresh({ order_id: this.orderId });
          this.$emit('update');
          this.product = null;
          this.quantity = 0;
        });
    },

    remove(id) {
      this.destroy(id)
        .then(() => {
          this.refresh({ order_id: this.orderId });
          this.$emit('update');
        });
    },
  },
  created() {
    this.refresh({ order_id: this.orderId });
  },
};
</script>
