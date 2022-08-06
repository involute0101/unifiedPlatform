import Vue from 'vue'
import Router from 'vue-router'

const login = r => require.ensure([], () => r(require('../pages/Login')), 'login')
// eslint-disable-next-line no-unused-vars
const main = r => require.ensure([], () => r(require('../pages/Main')), 'main')
const task = r => require.ensure([], () => r(require('../pages/Task')), 'task')
const manage = r => require.ensure([], () => r(require('../pages/Manage')), 'manage')
const finishTask = r => require.ensure([], () => r(require('../pages/FinishTask')), 'finishTask')
// eslint-disable-next-line no-unused-vars
const myRoom = r => require.ensure([], () => r(require('../pages/MyRoom')), 'myRoom')

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
  },
  {
    path: '/finishTask',
    name: 'finishTask',
    component: finishTask
  },
  {
    path: '/myRoom',
    name: 'myRoom',
    component: myRoom
  }
]

export default new Router({
  routes,
  strict: process.env.NODE_ENV !== 'production'
})
