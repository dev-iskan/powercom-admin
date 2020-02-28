import Vue from 'vue';
import Vuex from 'vuex';
import global from './modules/global';
import auth from './modules/auth';
import category from './modules/category';
import brand from './modules/brand';
import user from './modules/user';
import article from './modules/article';
import product from './modules/product';
import order from './modules/order';
import client from './modules/client';
import item from './modules/item';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    auth,
    category,
    brand,
    article,
    user,
    product,
    order,
    client,
    item,
  },
});
