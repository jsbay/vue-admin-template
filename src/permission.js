import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setToken, getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { routerPermissionsKey, ssoLoginUrl } from '@/settings'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/dev-api/*'] // no redirect whitelist

export const replaceToLogin = (path) => {
  const domain = window.location.origin
  const redirect = `${domain}${path}`
  window.location.replace(`${ssoLoginUrl}?redirect=${redirect}`)
}
router.beforeEach(async(to, from, next) => {
  const { token } = to.query
  // login success, just redirect back
  if (token) {
    setToken(token)

    window.location.href = to.path
    return
  }

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has got his userInfo
      const hasUserInfo = store.getters.username

      if (hasUserInfo) {
        next()
      } else {
        try {
          let accessRoutes = []

          if (routerPermissionsKey === 'id') {
            const { menuIds = [] } = await store.dispatch('user/getInfo')
            accessRoutes = await store.dispatch('permission/generateRoutes', menuIds)
          } else {
            const { roles = [] } = await store.dispatch('user/getInfo')
            accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          }
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')

          replaceToLogin(to.path)

          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    const isWhitePath = whiteList.some(p => new RegExp(p).test(to.path))
    if (isWhitePath) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.

      replaceToLogin(to.path)

      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})

