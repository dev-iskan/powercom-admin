<template lang="pug">
  v-layout(row)
    v-flex(xs12)
        //- v-card-title.pa-2.px-3.subtitle-1 {{ $t('files') }}
        //- v-divider
        v-data-table(
          :loading="loading"
          :headers="headers"
          :items="files"
          hide-default-footer
        )
          template(v-slot:item="{ item, index }")
            tr
              td {{ index + 1 }}.
              td {{ item.name }}
              td {{ item.size | formatBytes }}
              td {{ item.created_at }}
              td {{ item.updated_at }}
              td
                v-layout(row)
                  v-spacer
                  v-btn(icon :href="item.url")
                    v-icon(small) mdi-download
                  v-btn(icon color='red' @click="remove(item.id)")
                    v-icon(small) mdi-delete
        v-divider
        v-layout(row)
          v-spacer
          v-btn.mr-1.mb-1(text tile @click="$refs.fileInput.click()") {{ $t('add') }}
    input(
      ref="fileInput"
      type="file"
      name="name"
      accept=".pdf, .doc, .docx, .xlsx"
      style="display: none;"
    )
</template>
<script>
import file from '@/api/file';

export default {
  name: 'Files',
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  filters: {
    formatBytes: (a, b = 0) => {
      if (a === 0) return '0 Bytes';
      const c = 1024;
      const d = b || 2;
      const e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
      const f = Math.floor(Math.log(a) / Math.log(c)); return `${parseFloat((a / c ** f).toFixed(d))} ${e[f]}`;
    },
  },
  data() {
    return {
      headers: [
        {
          text: '#',
          align: 'left',
          sortable: false,
          width: 1,
        },
        {
          text: this.$t('name'),
          value: 'name',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('size'),
          value: 'size',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('created_at'),
          value: 'created_at',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('updated_at'),
          value: 'updated_at',
          align: 'left',
          sortable: true,
          width: 0,
        },
        {
          text: this.$t('actions'),
          value: 'actions',
          align: 'right',
          sortable: false,
          width: 0,
        },
      ],
      loading: false,
      files: [],
    };
  },
  methods: {
    list() {
      this.loading = true;
      file.list(this.id)
        .then(({ data }) => { this.files = data; })
        .finally(() => { this.loading = false; });
    },
    remove(id) {
      this.loading = true;
      file.destroy(id)
        .then(() => this.list())
        .finally(() => { this.loading = false; });
    },
  },
  mounted() {
    this.$refs.fileInput.onchange = () => {
      const files = Array.from(this.$refs.fileInput.files);
      files.forEach((item) => {
        const formData = new FormData();
        formData.append('file', item);
        this.loading = true;
        file.store(this.id, formData)
          .then(() => this.list())
          .finally(() => { this.loading = false; });
      });
    };
  },
  created() {
    this.list();
  },
};
</script>
