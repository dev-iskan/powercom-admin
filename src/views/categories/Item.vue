<template lang="pug">
  .border
    v-card-title
      .title(v-if="id") {{ $t('category.update') }}
      .title(v-else) {{ $t('category.create') }}
    v-divider
    v-progress-linear(v-if="loading" indeterminate)
    v-card-text
      v-text-field(
        v-model="payload.name"
        :label="$t('name')"
      )
      v-select(
        :items="[]"
        :label="$t('parent_category')"
      )
      v-textarea(
        v-model="payload.short_description"
        :label="$t('short_description')"
      )
    v-row(no-gutters)
      v-col
        v-btn(
          @click="submit"
          :loading="loading"
          block depressed tile
          dark large color="blue"
        ) {{ $t('save') }}
      v-col(v-if="id")
        v-btn(
          @click="remove"
          :loading="loading"
          block depressed tile
          dark large color="red"
        ) {{ $t('delete') }}
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'Item',
  props: ['id'],
  data: () => ({
    payload: {
      id: null,
      name: '',
      short_description: '',
    },
  }),
  computed: {
    ...mapState('category', ['loading']),
  },
  methods: {
    ...mapActions('category', ['destroy', 'store', 'update']),
    remove() {
      this.$root.$emit('confirm', () => this.destroy(this.id));
    },
    submit() {
      const action = this.id ? this.update(this.payload) : this.store(this.payload);
      action
        .then(() => {
          this.payload = {
            id: null,
            name: '',
            short_description: '',
          };
        })
        .catch(alert);
    },
  },
  watch: {
    id(value) {
      if (!value) {
        this.$set(this, 'payload', {
          id: null,
          name: '',
          short_description: '',
        });
      } else {
        // TODO: load an element
      }
    },
  },
};
</script>
