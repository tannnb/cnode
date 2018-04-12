import axios from 'axios'


export function Topics() {
  const url = 'https://cnodejs.org/api/v1/topics'

  const data = {
    tab:'all',
    page:1,
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
