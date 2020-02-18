const resource = 'brands';
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
  {
    name: `${resource}.edit`,
    path: `${resource}-edit/:id`,
    component: () => import('./Item'),
  },
];
