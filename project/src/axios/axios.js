// import qs from "qs"
import Axios from 'axios'

export default function request (method, url, params) {
  let httpDefault = {
    method: method,
    url: url,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: params || null,
    timeout: 60000,
    headers: method === 'GET' || method === 'DELETE' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    }
  }
  return new Promise((resolve, reject) => {
    Axios(httpDefault).then(res => {
      if (res && res.status === 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}
