import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _13c78cfe = () => import('../pages/app/index.vue' /* webpackChunkName: "pages/app/index" */).then(m => m.default || m)
const _571e211f = () => import('../pages/app/signup/index.vue' /* webpackChunkName: "pages/app/signup/index" */).then(m => m.default || m)
const _2679f9cf = () => import('../pages/app/contact/index.vue' /* webpackChunkName: "pages/app/contact/index" */).then(m => m.default || m)
const _63fa92d8 = () => import('../pages/app/login/index.vue' /* webpackChunkName: "pages/app/login/index" */).then(m => m.default || m)
const _5d11e9fc = () => import('../pages/app/about/index.vue' /* webpackChunkName: "pages/app/about/index" */).then(m => m.default || m)
const _7eaf77c2 = () => import('../pages/app/dashboards/vulcan/index.vue' /* webpackChunkName: "pages/app/dashboards/vulcan/index" */).then(m => m.default || m)
const _9107f072 = () => import('../pages/app/shopper/signup/index.vue' /* webpackChunkName: "pages/app/shopper/signup/index" */).then(m => m.default || m)
const _fbe92c34 = () => import('../pages/app/dashboards/admin/index.vue' /* webpackChunkName: "pages/app/dashboards/admin/index" */).then(m => m.default || m)
const _8fae46b6 = () => import('../pages/app/dashboards/dropper/index.vue' /* webpackChunkName: "pages/app/dashboards/dropper/index" */).then(m => m.default || m)
const _bb2b9804 = () => import('../pages/app/dashboards/shopper/index.vue' /* webpackChunkName: "pages/app/dashboards/shopper/index" */).then(m => m.default || m)
const _29cc946c = () => import('../pages/index.vue' /* webpackChunkName: "pages/index" */).then(m => m.default || m)
const _4a0cc1d4 = () => import('../pages/_id.vue' /* webpackChunkName: "pages/_id" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/app",
			component: _13c78cfe,
			name: "app"
		},
		{
			path: "/app/signup",
			component: _571e211f,
			name: "app-signup"
		},
		{
			path: "/app/contact",
			component: _2679f9cf,
			name: "app-contact"
		},
		{
			path: "/app/login",
			component: _63fa92d8,
			name: "app-login"
		},
		{
			path: "/app/about",
			component: _5d11e9fc,
			name: "app-about"
		},
		{
			path: "/app/dashboards/vulcan",
			component: _7eaf77c2,
			name: "app-dashboards-vulcan"
		},
		{
			path: "/app/shopper/signup",
			component: _9107f072,
			name: "app-shopper-signup"
		},
		{
			path: "/app/dashboards/admin",
			component: _fbe92c34,
			name: "app-dashboards-admin"
		},
		{
			path: "/app/dashboards/dropper",
			component: _8fae46b6,
			name: "app-dashboards-dropper"
		},
		{
			path: "/app/dashboards/shopper",
			component: _bb2b9804,
			name: "app-dashboards-shopper"
		},
		{
			path: "/",
			component: _29cc946c,
			name: "index"
		},
		{
			path: "/:id",
			component: _4a0cc1d4,
			name: "id"
		}
    ],
    
    
    fallback: false
  })
}
