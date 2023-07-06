import axios from '@/axios'

/**
 * 测试连接，后台没有这个路由，会返回错误
 */
export const test = () => {
  const timestamp = (new Date()).valueOf()
  return axios.get(`/aserver/${timestamp}/bug`)
}

/**
 * 保存日志
 * @param {*} param0 
 */
export const saveLog = ({ type, code, content, url }) => {
  return axios.post('/aserver/bug/save', {
    log: {
      type,
      code,
      content,
      url
    }
  })
}

/**
 * 分页获取异常信息
 * @param {*} param0 
 */
export const page = ({ pageNumber, pageSize, range, q }) => {
  return axios.get(`/aserver/bug/page?pageNumber=${pageNumber}&pageSize=${pageSize}&range=${range}&q=${q}`, {
    pageNumber,
    pageSize
  })
}