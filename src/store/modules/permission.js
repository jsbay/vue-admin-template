import { asyncRoutes, constantRoutes } from '@/router'
import { routerPermissionsKey } from '@/settings'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

export const noop = () => {}

let hasPermission = noop
let filterAsyncRoutes = noop

if (routerPermissionsKey === 'id') {
  hasPermission = (menuIds, route) => {
    // console.log(menuIds, route)
    if (route.meta && route.meta.id) {
      return menuIds.includes(route.meta.id)
    } else {
      return true
    }
  }

  filterAsyncRoutes = (routes, menuIds) => {
    const res = []
    // console.log('routerPermissionsKey === id')
    // console.log('menuIds', menuIds)

    routes.forEach((route) => {
      const tmp = { ...route }
      if (hasPermission(menuIds, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, menuIds)
          if (tmp.children.length === 0) {
            return true
          }
        }
        res.push(tmp)
      }
    })
    return res
  }
} else {
  hasPermission = (roles, route) => {
    // console.log(roles, route)
    if (route.meta && route.meta.roles) {
      return roles.some(role => route.meta.roles.includes(role))
    } else {
      return true
    }
  }

  filterAsyncRoutes = (routes, roles) => {
    const res = []
    // console.log('routerPermissionsKey === roles')
    // console.log('roles', roles)

    routes.forEach(route => {
      const tmp = { ...route }

      if (hasPermission(roles, tmp)) {
        if (tmp.children) {
          tmp.children = filterAsyncRoutes(tmp.children, roles)
        }
        res.push(tmp)
      }
    })

    return res
  }
}

export { filterAsyncRoutes }

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)

      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
