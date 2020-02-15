import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import ru from 'vuetify/es5/locale/ru';

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    current: 'ru',
    locales: { ru },
  },
  theme: {
    themes: {
      light: {
        primary: '#444',
      },
    //   dark: {
    //     primary: '#2196F3',
    //     secondary: '#424242',
    //     accent: '#FF4081',
    //     error: '#FF5252',
    //     info: '#2196F3',
    //     success: '#4CAF50',
    //     warning: '#FB8C00',
    //   },
    },
  },
});
