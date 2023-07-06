import Cookies from 'js-cookie'
import config from '@/config'
import Identicon from 'identicon.js'
import md5 from 'md5'

/**
 * cookies中token的key
 */
export const TOKEN_KEY = 'token'

/**
 * 获取Token
 */
export const getToken = () => {
  const token = Cookies.get(TOKEN_KEY)
  if (token) return token
  else return false
}

/**
 * 设置Token
 * @param {String} token 
 */
export const setToken = (token) => {
  Cookies.set(TOKEN_KEY, token, { expires: config.cookieExpires || 1 })
}

/**
 * 路由跳转权限过滤
 * @param {to, next} param0 
 */
export const canJumpTo = ({ to, app }) => {
  return new Promise((resolve, reject) => {
    // 框架内部路由放权
    if (['home', 'home_index', 'icons', 'icons_index', 'messages', 'messages_index', 'personal', 'personal_index', 'bug', 'bug_index','loginArchiveSystem','fuzzy','fuzzy_search'].indexOf(to.name) !== -1) {
      resolve()
    }
    // 各系统路由过滤权限
    const exist = app.menus.some(menu => {
        if (menu.path) {
          const [ firstChar ] = menu.path
          let path = firstChar === '#' ? menu.path.substring(1) : menu.path
          return path === to.path
        }
        return false
      })
    if (exist) {
      resolve()
    } else {
      reject()
    }
  })
}

/**
 * 生成identicon
 * @param {String} text 
 * @param {Number} size 
 */
export const identicon = (text, size) => {
  const data = new Identicon(md5(text), { size: size || 64, background: [91, 98, 112, 255], foreground: [240, 240, 240, 255] }).toString();
  return 'data:image/png;base64,' + data
}
