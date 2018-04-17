import storage from 'good-storage'

const USERINFO = '__USERINFO__'

export function saveUserInfo(userinfo) {
  let UserInfos = storage.get(USERINFO, [])
  storage.set(USERINFO,userinfo)
  return UserInfos
}

export function singOutLogin(userinfo) {
  storage.remove(USERINFO)
  return {}
}

export function getUserInfo() {
  return storage.get(USERINFO,[])
}
