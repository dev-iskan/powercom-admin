const resource = 'payments';
export default [
  {
    name: resource,
    path: resource,
    component: () => import('./List'),
  },
  {
    name: `${resource}.create`,
    path: `${resource}-create`,
    component: () => import('./Item'),
  },
];
