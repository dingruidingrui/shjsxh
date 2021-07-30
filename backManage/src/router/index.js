import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    // eslint-disable-next-line standard/object-curly-even-spacing
    { path: '/', redirect: '/login' },
    { path: '/login', name: 'login', component: () => import('@/components/login.vue') },

    {
      path: '/view',
      redirect: '/view/welcome',

      component: () => import('@/view/container.vue'),
      children: [
        // {path:'welcome',component:()=> import('@/back/backComponents/index/newwelcome.vue'),meta:{Auth:true}},
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('@/view/components/welcome.vue'),
        },
        { path: 'write', name: 'write', component: () => import('@/view/components/write.vue') },
        { path: 'test', name: 'test', component: () => import('@/view/components/test.vue') },
        { path: 'skin', name: 'skin', component: () => import('@/view/components/skin.vue') },
        {
          path: 'userManage',
          name: 'userManage',
          component: () => import('@/view/components/userManage.vue'),
        },
        {
          path: 'linksManage',
          name: 'linksManage',
          component: () => import('@/view/components/linksManage.vue'),
        },
        {
          path: 'articleManage',
          name: 'articleManage',
          component: () => import('@/view/components/articleManage.vue'),
        },
        {
          path: 'articleByMenuId',
          name: 'articleByMenuId',
          component: () => import('@/view/components/articleByMenuId.vue'),
        },
      ],
    },
  ],
})
