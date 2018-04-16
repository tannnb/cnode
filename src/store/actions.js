import * as types from './mutation-types'
import { saveUserInfo,removeUserInfo } from '../common/js/cache'

export const saveUserInfoAsync = function({commit, state},userInfo) {
  console.log(userInfo)
  commit(types.SET_USER_INFO, saveUserInfo(userInfo))
}
