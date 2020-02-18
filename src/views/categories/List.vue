<template lang="pug">
    v-layout(row)
      v-flex(xs6)
        .border
          v-card-title
            .title {{ $t('all_categories') }}
          v-divider
          v-treeview(
            ref="tree"
            :items="items"
            @update:active="select"
            @update:open="select"
            activatable
            open-on-click
            selection-type="independent"
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
          )
      v-flex(xs6)
        item(:id="id")
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Item from './Item.vue';

export default {
  name: 'List',
  components: {
    Item,
  },
  data: () => ({
    id: null,
  }),
  computed: {
    ...mapState('category', ['items']),
  },
  methods: {
    ...mapActions('category', ['list']),
    select(items) {
      if (items.length) {
        [this.id] = items;
      } else {
        this.id = null;
      }
    },
  },
  watch: {
    items() {
      this.$set(this, 'id', null);
    },
  },
  created() {
    this.list();
  },
};
</script>
