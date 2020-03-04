<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" fixed clipped app)
      v-list.py-0(dense)
        template(v-for="(item, index) in items")
          div
            v-divider(v-if="item.divider")
            v-list-group(v-if="item.items" :key="index" no-action :prepend-icon="item.icon")
              template(v-slot:activator)
                v-list-item
                  v-list-item-content
                    v-list-item-title.text-capitalize {{ $t(item.text) }}
              template(v-for="(child, position) in item.items")
                v-list-item.white(v-ripple :key="position" :to="{name:'home'}")
                  v-list-item-action
                v-icon(medium) {{ item.icon }}
                  v-list-item-content
                    v-list-item-title.text-capitalize {{ $t(child.text) }}
            v-list-item(v-else v-ripple :key="index" :to="item.to")
              v-list-item-action
                v-icon(medium) {{ item.icon }}
              v-list-item-content
                v-list-item-title.text-capitalize.grey--text.text--darken-3 {{ $t(item.text) }}
              v-list-item-action(v-if="item.count")
                v-badge.mt-3(dark :content="item.count")
    v-app-bar.elevation-0.border-bottom(fixed clipped-left app)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title.text-capitalize {{ $t($route.name) }}
    v-content
      v-container(fluid grid-list-md)
        router-view
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    drawer: true,
    task: null,
  }),
  computed: {
    ...mapState('auth', ['user']),
    items() {
      return [
        {
          icon: 'mdi-chart-donut',
          text: 'main',
          to: { name: 'main' },
        },
        {
          icon: 'mdi-shopping',
          text: 'orders',
          to: { name: 'orders' },
          count: this.$store.state.global.total,
        },
        {
          icon: 'mdi-credit-card',
          text: 'payments',
          to: { name: 'payments' },
        },
        {
          icon: 'mdi-card-bulleted',
          text: 'products',
          to: { name: 'products' },
        },
        {
          icon: 'mdi-notebook',
          text: 'categories',
          to: { name: 'categories' },
        },
        {
          icon: 'mdi-star-box',
          text: 'brands',
          to: { name: 'brands' },
        },
        {
          icon: 'mdi-newspaper',
          text: 'news',
          to: { name: 'articles' },
        },
        {
          icon: 'mdi-contacts',
          text: 'users',
          to: { name: 'users' },
        },
        {
          divider: true,
          icon: 'mdi-logout-variant',
          text: 'logout',
          to: { name: 'logout' },
        },
      ];
    },
  },
  methods: {
    ...mapActions('global', ['app']),
  },
  created() {
    this.task = setInterval(() => this.app(), 10000);
  },
  beforeDestroy() {
    clearInterval(this.task);
  },
};
</script>
