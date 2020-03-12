<template lang="pug">
  v-layout(row wrap)
    v-flex(shrink v-for="(image, index) in images" :key="index")
      v-img.border.text-sm-right(
        :src="`${image.url}`"
        width="192" height="192" contain
      )
        v-btn.ma-1(icon small outlined color="red" @click="remove(image.id)")
          v-icon(small) mdi-delete
    v-flex(shrink)
      v-btn.ma-0.upload(
        outlined color="#7f7f7f"
        :loading="loading"
        @click="$refs.fileInput.click()")
        v-icon mdi-image-plus
        .ml-2 {{ $t('add') }}
    input(ref="fileInput" type="file" name="name" accept=".jpg, .png, .jpeg" style="display: none;")
</template>
<script>
import image from '@/api/image';

export default {
  name: 'Images',
  props: {
    id: {
      type: Number,
      required: true,
    },
    resource: {
      type: String,
      required: true,
      validator: (value) => ['articles', 'products', 'brands'].indexOf(value) !== -1,
    },
  },
  data: () => ({
    loading: false,
    images: [],
  }),
  methods: {
    list() {
      image.list(this.resource, this.id).then(({ data }) => { this.images = data; });
    },
    remove(id) {
      image.destroy(id).then(() => this.list());
    },
  },
  created() {
    this.list();
  },
  mounted() {
    this.$refs.fileInput.addEventListener('change', () => {
      const files = Array.from(this.$refs.fileInput.files);
      files.forEach((file) => {
        const formData = new FormData();
        formData.append('image', file);
        this.loading = true;
        image.store(this.resource, this.id, formData)
          .then(() => this.list())
          .finally(() => { this.loading = false; });
      });
      this.$refs.fileInput.value = '';
    }, false);
  },
};
</script>
<style>
  .upload {
    width: 192px;
    height: 192px !important;
  }
</style>
