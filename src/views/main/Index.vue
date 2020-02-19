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

    cards() {
      return [
        {
          subheader: this.$t('basics'),
        },
        {
          icon: 'mdi-shopping',
          text: this.$t('orders'),
          count: 0,
        },
        {
          icon: 'mdi-card-bulleted',
          text: this.$t('products'),
          count: 0,
        },
        {
          icon: 'mdi-newspaper',
          text: this.$t('news'),
          to: { name: 'articles' },
          count: 0,
        },
        {
          icon: 'mdi-contacts',
          text: this.$t('users'),
          to: { name: 'users' },
          count: 0,
        },
        {
          subheader: this.$t('additional'),
        },
        {
          icon: 'mdi-home-currency-usd',
          text: this.$t('prices'),
          count: 0,
        },
        {
          icon: 'mdi-notebook',
          text: this.$t('categories'),
          to: { name: 'categories' },
          count: 0,
        },
        {
          icon: 'mdi-star-box',
          text: this.$t('brands'),
          to: { name: 'brands' },
          count: 0,
        },
        {
          icon: 'mdi-headset',
          text: this.$t('operators'),
          count: 0,
        },
      ];
    },
  },
  created() {
    // this.$store.dispatch('brand/list', { paginate: true });
  },
};
</script>
