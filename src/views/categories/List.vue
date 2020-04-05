<template lang="pug">
    v-layout(row)
      v-flex(xs6)
        v-card.elevation-0.border
          v-card-title
            .title {{ $t('all_categories') }}
          v-divider
          v-treeview(
            ref="tree"
            :items="items"
            hoverable
            expand-icon="mdi-chevron-down"
            on-icon="mdi-bookmark"
            off-icon="mdi-bookmark-outline"
          )
            template(v-slot:append="{ item }")
              v-btn(icon @click="select(item.id)")
                v-icon(small) {{ item.id == id ? 'mdi-close' : 'mdi-pencil' }}
      v-flex(xs6)
        item(:id="id")
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
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
    ...mapGetters('category', { items: 'hierarchy' }),
  },
  methods: {
    ...mapActions('category', ['list']),
    select(id) {
      this.id = this.id === id ? null : id;
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
