import axios from 'axios'


export function getSelectData(tab,page=1) {
  const url = 'https://cnodejs.org/api/v1/topics'

  const data = {
    tab,
    page,
    limit:10,
    mdrender:false,
    1522747349170:''
  }

  return axios.get(url, {
    params:data
  }).then((res) =>{
    return Promise.resolve(res)
  })
}

export function   Topics_detail(id) {
  const url = `https://cnodejs.org/api/v1/topic/${id}`

  const data = {
    mdrender:true,
    accesstoken:'',
    1522747349170:''
  }
  return axios.get(url, {
    params:data
  }).then((res) =>{
    return Promise.resolve(res)
  })
}

export function accesstoken(accesstoken) {
  const url = 'https://cnodejs.org/api/v1/accesstoken'
  const data = {
    accesstoken
  }
  return axios.post(url, {
    accesstoken
  }).then((res) =>{
    return Promise.resolve(res)
  })
}

export function getUserInfo(userName) {
  const url = `https://cnodejs.org/api/v1/user/${userName}`

  return axios.get(url).then((res) =>{
    return Promise.resolve(res)
  })
}

export function topics_theme(options) {
  const url = `https://cnodejs.org/api/v1/topics`

  const data = {
    accesstoken:options.accesstoken,
    title:options.title,
    tab:options.tab,
    content:options.content
  }

  return axios.post(url,data).then((res) =>{
    return Promise.resolve(res)
  })
}

// 为评论点赞
export function reply(id,accesstoken) {
  const url = `https://cnodejs.org/api/v1/reply/${id}/ups`

  const data = {
    accesstoken
  }

  return axios.post(url,data).then((res) =>{
    return Promise.resolve(res)
  })
}
