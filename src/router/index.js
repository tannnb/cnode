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
        },
        {
          path: 'good',
          component: () => import('@/components/home/good/good'),
        },
        {
          path: 'share',
          component: () => import('@/components/home/share/share'),
        },
        {
          path: 'ask',
          component: () => import('@/components/home/ask/ask'),
        },
        {
          path: 'job',
          component: () => import('@/components/home/job/job'),
        }
      ]
    }

  ]
})

/*export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: () => import('@/components/index'),
      redirect: '/index/home',
      children: [
        {
          path: 'home',
          component: () => import('@/components/home/home'),
          redirect: '/index/home/all',
          children:[
            {
              path: 'all',
              component: () => import('@/components/home/all/all'),
              children:[
                {
                  path: ':id',
                  component: () => import('@/components/home/all/base-detail/base-detail')
                }
              ]
            },
            {
              path: 'ask',
              component: () => import('@/components/home/ask/ask')
            },
            {
              path: 'share',
              component: () => import('@/components/home/share/share')
            },
            {
              path: 'good',
              component: () => import('@/components/home/good/good')
            },
            {
              path: 'job',
              component: () => import('@/components/home/job/job')
            }
          ]
        },
        {
          path: 'topic',
          component: () => import('@/components/topic/topic')
        },
        {
          path: 'message',
          component: () => import('@/components/message/message')
        },
        {
          path: 'userCenter',
          component: () => import('@/components/userCenter/userCenter')
        }
      ]
    }

  ]
})*/
