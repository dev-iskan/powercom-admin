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
// import { mapState } from 'vuex';

export default {
  name: 'Statistics',
  computed: {
    // ...mapState('category', { categories: 'pagination' }),
    // ...mapState('brand', { brands: 'pagination' }),
    // ...mapState('manufacturer', { manufacturers: 'pagination' }),
    // ...mapState('purpose', { purposes: 'pagination' }),
    // ...mapState('tag', { tags: 'pagination' }),
    // ...mapState('article', { articles: 'pagination' }),
    // ...mapState('product', { products: 'pagination' }),
    // ...mapState('status', { statuses: 'pagination' }),
    // ...mapState('user', { users: 'pagination' }),
    // ...mapState('order', { orders: 'pagination' }),

    cards() {
      return [
        {
          subheader: this.$t('basics'),
        },
        {
          icon: 'mdi-newspaper',
          text: this.$t('news'),
          count: 0,
          // to: { name: 'categories' },
        },
        {
          icon: 'mdi-contacts',
          text: this.$t('users'),
          count: 0,
          // to: { name: 'products' },
        },
        {
          icon: 'mdi-shopping',
          text: this.$t('trading_space'),
          count: 0,
          // to: { name: 'orders' },
        },
        {
          icon: 'mdi-headset',
          text: this.$t('consultants'),
          count: 0,
          // to: { name: 'users' },
        },
        {
          icon: 'mdi-library-video',
          text: this.$t('videos'),
          count: 0,
          // to: { name: 'users' },
        },
        {
          icon: 'mdi-file-settings',
          text: this.$t('assets'),
          count: 0,
          // to: { name: 'users' },
        },
        {
          icon: 'mdi-card-bulleted',
          text: this.$t('ads'),
          count: 0,
          // to: { name: 'users' },
        },
        {
          icon: 'mdi-map',
          text: this.$t('regions'),
          count: 0,
          // to: { name: 'users' },
        },
        {
          subheader: this.$t('attributes'),
        },
        {
          icon: 'mdi-book-open',
          text: this.$t('news_categories'),
          count: 0,
          // to: { name: 'statuses' },
        },
        {
          icon: 'mdi-account-card-details',
          text: this.$t('roles'),
          count: 0,
          // to: { name: 'brands' },
        },
        {
          icon: 'mdi-folder-table',
          text: this.$t('trading_categories'),
          count: 0,
          // to: { name: 'manufacturers' },
        },
        {
          icon: 'mdi-headphones-settings',
          text: this.$t('consultants_categories'),
          count: 0,
          // to: { name: 'purposes' },
        },
      ];
    },
  },
  created() {
    // this.$store.dispatch('brand/list', { paginate: true });
    // this.$store.dispatch('category/list', { paginate: true });
    // this.$store.dispatch('manufacturer/list', { paginate: true });
    // this.$store.dispatch('purpose/list', { paginate: true });
    // this.$store.dispatch('tag/list', { paginate: true });
    // this.$store.dispatch('article/list', { paginate: true });
    // this.$store.dispatch('product/list', { paginate: true });
    // this.$store.dispatch('status/list', { paginate: true });
    // this.$store.dispatch('user/list', { paginate: true });
    // this.$store.dispatch('order/list', { paginate: true });
  },
};
</script>
