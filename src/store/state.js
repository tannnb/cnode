import {getUserInfo,getAccesstoken} from '../common/js/cache'

const state = {
  author:'',
  pathUrl:'',
  userInfo:getUserInfo(),
  accessToken:getAccesstoken()
}
export default state
