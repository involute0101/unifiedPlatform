import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('../pages/Login')), 'login')
const main = r => require.ensure([], () => r(require('../pages/Main')), 'main')
const task = r => require.ensure([], () => r(require('../pages/Task')), 'task')
const manage = r => require.ensure([], () => r(require('../pages/Manage')), 'manage')

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login
  },
  {
    path: '/manage',
    name: 'manage',
    component: manage
  },
  {
    path: '/task',
    name: 'task',
    component: task
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
