import axios from './index';

export default {
  app: () => axios.get('/app'),
};
