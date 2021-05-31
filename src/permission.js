import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { setSecret, setSignature, getSecret, getSignature } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

import { ssoLoginUrl } from '@/settings'
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/reset'] // no redirect whitelist

const domain = window.location.origin

router.beforeEach(async(to, from, next) => {
  const { srt: secret, sgn: signature } = to.query

  // login success, just redirect back
  if (secret && signature) {
    setSecret(decodeURIComponent(secret))
    setSignature(decodeURIComponent(signature))

    window.location.href = to.path
    return
  }

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasLogin = getSecret() && getSignature()

  if (hasLogin) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.username
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // get user info
          // await store.dispatch('user/getInfo')

          const { permissions } = await store.dispatch('user/getInfo')

          // generate accessible routes map based on menus
          const accessRoutes = await store.dispatch('permission/generateRoutes', permissions)

          // dynamically add accessible routes
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')

          const redirect = `${domain}${to.path}`
          // next(`${ssoLoginUrl}?redirect=${redirect}`)
          window.location.replace(`${ssoLoginUrl}?redirect=${redirect}`)

          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      const redirect = `${domain}${to.path}`
      // other pages that do not have permission to access are redirected to the login page.
      // next(`${ssoLoginUrl}?redirect=${redirect}`)
      window.location.replace(`${ssoLoginUrl}?redirect=${redirect}`)

      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
