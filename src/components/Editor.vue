<template lang="pug">
tinymce-editor(
  :value="value"
  @input="$emit('input', $event)"
  :init="{\
    height : '500',\
    menubar:false,\
    statusbar:false,\
    plugins: ['lists media link image imagetools paste'],\
    images_upload_handler:imageUploaded\
  }"
  toolbar="undo redo | copy paste | styleselect | \
  bold underline italic | alignleft aligncenter alignright alignjustify |\
  bullist numlist outdent indent | link image media"
  api-key="mg6pqu4koekwqmr7xutzybe6vl48x4mhkmsly121ydyv2xbq"
)
</template>

<script>
import TinymceEditor from '@tinymce/tinymce-vue';
import quill from '@/api/auth';

export default {
  name: 'Editor',
  components: {
    'tinymce-editor': TinymceEditor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  methods: {
    imageUploaded(blobInfo, success, failure) {
      const formData = new FormData();
      formData.append('image', blobInfo.blob(), blobInfo.filename());
      quill.store(formData)
        .then((result) => {
          const url = result.data.path;
          success(url);
        })
        .catch((error) => failure(error));
    },
  },
};
</script>
