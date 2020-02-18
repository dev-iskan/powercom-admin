import Vue from 'vue';
import Editor from './Editor.vue';
import Images from './Images.vue';

const Components = {
  Editor,
  Images,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
