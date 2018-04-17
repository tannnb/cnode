import * as types from './mutation-types'
import { saveUserInfo,singOutLogin } from '../common/js/cache'

export const saveUserInfoAsync = function({commit, state},userInfo) {
  commit(types.SET_USER_INFO, saveUserInfo(userInfo))
}


export const singOutLoginAsync = function ({commit,state}) {
  commit(types.SET_SINGOUT_LOGIN,singOutLogin())
}
