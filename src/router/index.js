import Vue from 'vue'
import Router from 'vue-router'
import {getUserInfo} from '../common/js/cache'

Vue.use(Router)


const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('@/components/index/index'),
      redirect: '/index/all',
      children: [
        {
          path: 'all',
          component: () => import('@/components/home/all/all'),
          children: [
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'good',
          component: () => import('@/components/home/good/good'),
          children: [
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'share',
          component: () => import('@/components/home/share/share'),
          children: [
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'ask',
          component: () => import('@/components/home/ask/ask'),
          children: [
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        },
        {
          path: 'job',
          component: () => import('@/components/home/job/job'),
          children: [
            {
              path: ':id',
              component: () => import('@/components/home/base-detail/base-detail'),
            }
          ]
        }
      ]
    },
    {
      path: '/topic',
      meta:{
        requireAuth:true
      },
      component: () => import('@/components/topic/topic'),
    },
    {
      path: '/message',
      meta:{
        requireAuth:true
      },
      component: () => import('@/components/message/message'),
    },
    {
      path: '/userCenter',
      meta:{
        requireAuth:true
      },
      component: () => import('@/components/userCenter/userCenter'),
    },
    {
      path: '/login',
      component: () => import('@/components/login/login'),
    }

  ]
})

router.beforeEach((to, from, next) => {

  // 是否需要登录权限
  if (to.meta.requireAuth) {
    if (getUserInfo().success === true) {
      next()
    } else {
      next({path: '/login'})
    }
  } else {
    next()
  }
})

export default router;

