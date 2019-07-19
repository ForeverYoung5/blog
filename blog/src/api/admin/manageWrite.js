import axios from  '../../http'
import IP from './ip'

//获取全部图片
export function allPictures() {
  return axios.get(IP.Ip + '/api/v1.0/image/getAllImage')
}

export function subArticle(data){
  return axios.post(IP.Ip + '/api/v1.0/article/postArticle',data)
}
