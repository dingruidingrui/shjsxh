import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 防止冗余路由报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  scrollBehavior: function (to, from, savedPosition) {
    if (to.path === '/welcome' || to.path === '/links' || to.path === '/contactUs') {
      // eslint-disable-next-line standard/object-curly-even-spacing
      return { x: 0, y: 0}
    }
    return { x: 0, y: 250 }
  },
  routes: [
    { path: '/', redirect: '/welcome', component: () => import('@/components/welcome.vue') },
    { path: '/common', name: 'common', component: () => import('@/components/common.vue') },
    { path: '/returnCommon', name: 'returnCommon', component: () => import('@/components/returnCommon.vue') },
    { path: '/selected', name: 'selected', component: () => import('@/components/selected.vue') },
    { path: '/links', name: 'links', component: () => import('@/components/links.vue') },
    { path: '/contactUs', name: 'contactUs', component: () => import('@/components/contactUs.vue') },
    { path: '/welcome', name: 'welcome', component: () => import('@/components/welcome.vue') },
    { path: '/searchResult', name: 'searchResult', component: () => import('@/components/searchResult.vue') }
  ]
})
