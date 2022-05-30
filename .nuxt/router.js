import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2904c89d = () => interopDefault(import('..\\pages\\favorites.vue' /* webpackChunkName: "pages/favorites" */))
const _0e693baf = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _732cea66 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _3406ed9f = () => interopDefault(import('..\\pages\\statistics\\popularmovies.vue' /* webpackChunkName: "pages/statistics/popularmovies" */))
const _66246844 = () => interopDefault(import('..\\pages\\statistics\\topgenremovies.vue' /* webpackChunkName: "pages/statistics/topgenremovies" */))
const _7fe776c2 = () => interopDefault(import('..\\pages\\statistics\\topratedmovies.vue' /* webpackChunkName: "pages/statistics/topratedmovies" */))
const _61f1b639 = () => interopDefault(import('..\\pages\\movies\\_movieid.vue' /* webpackChunkName: "pages/movies/_movieid" */))
const _44c19898 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/favorites",
    component: _2904c89d,
    name: "favorites"
  }, {
    path: "/login",
    component: _0e693baf,
    name: "login"
  }, {
    path: "/register",
    component: _732cea66,
    name: "register"
  }, {
    path: "/statistics/popularmovies",
    component: _3406ed9f,
    name: "statistics-popularmovies"
  }, {
    path: "/statistics/topgenremovies",
    component: _66246844,
    name: "statistics-topgenremovies"
  }, {
    path: "/statistics/topratedmovies",
    component: _7fe776c2,
    name: "statistics-topratedmovies"
  }, {
    path: "/movies/:movieid?",
    component: _61f1b639,
    name: "movies-movieid"
  }, {
    path: "/",
    component: _44c19898,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
