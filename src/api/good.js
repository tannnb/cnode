import axios from 'axios'


export function good(page=1) {
  const url = 'https://cnodejs.org/api/v1/topics'

  const data = {
    tab:'good',
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
