import axios from '@/axios'

/**
 * 获取配置的单点登录地址
 */
export const getSsoUrl = () => {
  return axios.get('/aserver/setting/sso')
}

/**
 * 获取配置的全局搜索地址
 */
export const getSearchUrl = () => {
  return axios.get('/aserver/setting/search')
}

/**
 * 获取Logo点击跳转地址
 */
export const getLogoUrl = () => {
  return axios.get('/aserver/setting/logoUrl')
}

/**
 * 通过门户系统登录
 */
export const ssoByPortalSystem = (params) => {
  return axios.request({
    url: '/aserver/ssoByPortalSystem',
    params: params,
    method: "post"
  })
}