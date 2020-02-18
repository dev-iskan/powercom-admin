<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      v-card.border.elevation-0
        v-card-title.py-0.px-0
          v-btn(text :to="{ name: 'brands' }" color="#444" large tile)
            v-icon(small) mdi-keyboard-backspace
            .ml-2 {{ $t('brands') }}
          v-spacer
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
          v-text-field(v-model="payload.name" :label="$t('name')")
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Item',
  data: () => ({
    payload: {
      id: null,
      name: '',
    },
  }),
  computed: {
    ...mapState('brand', ['loading']),
  },
  methods: {
    ...mapActions('brand', ['store', 'update', 'destroy', 'get']),
    submit() {
      if (this.payload.id) {
        this.update(this.payload).then(() => this.$router.push({ name: 'brands' }));
      } else {
        this.store(this.payload).then(() => this.$router.push({ name: 'brands' }));
      }
    },
    remove() {
      this.$root.$emit('confirm', () => this.destroy(this.payload.id)
        .then(() => this.$router.push({ name: 'brands' }))
        .catch(alert));
    },
  },
  created() {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
        .then((payload) => { this.payload = payload; })
        .catch(() => this.$router.go(-1));
    }
  },
};
</script>
