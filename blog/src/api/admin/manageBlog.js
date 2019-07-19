import axios from '../../http'
import IP from './ip';

//获取全部文章
export function allArticle(currentPage=1, pageSize=7) {
  return axios.get(IP.Ip + '/api/v1.0/article/getAllArticle?page=' + currentPage + '&per_page=' + pageSize)
}

//删除文章

export function del(id){
  return axios.delete(IP.Ip + '/api/v1.0/article/deleteArticle/' + id)
}

//获取全部图片
export function allPictures() {
  return axios.get(IP.Ip + '/api/v1.0/image/getAllImage')
}
// 修改文章
export function update(data){
  return axios.post(IP.Ip + '/api/v1.0/article/updateArticle',data)
}
