import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('@/components/index/index'),
      redirect: '/index/all',
      children:[
        {
          path: 'all',
          component: () => import('@/components/home/all/all'),
          children:[
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'good',
          component: () => import('@/components/home/good/good'),
          children:[
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'share',
          component: () => import('@/components/home/share/share'),
          children:[
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'ask',
          component: () => import('@/components/home/ask/ask'),
          children:[
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'job',
          component: () => import('@/components/home/job/job'),
          children:[
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        }
      ]
    },
    {
      path:'/login',
      component: () => import('@/components/login/login'),
    }

  ]
})
