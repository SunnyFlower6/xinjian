import Vue from 'vue'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import App from './App.vue'
import routerCreater from './router'
import storeCreater from './store'
import './assets/fontawesome/font-awesome.less'
import clickoutside from './directive/clickoutside'
import defaultConfig from './config'
import axios from './axios'

Vue.config.productionTip = false
Vue.directive('clickoutside', clickoutside)
Vue.use(iView)

/**
 * @param routeConfig 参考：https://router.vuejs.org/zh/api/#router-构建选项
 * @param storeConfig 参考：https://vuex.vuejs.org/zh/api/#vuex-store-构造器选项
 */
export default (routeConfig, storeConfig, appConfig) => {
  let config = Object.assign({}, defaultConfig, appConfig)
  Vue.prototype.$config = config

  const store = storeCreater(storeConfig)
  const router = routerCreater(routeConfig)

  store.commit('setConfig', config)

  // 请求拦截器
  axios.interceptors.request.use(
    function(config) {
      const token = store.state.token
      token && (config.headers.Authorization = token)
      return config
    },
    function(error) {
      return Promise.reject(error)
    }
  )

  // 响应拦截器，处理401身份验证失效问题
  axios.interceptors.response.use(
    function(response) {
      return Promise.resolve(response)
    },
    function(error) {
      let errorInfo = error.response
      if (!errorInfo) {
        const {
          request: { statusText, status },
          config
        } = JSON.parse(JSON.stringify(error))
        errorInfo = {
          statusText,
          status,
          request: { responseURL: config.url }
        }
      }
      saveErrorLog(errorInfo)
      if (error.response && error.response.status === 401) {
        // store.replace("/login");
        router.push('/login')
      } else {
        return Promise.reject(error)
      }
    }
  )

  /**
   * 添加错误日志
   * @param {*} errorInfo
   */
  const saveErrorLog = errorInfo => {
    const {
      statusText,
      status,
      request: { responseURL }
    } = errorInfo
    let info = {
      type: 'ajax',
      code: status,
      content: statusText,
      url: responseURL
    }
    if (!responseURL.includes('/bug/save')) store.dispatch('saveErrorLog', info)
  }

  // Vue根实例
  return new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount('#app')
}
