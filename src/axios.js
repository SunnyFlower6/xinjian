import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'X-Requested-With':'XMLHttpRequest'
  },
  transformRequest: [function (data) {
    return qs.stringify(data, { allowDots: true, indices: true })
  }],
  paramsSerializer: function (data) {
    return qs.stringify(data, { allowDots: true, indices: true })
  }
});

export default instance