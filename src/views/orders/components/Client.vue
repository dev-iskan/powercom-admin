<template lang="pug">
  .border
    v-card-title.py-2 {{ $t('client') }}
    v-divider
    v-card-text.pa-4
      v-text-field(:label="$t('name')" v-model="value.name" readonly)
      v-text-field(:label="$t('surname')" v-model="value.surname" readonly)
      v-text-field(:label="$t('patronymic')" v-model="value.patronymic" readonly)
      v-text-field(:label="$t('phone')" v-model="value.phone" readonly)
      v-text-field(:label="$t('email')" v-model="value.email" readonly)
</template>
<script>
export default {
  name: 'Client',
  props: {
    value: {
      type: Object,
      required: true,
    },
  },
};
</script>
