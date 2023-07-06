import axios from '@/axios'

/**
 * 从应用管理子系统获取权限菜单
 */
export const getUserInfo = () => {
  return axios.request({
    url: '/aserver/user/info',
    method: 'get'
  })
}


/**
 * 修改密码
 */
export const updatePassword = (newPwd,oldPwd) => {
  return axios.request({
    url: '/aserver/user/updatePwd',
    data : {
        newPwd,
        oldPwd
    },
    method: 'post'
  })
}


/**
 * 修改用户
 */
export const updateUser =(user) =>{
  return axios.request({
    url:'/aserver/user/updateUser',
    method : 'post',
    data:{
        user
    },
  })
}

/**
 * 获取用户权限信息
 */
export const getRole = () => {
  return axios.request({
    url:'/aserver/user/getRoleData',
    method : 'get'
  })
}

/**
 * 验证原密码是否一致
 */
export const validateOldPassword = params => {
  return axios.request({
    url:'aserver/user/validateOldPassword',
    data: params,
    method: 'post'
  })
}