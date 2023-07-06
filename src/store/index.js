import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/api/user'
import { getMenu } from '@/api/menu'
import { saveLog } from '@/api/bug'

Vue.use(Vuex)

/**
 * 内部默认状态配置
 */
const innerStore = {
  state: {
    config: null,
    userInfo: null,
    apps: null,
    token: '',
    errors: []
  },
  mutations: {
    setConfig (state, config) {
      state.config = config
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    /**
     * 设置应用及能力
     * @param {*} state 
     * @param {*} apps 
     */
    setApps (state, apps) {
      state.apps = apps
    },
    setToken (state, token) {
      state.token = token
    },
    addError (state, data) {
      state.errors.push(data)
    }
  },
  actions: {
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        Promise.all([getUserInfo(), getMenu()]).then(([res1, res2]) => {
          const userInfo = res1.data.userInfo
          commit('setUserInfo', userInfo)
          const apps = res2.data.apps
          commit('setApps', apps)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    saveErrorLog ({ commit, rootState}, info) {
      const { userInfo: { id, username }, token } = rootState
      let data = {
        ...info,
        time: Date.parse(new Date()),
        token,
        userId: id,
        username
      }
      saveLog(info).then(() => {
        commit('addError', data)
      })
    }
  },
  modules: {}
}

/**
 * 合并状态配置
 */
const mergeStore = (inner, outer) => {
  let { state, mutations, actions, modules } = Object.assign({state: {}, mutations: {}, actions: {}, modules: {}}, outer)
  Object.assign(inner.state, state)
  Object.assign(inner.mutations, mutations)
  Object.assign(inner.actions, actions)
  Object.assign(inner.modules, modules)
  return inner
}

/**
 * @param storeConfig 参考：https://vuex.vuejs.org/zh/api/#vuex-store-构造器选项
 */
export default (storeConfig) => {
  return new Vuex.Store(mergeStore(innerStore, storeConfig))
}
