import Vue from 'vue';
import Editor from './Editor.vue';
import Images from './Images.vue';
import Files from './Files.vue';

const Components = {
  Editor,
  Images,
  Files,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
