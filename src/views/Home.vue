<template lang="pug">
  div
    v-navigation-drawer(v-model="drawer" fixed clipped app width="300")
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
        icon: 'mdi-newspaper',
        text: 'news',
      },
      {
        icon: 'mdi-book-open',
        text: 'news_categories',
      },
      {
        icon: 'mdi-contacts',
        text: 'users',
      },
      {
        icon: 'mdi-account-card-details',
        text: 'roles',
      },
      {
        icon: 'mdi-shopping',
        text: 'trading_space',
      },
      {
        icon: 'mdi-folder-table',
        text: 'trading_categories',
      },
      {
        icon: 'mdi-headset',
        text: 'consultants',
      },
      {
        icon: 'mdi-headphones-settings',
        text: 'consultants_categories',
      },
      {
        icon: 'mdi-library-video',
        text: 'videos',
      },
      {
        icon: 'mdi-file-settings',
        text: 'assets',
      },
      {
        icon: 'mdi-card-bulleted',
        text: 'ads',
      },
      {
        icon: 'mdi-map',
        text: 'regions',
      },
      {
        icon: 'mdi-settings',
        text: 'settings',
      },
      {
        divider: true,
        icon: 'mdi-logout-variant',
        text: 'logout',
        to: { name: 'login' },
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
