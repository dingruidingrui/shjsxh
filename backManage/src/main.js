// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'// 2.2引入样式
import ElementUI from 'element-ui' // 2.1引入结构
import less from 'less'
import axios from 'axios'

Vue.use(less)
Vue.config.productionTip = false
Vue.use(ElementUI) // 3.安装
axios.defaults.withCredentials = true
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next()
    return
  }
  if (localStorage.getItem('token')) {
    next()
  } else {
    next({ name: 'login' })
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
