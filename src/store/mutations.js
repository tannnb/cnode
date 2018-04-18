import * as types from './mutation-types'

const mutations = {
  [types.SET_AUTHOR](state,author){
    state.author = author
  },
  [types.SET_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [types.SET_PATH_URL](state,pathUrl){
    state.pathUrl = pathUrl
  },
  [types.SET_SINGOUT_LOGIN](state,singOut){
    state.userInfo = singOut
  }
}

export default mutations
