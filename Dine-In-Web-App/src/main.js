import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import myRoutes from './routes.js'
import firebase from './firebase.js'

Vue.use(VueRouter)
Vue.config.productionTip = false

const myRouter =new VueRouter({
  routes:myRoutes,
  mode:'history'
})

myRouter.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !await firebase.getCurrentUser()) {
    alert("Please log into DineIn!")
    next('Login');
  } else {
    next();
  }
})

new Vue({
  render: h => h(App),
  router:myRouter
}).$mount('#app')