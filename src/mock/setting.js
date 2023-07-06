/**
 * 获取单点登录地址
 */
export const getSsoUrl = () => {
  return {
    state: 'ok',
    sso: 'http://app.archser.com:11028'
  }
}

/**
 * 获取全局搜索地址
 */
export const getSearchUrl = () => {
  return {
    state: 'ok',
    search: 'http://app.archser.com:11023'
  }
}

/**
 * 获取Logo点击跳转地址
 */
export const getLogoUrl = () => {
  return {
    state: 'ok',
    logoUrl: 'http://localhost:11022'
  }
}