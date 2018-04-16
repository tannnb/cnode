import storage from 'good-storage'

const USERINFO = '__USERINFO__'

export function saveUserInfo(userinfo) {
  let UserInfos = storage.get(USERINFO, [])
  storage.set(USERINFO,userinfo)
  return UserInfos
}

export function removeUserInfo(userinfo) {
  storage.remove(USERINFO)
  return {}
}
