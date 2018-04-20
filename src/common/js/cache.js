import storage from 'good-storage'

const USERINFO = '__USERINFO__'
const ACCESSTOKEN = '__ACCESSTOKEN__'

export function saveUserInfo(userinfo) {
  let UserInfos = storage.get(USERINFO, [])
  UserInfos = userinfo
  storage.set(USERINFO,userinfo)
  return UserInfos
}

export function singOutLogin() {
  storage.remove(USERINFO)
  return {}
}

export function getUserInfo() {
  return storage.get(USERINFO,[])
}

export function savaAccesstoken(accesstoken) {
  let Accesstokens = storage.get(ACCESSTOKEN,[])
  Accesstokens = accesstoken
  storage.set(ACCESSTOKEN,accesstoken)
  return Accesstokens
}

export function getAccesstoken() {
  return storage.get(ACCESSTOKEN,[])
}
