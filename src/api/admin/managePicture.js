import axios from '../../http'
import IP from '../ip';

//获取全部图片
export function allPictures(currentPage = 1,pageSize = 3) {
  return axios.get(IP.Ip + '/api/v1.0/image/getAllImage?page=' + currentPage + '&per_page=' + pageSize)
}
//上传图片流程：将图片上传到图床，返回url之后将图片URL以及图偏基础信息添加到数据库
//添加图片到数据库
export function upload(data){
  return axios.post(IP.Ip + '/api/v1.0/image/addImage',data)
}

//删除图片
export function del(id){
  return axios.delete(IP.Ip + '/api/v1.0/image/deleteImage/' + id)
}
