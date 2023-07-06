import { layout } from '.'
import '@babel/polyfill';
import Es6Promise from 'es6-promise'
Es6Promise.polyfill()
const router = {
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home_index',
          meta: {
            title: '首页'
          },
          component: () => import('@/views/Home.vue')
        }
      ]
    }
  ]
}
layout(router)
