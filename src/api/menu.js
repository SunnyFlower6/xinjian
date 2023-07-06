import axios from '@/axios'

/**
 * 从应用管理子系统获取权限菜单
 */
export const getMenu = () => {
  return axios.get('/aserver/menu')
}
/**
 * 菜单加星
 * @param {*} param0 
 */
export const star = ({ menuId }) => {
  return axios.post('/aserver/menu/star', { menuId })
}

/**
 * 取消菜单加星
 * @param {*} param0 
 */
export const cancelStar = ({ menuId }) => {
  return axios.post('/aserver/menu/cancelStar', { menuId })
}

/**
 * 添加功能访问
 */
export const accessLog = params => {
  return axios.request({
    url: '/aserver/menu/accessLog',
    data: params, 
    method: 'post'
  })
}

export const getSystemById = params => {
  return axios.request({
    url: '/aserver/system/getSystemById',
    data: params, 
    method: 'post'
  })
}

