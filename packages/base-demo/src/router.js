import VueRouter from 'vue-router';

const routers = [
  {
    path: '/',
    name: '主页',
    component: () => import('./Home.vue'),
  },
  {
      path: '/vue',
      name: 'slaveVue',
      component: () => import('./Proxy.vue')
  },
  {
    path: '/react',
    name: 'slaveReact',
    component: () => import('./Proxy.vue')
}
];

const router = new VueRouter({
  mode: 'history',
  linkActiveClass: 'is-active',
  routes: routers,
});

export { router, VueRouter };

export default routers;
