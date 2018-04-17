import * as types from './mutation-types'

const mutations = {
  [types.SET_AUTHOR](state,author){
    state.author = author
  },
  [types.SET_USER_INFO](state,userInfo){
    state.userInfo = userInfo
  },
  [types.SET_SINGOUT_LOGIN](state,singout){
    state.userInfo = singout
  }
}

export default mutations
