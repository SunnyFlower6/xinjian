import Vue from 'vue'
import Router from 'vue-router'
import qs from 'qs'
import Main from '@/views/Main.vue'
import Login from '@/views/Login.vue'
import Icons from '@/views/icons/Icons.vue'
import Messages from '@/views/messages/Messages.vue'
import Personal from '@/views/personal/Personal.vue'
import loginArchiveSystem from '@/views/login_archive_system/login_archive_system.vue'
import Bug from '@/views/bug/Bug.vue'
import { canJumpTo } from '@/libs/util'
import { accessLog } from '@/api/menu'
import Cookies from 'js-cookie'
Vue.use(Router)

/**
 * 内部默认路由配置
 */
const innerConfig = {
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/icons',
      name: 'icons',
      component: Main,
      children: [
        {
          path: 'index',
          name: 'icons_index',
          meta: {
            title: '字体图标'
          },
          component: Icons
        }
      ]
    },
    {
      path: '/messages',
      name: 'messages',
      component: Main,
      children: [
        {
          path: 'index',
          name: 'messages_index',
          meta: {
            title: '消息中心'
          },
          component: Messages
        }
      ]
    },
    {
      path: '/personal',
      name: 'personal',
      component: Main,
      children: [
        {
          path: 'index',
          name: 'personal_index',
          meta: {
            title: '个人设置'
          },
          component: Personal
        }
      ]
    },
    {
      path: '/loginArchiveSystem',
      name: 'loginArchiveSystem',
      component: loginArchiveSystem,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/bug',
      name: 'bug',
      component: Main,
      children: [
        {
          path: 'index',
          name: 'bug_index',
          meta: {
            title: '异常错误'
          },
          component: Bug
        }
      ]
    }
  ]
}

/**
 * 合并路由配置
 */
const mergeRoute = (inner, outer) => {
  let { routes } = Object.assign({ routes: [] }, outer)
  routes.forEach(route => {
    if (route.children && route.children.length > 0 && !route.component) {
      route.component = Main
    }
  })
  inner.routes.push(...routes)
  return inner
}

/**
 * 获取用户信息
 * @param {*} store
 */
const fetchUserInfo = store => {
  return new Promise((resolve, reject) => {
    if (store.state.userInfo) {
      resolve()
    } else {
      store
        .dispatch('getUserInfo')
        .then(() => {
          resolve()
        })
        .catch(err => {
          reject(err)
        })
    }
  })
}

/**
 * 合并路由配置，创建路由对象
 * @param routeConfig 参考：https://router.vuejs.org/zh/api/#router-构建选项
 */
export default routeConfig => {
  let router = new Router(mergeRoute(innerConfig, routeConfig))
  router.afterEach(to => {
    if (router.app.$config && to.meta.title) {
      document.title = router.app.$config.name + ' - ' + to.meta.title
    }
  })
  router.beforeEach((to, from, next) => {
    const store = router.app.$options.store
    const config = store.state.config
    let query = qs.parse(document.location.search, { ignoreQueryPrefix: true })
    if (!query.hasOwnProperty('ssotoken')) {
      query.ssotoken = ''
    }
    /** LiDeCai 20200319 YZJ-1672 ：将URL中的Token保存到Cookietoken中 start */
    if (query.token) {
      store.commit('setToken', query.token)
      // 将 token 存入Cookie,这份token是为了后端验证的
      Cookies.set('token', query.token, { expires: 1 })
      // 但是因为 token 这个 key 在浏览器中默认是 ** httpOnly ** 的,JS无法获取,所以另存一份使用
      Cookies.set('myToken', query.token, { expires: 1 })
      // 去除url中的token参数,但是并不执行跳转
      window.history.pushState(null, '', removeURLParameter(location.href, 'token'))
    }
    let token = store.state.token
    if (!token) {
      token = Cookies.get('myToken')
    }
    // /** LiDeCai 20200319 YZJ-1672 ：将URL中的Token保存到Cookie中 end */
    if (!token && to.name !== 'login' && (!query.ssotoken || query.ssotoken === '')) {
      next('/login')
    } else if (!token && to.name === 'login') {
      next()
    } else if (token && to.name === 'login') {
      next()
    } else if (query.ssotoken && query.ssotoken !== '' && !token && to.name !== 'login' && to.path === '/home') {
      next('/loginArchiveSystem')
    } else if (query.ssotoken && query.ssotoken !== '' && !token && to.name === 'loginArchiveSystem') {
      next()
    } else {
      fetchUserInfo(store)
        .then(() => {
          const currentApp = store.state.apps.find(app => app.name === config.app)
          return canJumpTo({ to, app: currentApp })
        })
        .then(() => {
          next()
        })
        .catch(() => {
          store.commit('setToken', '')
          next('/login')
        })
    }
    if (!query.ssotoken || query.ssotoken === '') {
      let params = {
        routname: to.meta.title,
        app: store.state.config.app
      }
      /**lidecai 20200319 代码优化，不需要处理返回值 start */
      accessLog(params)
      /**lidecai 20200319 代码优化，不需要处理返回值 end */
    }
  })
  return router
}

/**
 * lideca
 * 20200119
 * 去除url中指定的参数
 * @param {url地址} url
 * @param {要去除的对象} parameter
 */
const removeURLParameter = (url, parameter) => {
  let urlparts = url.split('?')
  if (urlparts.length >= 2) {
    //参数名前缀
    let prefix = encodeURIComponent(parameter) + '='
    let pars = urlparts[1].split(/[&;]/g)

    //循环查找匹配参数
    for (let i = pars.length; i-- > 0; ) {
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        //存在则删除
        pars.splice(i, 1)
      }
    }
    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '')
  }
  return url
}
