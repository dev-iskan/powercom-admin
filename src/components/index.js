import Vue from 'vue';
import Editor from './Editor.vue';
import Images from './Images.vue';
import Files from './Files.vue';
import SearchClient from './SearchClient.vue';

const Components = {
  Editor,
  Images,
  Files,
  SearchClient,
};

Object.keys(Components).forEach((name) => {
  Vue.component(name, Components[name]);
});

export default Components;
