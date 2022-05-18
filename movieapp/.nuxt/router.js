import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fc2b8dbc = () => interopDefault(import('..\\pages\\popularmovies.vue' /* webpackChunkName: "pages/popularmovies" */))
const _2e92697c = () => interopDefault(import('..\\pages\\topratedmovies.vue' /* webpackChunkName: "pages/topratedmovies" */))
const _6da03d39 = () => interopDefault(import('..\\pages\\movies\\_movieid.vue' /* webpackChunkName: "pages/movies/_movieid" */))
const _563d1cd0 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/popularmovies",
    component: _fc2b8dbc,
    name: "popularmovies"
  }, {
    path: "/topratedmovies",
    component: _2e92697c,
    name: "topratedmovies"
  }, {
    path: "/movies/:movieid?",
    component: _6da03d39,
    name: "movies-movieid"
  }, {
    path: "/",
    component: _563d1cd0,
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
