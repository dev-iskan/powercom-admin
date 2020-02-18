<template lang="pug">
  v-layout(row)
    v-flex(xs12)
      v-card.border.elevation-0
        v-card-title.py-0.px-0
          v-btn(text :to="{ name: 'articles' }" color="#444" large tile)
            v-icon(small) mdi-keyboard-backspace
            .ml-2 {{ $t('articles') }}
          v-spacer
          v-checkbox.mt-0.mb-1.mr-4(
            v-model="payload.active"
            :label="$t('active')"
            hide-details
          )
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
          v-textarea(
            v-model="payload.short_description"
            :label="$t('short_description')"
          )
          editor(v-model="payload.description")
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Item',
  data: () => ({
    payload: {
      id: null,
      active: true,
      name: '',
      short_description: '',
      description: '',
    },
  }),
  computed: {
    ...mapState('article', ['loading']),
  },
  methods: {
    ...mapActions('article', ['store', 'update', 'destroy', 'get']),
    submit() {
      if (this.payload.id) {
        this.update(this.payload).then(() => this.$router.push({ name: 'articles' }));
      } else {
        this.store(this.payload).then(() => this.$router.push({ name: 'articles' }));
      }
    },
    remove() {
      this.$root.$emit('confirm', () => this
        .destroy({ id: this.payload.id, params: { paginate: true } })
        .then(() => this.$router.push({ name: 'articles' }))
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
