<template lang="pug">
  v-layout(row wrap)
    template(v-for="(card, index) in cards")
      v-flex(xs12 v-if="card.subheader" :key="index")
        v-subheader.text-capitalize {{ card.subheader }}
      v-flex(xs12 v-else sm6 md3 :key="index")
        v-list-item(v-ripple :to="card.to").border.py-3
          v-list-item-avatar(tile)
            v-icon(large) {{ card.icon }}
          v-list-item-content
            v-list-item-title.text-capitalize.body-2 {{ card.text }}
            v-list-item-subtitle {{ card.count }}
          v-list-item-action
            v-icon(small) mdi-open-in-new
</template>
<script>
export default {
  name: 'Statistics',
  created() {
    const actions = ['order', 'product', 'article', 'user', 'category', 'brand', 'payment'];
    actions.forEach((action) => {
      this.$store.dispatch(`${action}/list`, { paginate: true });
    });
  },
  computed: {
    cards() {
      return [
        {
          subheader: this.$t('basics'),
        },
        {
          icon: 'mdi-shopping',
          text: this.$t('orders'),
          count: this.$store.state.order.pagination.total,
          to: { name: 'orders' },
        },
        {
          icon: 'mdi-credit-card',
          text: this.$t('payments'),
          to: { name: 'payments' },
          count: this.$store.state.payment.pagination.total,
        },
        {
          icon: 'mdi-card-bulleted',
          text: this.$t('products'),
          to: { name: 'products' },
          count: this.$store.state.product.pagination.total,
        },
        {
          icon: 'mdi-contacts',
          text: this.$t('users'),
          to: { name: 'users' },
          count: this.$store.state.user.pagination.total,
        },
        {
          subheader: this.$t('additional'),
        },
        {
          icon: 'mdi-newspaper',
          text: this.$t('news'),
          to: { name: 'articles' },
          count: this.$store.state.article.pagination.total,
        },
        {
          icon: 'mdi-notebook',
          text: this.$t('categories'),
          to: { name: 'categories' },
          count: this.$store.state.category.items.length,
        },
        {
          icon: 'mdi-star-box',
          text: this.$t('brands'),
          to: { name: 'brands' },
          count: this.$store.state.brand.pagination.total,
        },
      ];
    },
  },
};
</script>
