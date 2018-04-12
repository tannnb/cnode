import axios from 'axios'


export function Topics(page=1) {
  const url = 'https://cnodejs.org/api/v1/topics'

  const data = {
    tab:'all',
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

export function Topics_detail(id) {
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

