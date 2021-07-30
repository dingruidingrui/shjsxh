import request from './axios';
import URL from './url';

/**
 * 登录接口
 * @param params
 * @returns {Promise | Promise<unknown>}
 */
export const login = (params) => request('POST', URL.login_submit, params);
