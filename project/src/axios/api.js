import request from './axios'
import URL from './url'

/**
 * 获取主题色
 * @param params
 * @returns {Promise | Promise<unknown>}
 */

export const getThemeColor = () => request('GET', URL.getSkinName)
