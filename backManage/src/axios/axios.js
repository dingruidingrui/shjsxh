// import qs from "qs"
import Axios from 'axios';
import { Message } from 'element-ui';
import * as router from '../router';

Axios.defaults.withCredentials = true;

export default function request(method, url, params) {
  const headers =
    method === 'GET' || method === 'DELETE'
      ? {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        }
      : {
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=UTF-8',
        };

  if (url === '/jsxhwebsite/login') {
    headers.code = params.VCode;
    delete params.VCode;
  } else {
    const Authorization = window.localStorage.getItem('token');
    headers.Authorization = Authorization;
  }
  let httpDefault = {
    method: method,
    url: url,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    data: params || null,
    timeout: 60000,
    headers,
  };
  return new Promise((resolve, reject) => {
    Axios(httpDefault)
      .then((res) => {
        if (res && res.status === 200) {
          if (res.data.status !== 200) {
            Message({
              message: res.data.result,
              type: 'error',
            });
          }
          if (res.data.status === 201) {
            router.repalce('/login');
          } else {
            resolve(res.data);
          }
        }
      })
      .catch((err) => {
        console.log(err, 'err');
        Message({
          message: err.data.result,
          type: 'error',
        });
        reject(err);
      });
  });
}
