const resource = 'orders';
export default [
  {
    name: resource,
    path: resource,
    component: () => import('./List'),
  },
  {
    name: `${resource}.create`,
    path: `${resource}-create`,
    component: () => import('./Create'),
  },
  {
    name: `${resource}.edit`,
    path: `${resource}-edit/:id`,
    component: () => import('./Edit'),
  },
];
