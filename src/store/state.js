import {getUserInfo,getAccesstoken} from '../common/js/cache'

const state = {
  author:'',
  pathUrl:'',
  countFlow:1,
  userInfo:getUserInfo(),
  accessToken:getAccesstoken()
}
export default state
