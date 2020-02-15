const resource = 'main';
export default [
  {
    name: resource,
    path: resource,
    component: () => import('./Index'),
  },
];
