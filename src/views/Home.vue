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
    v-app-bar.elevation-0.border-bottom(fixed clipped-left app)
      v-app-bar-nav-icon(@click.stop="drawer = !drawer")
      v-toolbar-title.text-capitalize {{ $t($route.name) }}
    v-content
      v-container(fluid grid-list-md)
        router-view
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  data: () => ({
    drawer: true,
    items: [
      {
        icon: 'mdi-chart-donut',
        text: 'main',
        to: { name: 'main' },
      },
      {
        icon: 'mdi-shopping',
        text: 'orders',
      },
      {
        icon: 'mdi-card-bulleted',
        text: 'products',
      },
      {
        icon: 'mdi-newspaper',
        text: 'news',
      },
      {
        icon: 'mdi-contacts',
        text: 'users',
      },
      {
        icon: 'mdi-notebook',
        text: 'categories',
      },
      {
        icon: 'mdi-star-box',
        text: 'brands',
      },
      {
        icon: 'mdi-headset',
        text: 'operators',
      },
      {
        icon: 'mdi-home-currency-usd',
        text: 'prices',
      },
      {
        icon: 'mdi-settings',
        text: 'settings',
      },
      {
        divider: true,
        icon: 'mdi-logout-variant',
        text: 'logout',
        to: { name: 'logout' },
      },
    ],
  }),
  computed: {
    ...mapState('auth', ['user']),
  },
};
</script>
<style>
.border {
  background-color: white !important;
  border: 1px solid rgba(0, 0, 0, 0.12) !important
}
.border-bottom {
  background-color: white !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12) !important
}
</style>
