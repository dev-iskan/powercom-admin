const resource = 'payments';
export default [
  {
    name: resource,
    path: resource,
    component: () => import('./List'),
  },
];
