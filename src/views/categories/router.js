const resource = 'categories';
export default [
  {
    name: resource,
    path: resource,
    component: () => import('./List'),
  },
];
