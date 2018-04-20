import * as types from './mutation-types'
import { saveUserInfo,singOutLogin,savaAccesstoken } from '../common/js/cache'

export const saveUserInfoAsync = function({commit, state},userInfo) {
  commit(types.SET_USER_INFO, saveUserInfo(userInfo))
}

export const saveUserAccessToken = function ({commit,state},accessToken) {
  commit(types.SET_ACCESSTOKEN,savaAccesstoken(accessToken))
}

export const singOutLoginAsync = function ({commit,state}) {
  commit(types.SET_SINGOUT_LOGIN,singOutLogin())
}
